// Importing Nodemailer for sending emails
const nodemailer = require('nodemailer');

// Controller for sending emails
exports.sendEmail = async (req, res) => {
  const { name, email, message } = req.body;
  console.log('Request body:', req.body);

  try {
    // Configure SMTP transporter
    const transporter = nodemailer.createTransport({
      host: 'ssl0.ovh.net',
      port: 465,
      secure: true,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    // Define email options
    const mailOptions = {
      from: '"Portfolio Contact" <contacter-moi@ysportfolio.fr>',
      to: 'contacter-moi@ysportfolio.fr',
      subject: 'Contact From Portfolio',
      text: `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`,
      html: `<p><strong>Name:</strong> ${name}</p><p><strong>Email:</strong> ${email}</p><p>${message}</p>`,
      replyTo: email,
    };

    // Verify SMTP configuration
    transporter.verify((error, success) => {
      if (error) {
        console.error('SMTP connection error:', error);
      } else {
        console.log('SMTP server is ready to accept messages');
      }
    });

    // Send the email
    await transporter.sendMail(mailOptions);
    console.log('Email sent successfully');

    res.status(200).json({ message: 'Email sent successfully.' });
  } catch (error) {
    console.error('Error handling form submission:', error);
    res.status(500).json({ message: 'Failed to send email.', error });
  }
};
