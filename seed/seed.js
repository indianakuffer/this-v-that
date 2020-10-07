const db = require('../db/connection')
const User = require('../models/user')

db.on('error', console.error.bind(console, 'MongoDB connection error:'))

const main = async () => {
  const users =
    [
      {
        "googleId": "googleId_here"
      }
    ]

  await User.insertMany(users)
  console.log("Created users!")
}
const run = async () => {
  await main()
  db.close()
}

run()