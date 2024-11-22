import express from "express";
const router = express.Router();
import upload from '../middlewares/multer.js';
import * as dctl from "../controllers/default.controllers.js";
import * as actl from "../controllers/actions.controllers.js";


router.get('/', dctl.start);
router.get('/projets', dctl.index);
router.get('/projet/:id', dctl.projet);
router.get('/depot', dctl.depot);
router.get('/new_projet', dctl.new_projet);

router.get('/delete_img/:id', actl.delete_img_projet);
router.post('/upload', upload.array("files"), actl.upload);
router.put('/synchro', actl.synchro);
router.post('/add_projet', actl.add_projet);


export default router;