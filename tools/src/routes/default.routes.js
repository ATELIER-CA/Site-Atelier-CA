import express from "express";
const router = express.Router();
import upload from '../middlewares/multer.js';
import slider_upload from '../middlewares/slider_multer.js';
import * as dctl from "../controllers/default.controllers.js";
import * as actl from "../controllers/actions.controllers.js";


router.get('/', dctl.start);
router.get('/projets', dctl.index);
router.get('/projet/:id', dctl.projet);
router.get('/depot', dctl.depot);
router.get('/new_projet', dctl.new_projet);
router.get('/slider', dctl.slider);

router.get('/delete_img/:id', actl.delete_img_projet);
router.get('/delete_slider_img', actl.delete_img_slider);
router.post('/upload', upload.array("files"), actl.upload);
router.post('/upload_slider', slider_upload.array("files"), actl.upload_slider);
router.put('/synchro', actl.synchro);
router.post('/add_projet', actl.add_projet);


export default router;