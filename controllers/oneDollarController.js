const bcryptjs = require("bcryptjs");
const { validateNewOneDollarCampaign, OneDollarCampaign } = require("../models/oneDollarCampaignModel")
const { generateTokenForOneDollarUser } = require("../utils/utils");
const { validateNewOneDollarDonation, OneDollarDonation } = require("../models/oneDollarDonationsModel");
const emailUser = require("../utils/mailUtil");

exports.joinOneDollarCampaign = async (req, res) => {
    const validNewCampaign = validateNewOneDollarCampaign(req.body);
    if (validNewCampaign.error) return res.status(400).send(validNewCampaign.error.details[0].message);

    const usernamePassedExists = await OneDollarCampaign.findOne({ username: validNewCampaign.value.username });
    if (usernamePassedExists) return res.status(409).send("Username already taken");

    const userAlreadyHasCampaign = await OneDollarCampaign.findOne({ email: validNewCampaign.value.email });
    if (userAlreadyHasCampaign) return res.status(409).send("User has already created campaign");

    const hashAndSaltedPassword = await bcryptjs.hash(validNewCampaign.value.password, 10);

    try {
        const newCampaign = await OneDollarCampaign.create({...validNewCampaign.value, password: hashAndSaltedPassword});
        
        emailUser(validNewCampaign.value.email, {
            loginLink: `https://app.nowthatyouarebornagain.org/login`,
            uniqueLink: `https://app.nowthatyouarebornagain.org/1dollar/${validNewCampaign.value.username}`,
            subject: 'Congratulations! You have created your unique link!',
            template: 'newLinkCreationContent',
        });

        return res.status(200).send(newCampaign)
    } catch (error) {
        // console.log(error);
        return res.status(500).send("An error occured while trying to register you for the campaign")
    }
}

exports.getUsernames = async (req, res) => {
    const allUsernames = await OneDollarCampaign.find({}).select('username');
    return res.status(200).send(allUsernames);
}

exports.makeNewDonation = async (req, res) => {
    const validNewDonation = validateNewOneDollarDonation(req.body);
    if (validNewDonation.error) return res.status(400).send(validNewDonation.error.details[0].message);

    const usernamePassedExists = await OneDollarCampaign.findOne({ username: validNewDonation.value.usernameUsed });
    if (!usernamePassedExists) return res.status(404).send("Username not found");

    try {
        await OneDollarDonation.create(validNewDonation.value);
        return res.status(200).send("Donation added!")
    } catch (error) {
        console.log(error);
        return res.status(500).send("An error occured while trying to add your donation")
    }
}

exports.getDonations = async (req, res) => {
    const donations = await OneDollarDonation.find({ email: req.user.email, usernameUsed: req.user.username }).sort({ createdAt: -1 });
    return res.status(200).send(donations);
}

exports.getDonationsForAdmin = async (req, res) => {
    if (!req.user.isAdminUser) return res.status(403).send("You are not authorized to view this");

    try {
        const [donations, usersWithCampaign] = await Promise.all([
            OneDollarDonation.find({ }).sort({ createdAt: -1 }).lean(),
            OneDollarCampaign.find({ }).select("username isAdminUser").lean()
        ])
    
        return res.status(200).send({
            donations,
            users: usersWithCampaign
        });    
    } catch (error) {
        return res.status(500).send("An error occured while trying to fetch donations for admin user");
    }
    
}

exports.getUserAuthStatus = async (req, res) => {
    return res.status(200).send({ profile: req.user });
}

exports.loginUser = async (req, res) => {
    const { email, password } = req.body;
    
    if (!email) return res.status(400).send("'email' required");
    if (!password) return res.status(400).send("'password' required");

    const existingUser = await OneDollarCampaign.findOne({ email: email }).lean();
    if (!existingUser) return res.status(401).send('Invalid email or password');

    const passwordMatch = await bcryptjs.compare(password, existingUser.password);
    if (!passwordMatch) return res.status(401).send('Invalid email or password');

    const copyOfExistingUser = {...existingUser};
    delete copyOfExistingUser.password;

    const accessToken = await generateTokenForOneDollarUser({ _id: existingUser._id, email: existingUser.email, username: existingUser.username });

    res.status(200).json({
        accessToken: accessToken,
        user: copyOfExistingUser,
    });
}
