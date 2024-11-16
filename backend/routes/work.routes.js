import { Router } from "express";
import { workDetails , getDetails, deleteWorks, getDetailsbyID } from "../controllers/work.js";
import { upload } from "../app.js";

export const router = Router();

router.post('/upload', workDetails)
router.get('/upload', getDetails)
router.get('/upload/:id', getDetailsbyID)
router.delete('/delete', deleteWorks)




