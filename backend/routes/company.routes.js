import { Router } from "express";
import {  } from "../controllers/work.js";
import { deleteClientAll, getClientDetails, uploadCompanyDetails } from "../controllers/client.js";

export const companyRouter = Router();

companyRouter.post('/uploadCompany', uploadCompanyDetails )
companyRouter.get('/getClientDetails', getClientDetails)
companyRouter.delete('/delete', deleteClientAll)
// companyRouter.get('/getCompany', getCompanyDetails)
// companyRouter.get('/getCompany/:name', getCompanyByName)




