import nodeMailer from "nodemailer";

export const sendEmail = async (options) => {
  // console.log("OPTIONS:", options);

export const sendEmail = async (options) => {
>>>>>>> 01408f9db6e9f9b896d80cf40404a295b58e63f8
  const transporter = nodeMailer.createTransport({
    host: process.env.SMPT_HOST,
    port: process.env.SMPT_PORT,
    service: process.env.SMPT_SERVICE,
    auth: {
      user: process.env.SMPT_MAIL,
      pass: process.env.SMPT_PASSWORD,
    },
  });

  const mailOptions = {
    from: process.env.SMPT_MAIL,
    to: options.email,
    subject: options.subject,
<<<<<<< HEAD
    // text: options.message,

    html: options.message,
  };

=======
    text: options.message,
  };
>>>>>>> 01408f9db6e9f9b896d80cf40404a295b58e63f8
  await transporter.sendMail(mailOptions);
};
