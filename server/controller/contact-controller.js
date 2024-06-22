
import Contact from '../model/contact.js'
import nodemailer from 'nodemailer'

export const contact= async (req, res) => {
  const { name, email, message } = req.body;

 
  const contact = new Contact({ name, email, message });
  await contact.save();

  
  const transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
      user: 'jerrykh449@gmail.com', 
      pass: 'aumj epeb wcrh yleh', 
    },
  });
  const mailOptions = {
    from: email,
    to: 'jerrykh449@gmail.com',
    subject: `Contact Form Submission from ${name}`,
    text: message,
  };
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      return res.status(500).send(error.toString());
    }
    res.status(200).send('Message sent: ' + info.response);
  });
}
