const { addUser, updateUser, getUserById, deleteUser, getAllUser } = require('../controller/userContro');

const router = require('express').Router();

router.post('/add', addUser)
router.put('/update/:id', updateUser)
router.get('/getById/:id', getUserById)
router.delete('/deleteUser/:id', deleteUser)
router.get('/getAllUser', getAllUser)

module.exports = router
