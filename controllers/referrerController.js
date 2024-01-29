 const asyncHandler = require('express-async-handler');
const { Referrer } = require('../models/referrerModel');
const { MandateUser } = require('../models/bibleMandateModel');
const generateToken = require('../utils/generateToken');

const referrerLogin = asyncHandler(async (req, res) => {
    const { username, password } = req.body

    const user = await Referrer.findOne({ username })

    if (user && (user.matchPassword(password))) {
        res.json({
            _id: user._id,
            username: user.username,
            token: generateToken(user._id)
        })
    } else {
        res.status(401)
        throw new Error('Invalid email or password')
    }


})

const getReferrals = asyncHandler(async (req, res) => {
    const user = await Referrer.findById(req.user._id)
    const username = user.username

    if (user) {
        const referrals = await MandateUser.find({ referrer: username }).exec()
        res.json({
            referrals
        })
    } else {
        res.status(404)
        throw new Error('User not Found')
    }
});


const getRefferralsById = asyncHandler(async (req, res) => {
    const user = await Referrer.findById(req.params.userId);
    const username = user.username;
     if (user) {
       const referrals = await MandateUser.find({ referrer: username }).exec();
       res.json({
         referrals,
       });
     } else {
       res.status(404).send("User not Found");
    //    throw new Error("User not Found");
     }
})


const getAllRefferer = asyncHandler(async (req, res) => {
    const users = await Referrer.find().sort("name").select(["username","__id"])
  res.send(users)  
})

const getReferrerBankDetails = asyncHandler(async (req, res) => {
  const referrer = await Referrer.findOne({ username: req.params.username });

  if (!referrer) return res.status(404).send("No referrer found with that username");

  return res.status(200).send(referrer.bankDetails);
})

module.exports = {
  referrerLogin,
  getReferrals,
  getRefferralsById,
  getAllRefferer,
  getReferrerBankDetails,
};