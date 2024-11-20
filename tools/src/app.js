import * as path from "node:path";
import consoleStamp from "console-stamp";
import cookieParser from "cookie-parser";
import cors from "cors";
import dayjs from "dayjs";
import timezone from "dayjs/plugin/timezone.js";
import utc from "dayjs/plugin/utc.js";
import express from "express";
import morgan from "morgan";
import split from "split";
import routes from "./routes/index.js";

dayjs.extend(utc);
dayjs.extend(timezone);

import { fileURLToPath, pathToFileURL } from "node:url";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const app = express();

const staticPath = (localPath) => pathToFileURL(path.join(__dirname, localPath)).pathname;

// Console write
const morgan_config = {
	skip: (req) => {
		if (
			req.url === "/" ||
			req.url.includes("/css") ||
			req.url.includes("/img") ||
			req.url.includes("/js") ||
			req.url.includes("/plugins")
		) {
			return true;
		}
	},
	stream: split().on("data", (line) => {
		process.stdout.write(
			`[${dayjs().tz("Europe/Paris").format("YYYY-MM-DD HH:mm:ss-SSS")}] ${line} \n`,
		);
	}),
};

app.use(morgan("dev", morgan_config));

consoleStamp(console, {
	formatter: () => dayjs().tz("Europe/Paris").format("YYYY-MM-DD HH:mm:ss-SSS"),
	label: false,
	datePrefix: "",
	dateSuffix: "",
});

app.use(cors());
app.use(cookieParser());
app.use(express.static(`${__dirname}/public`));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

import { create } from "express-handlebars";
import hbs_fn from "./helpers/hbs_fn.js";

const hbs = create({
	defaultLayout: "main", // layout or false
	layoutsDir: path.join(__dirname, "views", "layouts"), // Chemin des layouts
	partialsDir: path.join(__dirname, "views", "partials"),
	extname: ".hbs",
	helpers: hbs_fn, // handlebars helpers
});




app.engine("hbs", hbs.engine);
app.set("view engine", "hbs");
app.set("views", [`${__dirname}/views/pages`]);


// app.use("/public", express.static(path.join(__dirname, "public")));

// accèss en static des assets du site
// app.use("/assets", express.static(path.join(__dirname, "../../assets")));

routes(app);

// Convertit automatiquement le chemin en URL valide

// Utilisation dans express.static
app.use("/public", express.static(staticPath("public")));
app.use("/assets", express.static(staticPath("../../assets")));

export default app;