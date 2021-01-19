const router = require('express').Router()
const auth = require('../middleware/auth')
const { findOne } = require('../models/todoModel')
const Todo = require('../models/todoModel')

router.post('/', auth, async (req, res) => {
    try {
        const { title } = req.body

        if (!title) return res.status(400).json({ msg: 'Not all fields have been entered.' })
        
        const newTodo = new Todo({
            title,
            userId: req.user
        })

        const savedTodo = await newTodo.save()
        res.json(savedTodo)
    } catch (err) {
        res.status(500).json(err.message)
    }
})

router.get('/all', auth, async (req, res) => {
    const todos = await Todo.find({ userId: req.user })
    res.json(todos)
})

router.delete('/:id', auth, async (req, res) => {
    const todo = await Todo.findOne({ userId: req.user, _id: req.params.id })
    // console.log(req.user)
    if (!todo) return res.status(400).json({ msg: 'No todo found with this ID that belongs to the current user.' })
    const deletedTodo = await Todo.findByIdAndDelete(req.params.id)
    res.json(deletedTodo)
})
module.exports = router