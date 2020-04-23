
const nodemailer = require("nodemailer");
const moment = require("moment")
module.exports = {


  friendlyName: 'Send mail',


  description: '',


  inputs: {
    data: { type: "ref" }
  },


  exits: {

    success: {
      description: 'All done.',
    },

  },


  fn: async function (inputs) {
    try {
      let { data } = inputs
      let transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: "daonghia1308@gmail.com",
          pass: "Nghia1999vn"
        }
      });
      let info = await transporter.sendMail({
        from: "daonghia1308@gmail.com",
        to: data.email,
        subject: `Notify the meeting`,
        html: `<div>
          <p>Dear ${data.fullName},</p>
          <p>Your meeting will be started at ${moment(data.time).format("DD - MM - YYYY")}</p>
          <p>Please be on time!</p>
        </div>`
      });
      console.log("Message sent: %s", info.messageId);
      // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

      // Preview only available when sending through an Ethereal account
      console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
      // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
    } catch (error) {
      console.log(error)
    }
  }
};

