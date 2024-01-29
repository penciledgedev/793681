const asyncHandler = require('express-async-handler');
const stripePay = require('../helper/stripe');
const { Coordinator } = require('../models/bibleClubCoordinatorModel')
const { MandateUser } = require('../models/bibleMandateModel');
const { MissionsUser } = require('../models/bibleMissionsModel');
const { OutreachUser } = require('../models/bibleOutreachModel');
const sendMail = require('../helper/mail')




const Success = asyncHandler(async (req, res) => {
console.log(req.body)
})

const signUp = asyncHandler(async (req, res) => {
    const { email, firstName, lastName, country, phone, city } = req.body

    const emailExits = await Coordinator.findOne({ email })

    if (emailExits) {
        res.status(400)
        throw new Error('Email already exists')
    }

    const coordinator = await Coordinator.create({
        email,
        firstName,
        lastName,
        country,
        phone,
        city
    })

    if (coordinator) {
        const data = {
            from: 'Rhapsody Bible <partnership@rhapsodybible.org>',
            to: coordinator.email,
            subject: 'Thank You For Signing Up',
            html: `<p>Dear ${coordinator.firstName},</p> 
            <p>Thank you for signing up to be a BFAM Bible Club Coordinator. Our admin personnel will contact you soon.</p>
            <p>God bless you.</p>
            <p>Rhapsody Bible Team</p>`
        }

        sendMail(data);

        return res.status(201).json({
            email: coordinator.email,
            firstName: coordinator.firstName,
            lastName: coordinator.lastName,
            country: coordinator.country,
            phone: coordinator.phone,
            city: coordinator.city
        })
    } else {
        res.status(400)
        throw new Error('something went wrong')
    }
})

const mandateSignUp = asyncHandler(async (req, res) => {
    const { email, firstName, lastName, country, phone, bibles, donateLater, referrer, timeline, amount } = req.body

    const mandateUser = await MandateUser.create({
        email,
        firstName,
        lastName,
        country,
        phone,
        bibles,
        donateLater,
        referrer,
        timeline,
        amount
    })
    //rhapsodybible.org

    const stripeSession = await stripePay(Number(bibles), 'http://localhost:3000/biblemandatenetwork')

    if (mandateUser && mandateUser.donateLater === '') {
        const data = {
            from: 'Rhapsody Bible <partnership@rhapsodybible.org>',
            to: mandateUser.email,
            subject: 'Thank You For Your Donation',
            html: `<p>Dear ${mandateUser.firstName},</p> 
            <p>Thank you for your donation of ${amount}. Your donation will go a long way in changing lives around the world.</p>
            <p>God bless you.</p>
            <p>Rhapsody Bible Team</p>`
        }

        sendMail(data);

        return res.status(201).json({
            id: mandateUser._id,
            email: mandateUser.email,
            firstName: mandateUser.firstName,
            lastName: mandateUser.lastName,
            country: mandateUser.country,
            phone: mandateUser.phone,
            bibles: mandateUser.bibles,
            referrer: mandateUser.referrer,
            timeline: mandateUser.timeline,
            amount: mandateUser.amount,
            stripeId: stripeSession
        })
    } else if (mandateUser.donateLater !== '') {
        const data = {
            from: 'Rhapsody Bible <partnership@rhapsodybible.org>',
            to: mandateUser.email,
            subject: 'Thank You For Signing Up',
            html: `<p>Dear ${mandateUser.firstName},</p> 
            <p>Thank you for signing up to donate ${amount} on ${donateLater}. Your donation will go a long way in changing lives around the world.</p>
            <p>God bless you.</p>
            <p>Rhapsody Bible Team</p>`,
        }
        sendMail(data);

        const dataForEmailAtChoosenTime = {
            from: 'Rhapsody Bible <partnership@rhapsodybible.org>',
            to: mandateUser.email,
            subject: 'Reminder For Donation',
            html: `<p>Dear ${mandateUser.firstName},</p> 
            <p>Thank you for signing up to donate ${amount}. Your donation will go a long way in changing lives around the world.</p>
            <p>God bless you.</p>
            <p>Rhapsody Bible Team</p>`,
            "o:deliverytime": `${donateLater}`
        }

        sendMail(dataForEmailAtChoosenTime)


        const newDonation = {
            from: 'New donation <BMN@rhahpsodybible.org>',
            to: "BMN@rhahpsodybible.org",
            subject: 'New Donation',
            html: `<p>First name:  ${mandateUser.firstName},</p><br>
            <p>Lastname: ${mandateUser.lastName}</p><br>
            <p>Phone number: ${mandateUser.phone}</p><br>
            <p>Email: ${mandateUser.email}</p><br>
            <p>Country: ${mandateUser.country}</p><br>
            <p>Amount donated: ${amount}</p>`
        } 
        sendMail(newDonation)

        return res.status(201).json({
            id: mandateUser._id,
            email: mandateUser.email,
            firstName: mandateUser.firstName,
            lastName: mandateUser.lastName,
            country: mandateUser.country,
            phone: mandateUser.phone,
            bibles: mandateUser.bibles,
            donateLater: mandateUser.donateLater,
            timeline: MandateUser.timeline,
            amount: mandateUser.amount,
            referrer: mandateUser ? mandateUser.referrer : null
        })

    } else {
        res.status(400)
        throw new Error('something went wrong')
    }
})

