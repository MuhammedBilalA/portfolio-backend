import nodemailer from 'nodemailer';

export const sendMail = async (req, res) => {
  const { name, email, mobile, message } = req.body;
  console.log('Email request received:', { name, email, mobile, message });

  if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
    return res.status(500).json({
      error: 'Failed to send email',
      details: 'Email credentials are not configured on the server',
    });
  }

  try {
    const transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 465,
      secure: true,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS.replace(/\s/g, ''),
      },
    });

    await transporter.sendMail({
      from: `"${name}" <${process.env.EMAIL_USER}>`,
      replyTo: email,
      to: process.env.EMAIL_TO,
      cc: 'bilalmuhammed402dev@gmail.com',
      subject: 'New Portfolio Message from Your Website',
      html: `
        <div style="font-family: Arial, sans-serif; padding: 20px; border-radius: 8px; background-color: #f9f9f9; color: #333;">
          <h2 style="color: #2c3e50;">📬 New Message from Portfolio Website</h2>
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Mobile:</strong> ${mobile || 'Not provided'}</p>
          <p><strong>Message:</strong></p>
          <p style="white-space: pre-wrap; background-color: #fff; padding: 15px; border-left: 4px solid #3498db; border-radius: 4px;">
            ${message}
          </p>
          <hr style="margin: 20px 0;" />
          <p style="font-size: 12px; color: #888;">This message was sent from your portfolio website contact form.</p>
        </div>
      `,
    });

    res.status(200).json({ message: 'Email sent successfully' });

  } catch (error) {
    console.error('Error sending email:', error);
    res.status(500).json({ error: 'Failed to send email', details: error.message });
  }
};
