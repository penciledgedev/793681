const express = require('express');
const {
  signUp,
  mandateSignUp,
  missionSignUp,
  outreachSignUp,
  Signin,
  Success,
  donate,
  new_donatenow,
} = require("../controllers/userControllers");
const { validateUser } = require('../models/bibleClubCoordinatorModel');
const { validateMandateUser } = require('../models/bibleMandateModel');
const { validateMissionsUser } = require('../models/bibleMissionsModel');
const validate = require('../middleware/validate');
const { validateOutreachUser } = require('../models/bibleOutreachModel');
const router = express.Router();

router.post('/bibleclub', validate(validateUser), signUp);
router.route('/biblemandate').post(mandateSignUp);
router.route('/biblemissions').post(validate(validateMissionsUser), missionSignUp);
router.route('/bibleoutreach').post(validate(validateOutreachUser), outreachSignUp);
// router.route('/donatenow').post(donate);
router.post("/donatenow", donate);

//special route for the standalone donatenow app
// router.post("/new-donatenow", new_donatenow);
//*** */

router.route('/success').post(Success);
router.route('/signin').post(Signin);



module.exports = router;