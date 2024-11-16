import { Work } from "../models/work.model.js"
import { Client } from "../models/client.model.js"

export const uploadCompanyDetails = async(req, res)=>{
    try {
    
         console.log(req.body)
        //  console.log('namess', name)
         const createClient = await Client.create({client: req.body.client})
    
         res.status(201).json(createClient)
    
        } catch (error) { 
       
         console.log(error)
    }
}

export const getClientDetails = async(req,res)=>{
       try {
        const clients = await Client.find({})
        
        res.status(200).json({clients})
       } catch (error) {
        console.log(error)
       }
}

export const deleteClientAll = async(req,res)=>{
    try {
        const deleteClient = await Client.deleteMany()
        res.status(200).json({message : 'Success', deleteClient})
    } catch (error) {
        console.log(error)
    }
}
// export const getCompanyDetails = async(req, res)=>{
//     try {
//         const getDetails = await Company.find()

//         res.status(200).json({companies :getDetails})
//     } catch (error) {
//         console.log(error)
//     }
// }

// export const getCompanyByName = async(req,res)=>{
//     const {name} = req.params
//     console.log(name)
//     const company = await Company.findOne({company : name})

//     res.status(200).json(company)

// }








