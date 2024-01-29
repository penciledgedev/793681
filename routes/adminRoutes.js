const express = require("express");
const router = express.Router();
const Joi = require("joi");
const _ = require("lodash");
const bcrypt = require("bcrypt");
const { Admin, validateAdmin } = require("../models/adminModel");
const { MandateUser } = require("../models/bibleMandateModel");
const { DonatenowUser } = require("../models/donatenowUser");
const adminProtect = require("../middleware/adminMiddleware");


router.post("/ghuskojsjd/gudidmd", async (req, res) => {
  const { error } = validateAdmin(req.body);
  if (error) return res.status(400).send(error.details[0].message);
    let admin;
  
    try {
         admin = await Admin.findOne({ name: req.body.name });
  if (admin) return res.status(400).send("name registered to another admin.");

     admin = new Admin(_.pick(req.body, ["name", "password"]));
        
  const salt = await bcrypt.genSalt(10);
  admin.password = await bcrypt.hash(admin.password, salt);
  await admin.save();

  const token = admin.generateAuthToken();
  res
    .header("admin-token", token)
    .header("access-control-expose-headers", "admin-token")
    .send(_.pick(admin, ["name", "_id","isAdmin"]));
    }catch(ex){
        console.log(ex);
    }
 
});


router.post("/signin", async (req, res) => {
  const { error } = validateAdmin(req.body);
  if (error) return res.status(400).send(error.details[0].message);


    let admin = await Admin.findOne({ name: req.body.name });
    if (!admin) return res.status(400).send("Invalid credentials");

     const validPassword = await bcrypt.compare(
       req.body.password,
       admin.password
     );
     if (!validPassword) return res.status(400).send("Invalid password");

     const token = admin.generateAuthToken();
     res.send(token);
});


router.get("/usersdonations/all", adminProtect, async (req, res) => {
  const user = await MandateUser.find({ referrer: "" });
  if (user) {
    res.json({ user });
  } else {
    res.status(404).send("No users at all")
  }
});

router.get("/usersemail", adminProtect, async (req, res) => {
  const users = await MandateUser.find().sort("email").select("email");
  
    
       function removeDuplicates(arr) {
         var unique = [];
         arr.forEach((element) => {
           if (!unique.includes(element.email)) {
             unique.push(element.email);
           }
         });
         return unique;
       }

       var newArr = [];
  function convertToArrObj(newArr) {
    const data = removeDuplicates(users);
    data.map(val => newArr.push({ email: val }))
  }
  convertToArrObj(newArr);

  res.send(newArr);
})


function validate(email) {
  const userEmail = Joi.string().required().email()
  return userEmail.validate(email);
}


router.get("/new-donatenow", adminProtect, async (req, res) => {
 const user = await MandateUser.find({ bibles: "N/A" });
 if (user) {
   res.json({ user });
 } else {
   res.status(404).send("No users at all");
 }
})
module.exports = router;
    