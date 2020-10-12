const db = require('../db/connection')
const User = require('../models/user')
const Match = require('../models/match')

db.on('error', console.error.bind(console, 'MongoDB connection error:'))

const seedUsers = async () => {
  const users =
    [
      {
        "googleId": "googleId_here",
        'email': 'indianakuffer@gmail.com',
        'familyName': 'Kuffer',
        'givenName': 'Indiana',
        'imageUrl': 'http://image.image.image.com',
      }
    ]

  await User.insertMany(users)
  console.log("Created users!")
}

const seedMatches = async () => {
  const matches =
    [
      {
        'option1': 'Red',
        'option2': 'Blue',
      }
    ]

  await Match.insertMany(matches)
  console.log("Created matches!")
}

const run = async () => {
  seedUsers()
  await seedMatches()

  db.close()
}

run()