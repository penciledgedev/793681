const nodemailer = require("nodemailer");
const mg = require("nodemailer-mailgun-transport");
const handlebars = require("handlebars");
const fs = require("fs");
const path = require("path");

module.exports = function (email, content) {
  function returnContent() {
    switch (content.template) {
      case "newLinkCreationContent":
        return {
          loginLink: content.loginLink,
          uniqueLink: content.uniqueLink,
          subject: content.subject,
        };
      default:
        return {};
    }
  }

  const emailTemplateSource = fs.readFileSync(
    path.join(__dirname, `../templates/${content.template}.hbs`),
    "utf8"
  );

  const mailgunAuth = {
    auth: {
      api_key: process.env.MAILGUN_API_KEY,
      domain: process.env.MAILGUN_DOMAIN,
    },
  };

  const smtpTransport = nodemailer.createTransport(mg(mailgunAuth));

  const template = handlebars.compile(emailTemplateSource);

  const htmlToSend = template({
    year: new Date().getFullYear(),
    content: returnContent(),
    logo: "https://nowthatyouarebornagain.org/wp-content/uploads/2021/03/NTYABA-LOGO-small.png",
  });

  const mailOptions = {
    from: `NTYABA <info@nowthatyouarebornagain.org>`,
    to: email,
    subject: content.subject,
    html: htmlToSend,
  };

  smtpTransport.sendMail(mailOptions, function (error, response) {
    if (error) {
      console.log(error);
    } else {
      console.log(`Successfully sent email to ${mailOptions.to}.`);
    }
  });
};
