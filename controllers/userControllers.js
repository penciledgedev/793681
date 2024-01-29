const asyncHandler = require('express-async-handler');
const stripePay = require('../helper/stripe');
const _ = require("lodash");
const { Coordinator } = require('../models/bibleClubCoordinatorModel')
const {
  MandateUser,
  validateMandateUser,
} = require("../models/bibleMandateModel");

// const { DonatenowUser, validateDonatenowUser } = require("../models/donatenowUser");
const { MissionsUser } = require('../models/bibleMissionsModel');
const { OutreachUser } = require('../models/bibleOutreachModel');
const sendMail = require('../helper/mail')




const Success = asyncHandler(async (req, res) => {
    let biblemandatenetwork = "https://rhapsodybible.org/biblemandatenetwork?success=true"
    let biblemissions = "https://rhapsodybible.org/biblemissions?success=true"
    let millionbibleoutreaches = "https://rhapsodybible.org/1millionbibleoutreaches?success=true"

    if (req.body.parseData.url + "?success=true" === biblemandatenetwork) {
        const data = {
            from: 'Rhapsody Bible <partnership@rhapsodybible.org>',
            to: req.body.parseData.email,
            subject: 'Thank You For Your Donation',
            html: `<p>Dear ${req.body.parseData.firstName},</p> 
        <p>Thank you for your donation of ${req.body.parseData.amount}. Your donation will go a long way in changing lives around the world.</p>
        <p>God bless you.</p>
        <p>Rhapsody Bible Team</p>`
        }

        sendMail(data);

        const newDonation = {
            from: 'New donation <bmn@rhapsodybible.org>',
            to: 'bmn@rhapsodybible.org',
            subject: 'New Donation',
            html: `<p>First name:  ${req.body.parseData.firstName}</p><br>
        <p>Lastname: ${req.body.parseData.lastName}</p><br>
        <p>Phone number: ${req.body.parseData.phone}</p><br>
        <p>Email: ${req.body.parseData.email}</p><br>
        <p>Country: ${req.body.parseData.country}</p><br>
        <p>Amount donated: $${req.body.parseData.amount}</p>`
        }
        sendMail(newDonation)

    } else if (req.body.parseData.url + "?success=true" === biblemissions) {

        const data = {
            from: 'Rhapsody Bible <partnership@rhapsodybible.org>',
            to: req.body.parseData.email,
            subject: 'Thank You For Your Donation',
            html: `<p>Dear ${req.body.parseData.firstName},</p> 
        <p>Thank you for your donation. Your donation will go a long way in changing lives around the world.</p>
        <p>God bless you.</p>
        <p>Rhapsody Bible Team</p>`
        }

        sendMail(data);

        const newDonation = {
            from: 'New donation <partnership@rhapsodybible.org>',
            to: 'partnership@rhapsodybible.org',
            subject: 'New Donation',
            html: `<p>First name:  ${req.body.parseData.firstName}</p><br>
        <p>Lastname: ${req.body.parseData.lastName}</p><br>
        <p>Phone number: ${req.body.parseData.phone}</p><br>
        <p>Email: ${req.body.parseData.email}</p><br>
        <p>Country: ${req.body.parseData.country}</p><br>
        <p>Amount donated: $${req.body.parseData.amount}</p>
        <p>url: ${req.body.parseData.url}</p>`
        }
        sendMail(newDonation)

    } else if (req.body.parseData.url + "?success=true" === millionbibleoutreaches) {

        const data = {
            from: 'Rhapsody Bible <partnership@rhapsodybible.org>',
            to: req.body.parseData.email,
            subject: 'Thank You For Your Donation',
            html: `<p>Dear ${req.body.parseData.firstName},</p> 
        <p>Thank you for your donation. Your donation will go a long way in changing lives around the world.</p>
        <p>God bless you.</p>
        <p>Rhapsody Bible Team</p>`
        }

        sendMail(data);

        const newDonation = {
            from: 'New donation <partnership@rhapsodybible.org>',
            to: 'partnership@rhapsodybible.org',
            subject: 'New Donation',
            html: `<p>First name:  ${req.body.parseData.firstName}</p><br>
        <p>Lastname: ${req.body.parseData.lastName}</p><br>
        <p>Phone number: ${req.body.parseData.phone}</p><br>
        <p>Email: ${req.body.parseData.email}</p><br>
        <p>Country: ${req.body.parseData.country}</p><br>
        <p>Amount donated: $${req.body.parseData.amount}</p>
        <p>url: $${req.body.parseData.url}</p>`
        }
        sendMail(newDonation)
    } else if (req.body.parseData.url) {
        const data = {
            from: 'Rhapsody Bible <partnership@rhapsodybible.org>',
            to: req.body.parseData.email,
            subject: 'Thank You For Your Donation',
            html: `<p>Dear ${req.body.parseData.firstName},</p> 
        <p>Thank you for your donation. Your donation will go a long way in changing lives around the world.</p>
        <p>God bless you.</p>
        <p>Rhapsody Bible Team</p>`
        }

        sendMail(data);

        const newDonation = {
            from: 'New donation <partnership@rhapsodybible.org>',
            to: 'partnership@rhapsodybible.org',
            subject: 'New Donation',
            html: `<p>First name:  ${req.body.parseData.firstName}</p><br>
        <p>Lastname: ${req.body.parseData.lastName}</p><br>
        <p>Phone number: ${req.body.parseData.phone}</p><br>
        <p>Email: ${req.body.parseData.email}</p><br>
        <p>Country: ${req.body.parseData.country}</p><br>
        <p>Amount donated: $${req.body.parseData.amount}</p>
        <p>url: $${req.body.parseData.url}</p>`
        }
        sendMail(newDonation)
    }
  
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
    console.log(true)
    const { email, firstName, lastName, country, phone, bibles, donateLater, referrer, timeline, amount,day,month } = req.body
    console.log(req.body)
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
        amount,
        day,
        month
    })
    //rhapsodybible.org
    console.log("djdjjdjewooo")
    const stripeSession = await stripePay(Number(bibles), 'https://rhapsodybible.org/biblemandatenetwork')

    if (mandateUser && mandateUser.donateLater === '') {


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
            <p>Thank you for signing up to donate ₦${amount} on ${donateLater}. Your donation will go a long way in changing lives around the world.</p>
            <p>God bless you.</p>
            <p>Rhapsody Bible Team</p>`,
        }
        sendMail(data);

        const donate = {
            from: 'New Signup <bmn@rhapsodybible.org>',
            to: 'bmn@rhapsodybible.org',
            subject: 'New Signup',
            html: `<p>First name:${req.body.firstName}</p><br>
            <p>Lastname: ${req.body.lastName}</p><br>
            <p>Phone number: ${req.body.phone}</p><br>
            <p>Email: ${req.body.email}</p><br>
            <p>Country: ${req.body.country}</p><br>
            <p>Amount to be donated: ₦${req.body.amount} to be donated on ${donateLater}
            <p>timeline: ${req.body.timeline}
            <p>url: ${req.body.url}`
        }
        sendMail(donate)

        const dataForEmailAtChoosenTime = {
            from: 'Rhapsody Bible <partnership@rhapsodybible.org>',
            to: mandateUser.email,
            subject: 'Reminder For Donation',
            html: `<p>Dear ${mandateUser.firstName},</p> 
            <p>Thank you for signing up to donate  ₦${amount}. Your donation will go a long way in changing lives around the world.</p>
            <p>God bless you.</p>
            <p>Rhapsody Bible Team</p>`,
            "o:deliverytime": `${donateLater}`
        }

        sendMail(dataForEmailAtChoosenTime)



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
    const { email, firstName, lastName, country, phone, city, donateLater, timeline, referrer } = req.body

    const missionsUser = new MissionsUser({
        email,
        firstName,
        lastName,
        country,
        phone,
        city,
        donateLater,
        timeline,
        referrer,
    });

    await missionsUser.save();

    const stripeSession = await stripePay(Number(city * 125), 'https://rhapsodybible.org/biblemissions')

    if (missionsUser && missionsUser.donateLater === '') {


        return res.status(201).json({
            email: missionsUser.email,
            firstName: missionsUser.firstName,
            lastName: missionsUser.lastName,
            country: missionsUser.country,
            phone: missionsUser.phone,
            cities: missionsUser.city,
            timeline: missionsUser.timeline,
            referrer: missionsUser.referrer ? missionsUser.referrer : "",
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

        const donate = {
            from: 'New Signup <bmn@rhapsodybible.org>',
            to: 'bmn@rhapsodybible.org',
            subject: 'New Signup',
            html: `<p>First name:${req.body.firstName}</p><br>
            <p>Lastname: ${req.body.lastName}</p><br>
            <p>Phone number: ${req.body.phone}</p><br>
            <p>Email: ${req.body.email}</p><br>
            <p>Country: ${req.body.country}</p><br>
            <p>Amount to be donated: ₦${req.body.amount} to be donated on ${donateLater}
            <p>timeline: ${req.body.timeline}
            <p>url: ${req.body.url}`
        }
        sendMail(donate)

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
            referrer: missionsUser.referrer ? missionsUser.referrer : "",
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

        const donate = {
            from: 'Donate later <bmn@rhapsodybible.org>',
            to: 'bmn@rhapsodybible.org',
            subject: 'New Singup',
            html: `<p>First name:${req.body.firstName}</p><br>
            <p>Lastname: ${req.body.lastName}</p><br>
            <p>Phone number: ${req.body.phone}</p><br>
            <p>Email: ${req.body.email}</p><br>
            <p>Country: ${req.body.country}</p><br>
            <p>Amount to be donated: ₦${req.body.amount} to be donated on ${donateLater}
            <p>timeline: ${req.body.timeline}
            <p>url: ${req.body.url}`
        }
        sendMail(donate)

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




const donate = asyncHandler(async (req, res) => {
   
    //  const user = new MandateUser()
    //        user.email= req.body.parseData.email
    //        user.firstName=req.body.parseData.firstName
    //     user.lastName=req.body.parseData.lastName
    //     user.country=req.body.parseData.country
    //     user.phone=req.body.parseData.phone
    //     user.amount=req.body.parseData.amount
    //     user.bibles="N/A"
    //    user.save()

    const { error } = validateMandateUser(req.body);
     if (error) return res.status(400).send(error.details[0].message);
    const { email, firstName, lastName, country, phone, amount,currency,bibles } = req.body;
    
    const user = new MandateUser({
      email,
      firstName,
      lastName,
      country,
        phone,
        amount,
        currency,
      bibles
    });
    await user.save();

    res.send(user);    

})

// const new_donatenow= asyncHandler(async (req, res) => {
 
//   const { error } = validateDonatenowUser(req.body);
//   if (error) return res.status(400).send(error.details[0].message);
//   const { email, firstName, lastName, country, phone, amount, currency } =
//     req.body;

//   const user = new DonatenowUser({
//     email,
//     firstName,
//     lastName,
//     country,
//     phone,
//     amount,
//     currency
//   });
//   await user.save();

//   res.send(user);
// });

const Signin = asyncHandler(async (req, res) => {
let user=await MandateUser.findOne({email:req.body.email})
if(user){
    return res.status(201).json({user})


}
return res.status(201).json({message:"Email not found"})

})
module.exports = {
  signUp,
  mandateSignUp,
  missionSignUp,
  outreachSignUp,
  Success,
  donate,
  Signin,
//   new_donatenow,
};