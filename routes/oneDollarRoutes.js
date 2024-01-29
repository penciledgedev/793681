const { Router } = require("express");
const oneDollarController = require("../controllers/oneDollarController");
const { oneDollarUserAuth } = require("../middleware/oneDollarUserAuth");


const router = Router();

router.post("/", oneDollarController.joinOneDollarCampaign);
router.get("/usernames", oneDollarController.getUsernames);
router.post("/new-donation", oneDollarController.makeNewDonation);
router.get("/donations", oneDollarUserAuth, oneDollarController.getDonations);
router.get("/admin-donations", oneDollarUserAuth, oneDollarController.getDonationsForAdmin);
router.get("/auth-status", oneDollarUserAuth, oneDollarController.getUserAuthStatus);
router.post("/login", oneDollarController.loginUser);

// router.get("/")

module.exports = router;