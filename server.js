const express = require('express')
const bodyParser = require('body-parser')
const logger = require('morgan')
const cors = require('cors')
const db = require('./db/connection')
const PORT = process.env.PORT || 3000
const User = require('./models/user')

const app = express()

app.use(cors())
app.use(bodyParser.json())
app.use(logger('dev'))

db.on('error', console.error.bind(console, 'MongoDB connection error:'))

app.listen(PORT, () => {
  console.log(`Express server listening on port ${PORT}`)
});

app.get('/', (req, res) => {
  res.send("Hello there!");
});

app.get('/users', async (req, res) => {
  try {
    const users = await User.find()
    res.json(users)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
});


/*
app.get('/products', async (req, res) => {
  res.json(products)
})

app.get('/products/:id', async (req, res) => {
  const id = req.params.id
  const product = products.filter(product => product._id === id)[0]
  res.json(product)
})

app.post('/products', (req, res) => {
  const product = req.body
  products.push(product)
  res.json(products)
})

app.put('/products/:id', async (req, res) => {
  const id = req.params.id
  const productIndex = products.findIndex(product => product._id === id)
  const product = { ...products[productIndex], ...req.body }
  products.splice(productIndex, 1, product)
  res.json(product)
})

app.delete('/products/:id', async (req, res) => {
  const id = req.params.id
  const productIndex = products.findIndex(product => product._id === id)
  products.splice(productIndex, 1)
  res.json(products)
})
*/