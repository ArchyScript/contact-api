const express = require('express')
const router = express.Router()
const { getContacts, createContact, updateContact, getContact, deleteContact } = require('../controller/ContactController');


router.get('/', getContacts)
router.post('/', createContact)
router.get('/:id', getContact)
router.patch('/:id', updateContact)
router.delete('/:id', deleteContact)

module.exports = router