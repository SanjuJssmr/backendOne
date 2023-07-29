import express from 'express'
import { createNewContact, deleteContact, getAllContact, getSpecContact, updateContact } from '../controllers/contactController.js'
import { validateToken } from '../middleware/validateToken.js'

const router = express.Router()
router.use(validateToken)
router.get('/', getAllContact).post('/', createNewContact)

router.get('/:id', getSpecContact).put('/:id', updateContact).delete('/:id', deleteContact)


export default router