const missionSignUp = asyncHandler(async (req, res) => {
    const { email, firstName, lastName, country, phone, city, donateLater, timeline } = req.body

    const missionsUser = await MissionsUser.create({
        email,
        firstName,
        lastName,
        country,
        phone,
        city,
        donateLater,
        timeline
    })

    const stripeSession = await stripePay(Number(city * 125), 'https://rhapsodybible.org/biblemissions')

    if (missionsUser && missionsUser.donateLater === '') {
        const data = {
            from: 'Rhapsody Bible <partnership@rhapsodybible.org>',
            to: missionsUser.email,
            subject: 'Thank You For Your Donation',
            html: `<p>Dear ${missionsUser.firstName},</p> 
            <p>Thank you for your donation. Your donation will go a long way in changing lives around the world.</p>
            <p>God bless you.</p>
            <p>Rhapsody Bible Team</p>`
        }

        sendMail(data);

        return res.status(201).json({
            email: missionsUser.email,
            firstName: missionsUser.firstName,
            lastName: missionsUser.lastName,
            country: missionsUser.country,
            phone: missionsUser.phone,
            cities: missionsUser.city,
            timeline: missionsUser.timeline,
            stripeId: stripeSession
        })
    } else if (missionsUser.donateLater !== '') {
        const data = {
            from: 'Rhapsody Bible <partnership@rhapsodybible.org>',
            to: missionsUser.email,
            subject: 'Thank You For Signing Up',
            html: `<p>Dear ${missionsUser.firstName},</p> 
            <p>Thank you for signing up to donate ₦${Number(city) * 1000000} on ${donateLater}. Your donation will go a long way in changing lives around the world.</p>
            <p>God bless you.</p>
            <p>Rhapsody Bible Team</p>`,
        }
        sendMail(data);

        const dataForEmailAtChoosenTime = {
            from: 'Rhapsody Bible <partnership@rhapsodybible.org>',
            to: missionsUser.email,
            subject: 'Reminder For Donation',
            html: `<p>Dear ${missionsUser.firstName},</p> 
            <p>Thank you for signing up to donate ₦${Number(city) * 1000000}. Your donation will go a long way in changing lives around the world.</p>
            <p>God bless you.</p>
            <p>Rhapsody Bible Team</p>`,
            "o:deliverytime": `${donateLater}`
        }

        sendMail(dataForEmailAtChoosenTime)

        return res.status(201).json({
            id: missionsUser._id,
            email: missionsUser.email,
            firstName: missionsUser.firstName,
            lastName: missionsUser.lastName,
            country: missionsUser.country,
            phone: missionsUser.phone,
            bibles: missionsUser.bibles,
            timeline: missionsUser.timeline,
            donateLater: missionsUser.donateLater,
        })
    } else {
        res.status(400)
        throw new Error('something went wrong')
    }
})

const outreachSignUp = asyncHandler(async (req, res) => {
    const { email, firstName, lastName, country, phone, outreachType, bibles, donateLater, timeline } = req.body

    const outreachUser = await OutreachUser.create({
        email,
        firstName,
        lastName,
        country,
        phone,
        outreachType,
        bibles,
        donateLater,
        timeline
    })

    const stripeSession = await stripePay(Number(bibles), 'https://rhapsodybible.org/1millionbibleoutreaches')

    if (outreachUser) {
        const data = {
            from: 'Rhapsody Bible <partnership@rhapsodybible.org>',
            to: outreachUser.email,
            subject: 'Thank You For Your Donation',
            html: `<p>Dear ${outreachUser.firstName}</p>, 
            <p>Thank you for your donation. Your donation will go a long way in changing lives around the world.</p>
            <p>God bless you.</p>
            <p>Rhapsody Bible Team</p>`
        }

        sendMail(data);

        return res.status(201).json({
            email: outreachUser.email,
            firstName: outreachUser.firstName,
            lastName: outreachUser.lastName,
            country: outreachUser.country,
            phone: outreachUser.phone,
            outreachType: outreachUser.outreachType,
            bibles: outreachUser.bible,
            timeline: outreachUser.timeline,
            stripeId: stripeSession,
        })
    } else if (outreachUser.donateLater !== '') {
        const data = {
            from: 'Rhapsody Bible <partnership@rhapsodybible.org>',
            to: outreachUser.email,
            subject: 'Thank You For Signing Up',
            html: `<p>Dear ${outreachUser.firstName},</p> 
            <p>Thank you for signing up to donate ₦${Number(bibles) * 4200} on ${donateLater}. Your donation will go a long way in changing lives around the world.</p>
            <p>God bless you.</p>
            <p>Rhapsody Bible Team</p>`,
        }
        sendMail(data);

        const dataForEmailAtChoosenTime = {
            from: 'Rhapsody Bible <partnership@rhapsodybible.org>',
            to: outreachUser.email,
            subject: 'Reminder For Donation',
            html: `<p>Dear ${outreachUser.firstName},</p> 
            <p>Thank you for signing up to donate ₦${Number(bibles) * 4200}. Your donation will go a long way in changing lives around the world.</p>
            <p>God bless you.</p>
            <p>Rhapsody Bible Team</p>`,
            "o:deliverytime": `${donateLater}`
        }

        sendMail(dataForEmailAtChoosenTime)

        return res.status(201).json({
            id: outreachUser._id,
            email: outreachUser.email,
            firstName: outreachUser.firstName,
            lastName: outreachUser.lastName,
            country: outreachUser.country,
            phone: outreachUser.phone,
            bibles: outreachUser.bibles,
            timeline: outreachUser.timeline,
            donateLater: outreachUser.donateLater,
        })
    } else {
        res.status(400)
        throw new Error('something went wrong')
    }
})



module.exports = {
    signUp,
    mandateSignUp,
    missionSignUp,
    outreachSignUp,
    Success
}