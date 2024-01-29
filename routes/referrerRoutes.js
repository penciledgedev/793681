const express = require('express');
const {
  referrerLogin,
  getReferrals,
  getRefferralsById,
  getAllRefferer,
  getReferrerBankDetails,
} = require("../controllers/referrerController");
const router = express.Router();
const validate = require('../middleware/validate');
const { validateReferrer, Referrer } = require('../models/referrerModel');
const protect = require('../middleware/authMiddleware')
const adminProtect = require("../middleware/adminMiddleware");

router.post('/login', validate(validateReferrer), referrerLogin);
router.get('/getreferrals', protect, getReferrals);


//get referrals by id of a valid reffer
router.get("/all/:userId", adminProtect, getRefferralsById);

//returns all ref name for authtenticated admin 
router.get("/getreferrals/all",adminProtect,getAllRefferer)

//returns all ref name
router.get("/refname", getAllRefferer);

// get referral bank account details
router.get("/get-bank-details/:username", getReferrerBankDetails);

module.exports = router;