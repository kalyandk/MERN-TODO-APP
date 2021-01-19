const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
require('dotenv').config()

const app = express()

app.use(express.json())
app.use(cors())

app.use('/users', require('./routes/userRouter'))
app.use('/todos', require('./routes/todoRouter'))

const PORT = process.env.PORT || 5000

const CONNECTION_URL = 'mongodb://localhost:27017/MERN_AUTH'

mongoose.connect(CONNECTION_URL, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true })
    .then(() => console.log('MongoDB connection established..'))
    .catch(err => console.log(err))

app.listen(PORT, () => {
    console.log(`Server running on PORT: ${PORT}`)
})

mongoose.set('useFindAndModify', false)