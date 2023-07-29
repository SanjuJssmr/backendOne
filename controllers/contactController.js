import Contact from '../models/contactModel.js'
import asyncHandler from 'express-async-handler'


export const getAllContact = asyncHandler( async(req, res) => {
const contact = await Contact.find({user_id:req.user.id})
    res.status(200).json(contact)
})

export const createNewContact = asyncHandler( async (req, res) => {
    const { name, email, phone } = req.body
    if (!name || !email || !phone) {
        res.status(400)
        throw new Error('All fields are required')
    }

    const newContact  = await Contact.create({name:name,email:email,phone:phone,user_id:req.user.id})
    res.status(201).json(newContact)

})

export const getSpecContact = asyncHandler ( async(req, res) => {

    const contact = await Contact.findById(req.params.id);
    if (!contact) {
        res.status(404)
        throw new Error('Contact not found')
 }
    res.status(200).json(contact)
})

export const updateContact = asyncHandler(async (req, res) => {

    const contact = await Contact.findById(req.params.id);
    if (!contact) {
        res.status(404)
        throw new Error('Contact not found')
    }

    if (contact.user_id.toString() !== req.user.id) {
        res.status(403)
        throw new Error('You are not authorised to perform this action')
    }

    const updatedData = await Contact.findByIdAndUpdate(req.params.id,req.body,{new:true})
    res.status(200).json(updatedData)
})

export const deleteContact = asyncHandler(async (req, res) => {

    const contact = await Contact.findById(req.params.id);

    if (!contact) {
        res.status(404)
        throw new Error('Contact not found')
    }

    if (contact.user_id.toString() !== req.user.id) {
        res.status(403)
        throw new Error('You are not authorised to perform this action')
    }


    await Contact.deleteOne({_id:req.params.id}).then(res.json({message:"Successfully deleted"}))
    res.status(200).json(contact)
})
