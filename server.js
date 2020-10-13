const express = require('express')
const bodyParser = require('body-parser')
const logger = require('morgan')
const cors = require('cors')
const db = require('./db/connection')
const PORT = process.env.PORT || 3000
const User = require('./models/user')
const Match = require('./models/match')

const app = express()

app.use(cors())
app.use(bodyParser.json())
app.use(logger('dev'))

db.on('error', console.error.bind(console, 'MongoDB connection error:'))

app.listen(PORT, () => {
  console.log(`Express server listening on port ${PORT}`)
});

app.get('/', (req, res) => {
  res.send('Hello there!')
});

/////////////////////////////////////////////////////////////
// /users

app.get('/users', async (req, res) => {
  try {
    const users = await User.find()
    res.json(users)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
});

app.get('/users/:googleId', async (req, res) => {
  try {
    const { googleId } = req.params
    const user = await User.find({ googleId: googleId })
    if (user.length <= 0) throw Error('User not found')
    res.json(user)
  } catch (e) {
    console.log(e)
    res.send('User not found!')
  }
})

app.post('/users', async (req, res) => {
  try {
    const user = await new User(req.body)
    await user.save()
    res.status(201).json(user)
  } catch (error) {
    console.log(error)
    res.status(500).json({ error: error.message })
  }
})

app.put('/users/:id', async (req, res) => {
  const { id } = req.params
  await User.findByIdAndUpdate(id, req.body, { new: true }, (error, user) => {
    if (error) {
      return res.status(500).json({ error: error.message })
    }
    if (!user) {
      return res.status(404).json({ message: 'User not found!' })
    }
    res.status(200).json(user)
  })
})

app.delete('/users/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await User.findByIdAndDelete(id)

    if (deleted) {
      // remove all votes
      let refMatches = await Match.find().where('votes1').in(id).exec()
      refMatches.forEach(match => {
        match['votes1'] = match['votes1'].filter(id => id != id)
        match.save()
      })
      let refMatches2 = await Match.find().where('votes2').in(id).exec()
      refMatches2.forEach(match => {
        match['votes2'] = match['votes2'].filter(id => id != id)
        match.save()
      })

      return res.status(200).send("User deleted")
    }
    throw new Error("User not found")
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

/////////////////////////////////////////////////////////////
// /matches

app.get('/matches', async (req, res) => {
  try {
    const matches = await Match.find()
    res.json(matches)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

app.get('/matches/:id', async (req, res) => {
  try {
    const { id } = req.params
    const match = await Match.findById(id)
    if (!match) throw Error('Match not found')
    res.json(match)
  } catch (e) {
    console.log(e)
    res.send('Match not found!')
  }
})

app.post('/matches/:userId', async (req, res) => {
  try {
    const { userId } = req.params
    const match = await new Match({ ...req.body, creator: userId, votes1: [], votes2: [] })
    await match.save()
    res.status(201).json(match)
  } catch (error) {
    console.log(error)
    res.status(500).json({ error: error.message })
  }
})

app.put('/matches/:id', async (req, res) => {
  const { id } = req.params
  await Match.findByIdAndUpdate(id, req.body, { new: true }, (error, match) => {
    if (error) {
      return res.status(500).json({ error: error.message })
    }
    if (!match) {
      return res.status(404).json({ message: 'Match not found!' })
    }
    res.status(200).json(match)
  })
})

app.put('/matches/:id/vote', async (req, res) => {
  // looks to accept {"vote1": user_id}
  const { id } = req.params
  let newBody = {}
  let prev = await Match.findById(id)

  if ((req.body.votes1 && typeof req.body.votes1 !== 'string') || (req.body.votes2 && typeof req.body.votes2 !== 'string')) {
    return res.status(400).json('Invalid user_id type')
  }

  // hate this, redo it
  if (req.body.votes1) {
    if (prev.votes1.includes(req.body.votes1)) {
      newBody = {
        votes1: [...prev.votes1.filter(id => id != req.body.votes1)],
        votes2: [...prev.votes2],
        count: prev.count - 1
      }
    } else if (prev.votes2.includes(req.body.votes1)) {
      newBody = {
        votes1: [...prev.votes1, req.body.votes1],
        votes2: [...prev.votes2.filter(id => id != req.body.votes1)]
      }
    } else {
      newBody = {
        votes1: [...prev.votes1, req.body.votes1],
        count: prev.count + 1
      }
    }
  } else if (req.body.votes2) {
    if (prev.votes2.includes(req.body.votes2)) {
      newBody = {
        votes1: [...prev.votes1],
        votes2: [...prev.votes2.filter(id => id != req.body.votes2)],
        count: prev.count - 1
      }
    } else if (prev.votes1.includes(req.body.votes2)) {
      newBody = {
        votes1: [...prev.votes1.filter(id => id != req.body.votes2)],
        votes2: [...prev.votes2, req.body.votes2]
      }
    } else {
      newBody = {
        votes2: [...prev.votes2, req.body.votes2],
        count: prev.count + 1
      }
    }
  }

  await Match.findByIdAndUpdate(id, newBody, { new: true }, (error, match) => {
    if (error) {
      return res.status(500).json({ error: error.message })
    }
    if (!match) {
      return res.status(404).json({ message: 'Match not found!' })
    }
    res.status(200).json(match)
  })
})

app.delete('/matches/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await Match.findByIdAndDelete(id)
    if (deleted) {
      return res.status(200).send("Match deleted")
    }
    throw new Error("Match not found")
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})