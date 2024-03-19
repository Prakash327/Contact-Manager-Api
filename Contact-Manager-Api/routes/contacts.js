const express = require('express')
const router = express.Router()
const {getAllContact,getSingleContact,updateContacts,deleteContacts,createContact}= require("../Controllers/Controllers")
const validateToken = require('../middleware/validateToken')
router.use(validateToken)
//get all data 
router.route("/").get(getAllContact)

//get single data 
router.route("/:id").get(getSingleContact)
//create contact
router.route("/").post(createContact)
//update contact
router.route("/:id").put(updateContacts)
router.route("/:id").delete(deleteContacts)
module.exports = router;