const mongoose = require('mongoose');
const users = require('./data/users');
const { Referrer } = require('./models/referrerModel')
const db = require('./config/db')
const dotenv = require('dotenv')

dotenv.config({path:"./config.env"});

db();

const importData = async () => {
    try {
        await Referrer.deleteMany()

        await Referrer.insertMany(users)

        console.log('Imported!')
        process.exit()
    } catch (error) {
        console.error(`${error}`)
        process.exit(1)
    }
}

const destroyData = async () => {
    try {
        await Referrer.deleteMany()

        console.log('Destroyed!')
        process.exit()
    } catch (error) {
        console.error(`${error}`)
        process.exit(1)
    }
}


if (process.argv[2] === '-d') {
    destroyData()
} else {
    importData()
}