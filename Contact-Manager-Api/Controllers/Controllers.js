const asyncHandler = require("express-async-handler")
const Contact = require('../models/contactModel');
//@desc Get all contacts
//@route GET api/contacts
//@access private
const getAllContact = asyncHandler(async(req,res)=>{
    const contacts =  await Contact.find({ user_id:req.user.id});
    res.status(200).json(contacts)


})
//@desc Get sinle contacts
//@route GET api/contacts:id
//@access public
//controler to get single contact
const getSingleContact =asyncHandler(async (req,res)=>{
    const contact= await Contact.findById(req.params.id)
    if( !contact){
        res.status(404);
        throw new Error("Contact not found");
    }
    res.status(200).json(contact);
})
//@desc create new contacts
//@route POST api/contacts
//@access private
//controllers to create contact\
const createContact= asyncHandler(async(req,res)=>{
    console.log(req.body)
    const{name , email , phone}= req.body;
    if(!name||!email||!phone){
        res.status(400);
        throw new Error("All fields are mandatory!")
    }
    const contact = await Contact.create({
        name,
        email,
        phone,
        //this is to validate user ||check user
        user_id:req.user.id,
    })
    res.status(201).json(contact)
})
//@desc update contacts
//@route PUT api/contacts:id
//@access private 
const updateContacts = asyncHandler(async(req,res)=>{
    const contact = await Contact.findById(req.params.id)
    if(!contact){
        res.status(404)
        throw new Error("Contact not found")
    }
    if(contact.user_id.toString()!== req.user.id){
        res.status(403);
        throw new Error("User dont have permission to update other contacts")
    }
    const updatedContact = await Contact.findByIdAndUpdate(
        req.params.id,
        req.body,
        {new: true }
    );
    res.status(200).json(updatedContact)
})
//@desc delet contacts
//@route DELET api/contacts:id
//@access private
const deleteContacts = asyncHandler(async(req,res)=>{
    const contact = await Contact.findById(req.params.id);
    if(!contact){
        res.status(404);
        throw new Error("contact not found")
    }
    if(contact.user_id.toString()!== req.user.id){
        res.status(403);
        throw new Error("User dont have pemission to update other user contacts")
    }
    await Contact.deleteOne({_id:req.params.id})
    res.status(200).json({message:"Contact Deleted Successfully"})
});

module.exports= {getAllContact,getSingleContact,createContact,updateContacts,deleteContacts};