import nodemailer from 'nodemailer';
const {MAIL_SENDER, MAIL_USER, MAIL_PASSWORD} = process.env;
const ejs = require('ejs');
const fs = require('fs');
export const sendMail = async (receiver = [], subject, content, options = {}) => {
    try {
        const templateFile = fs.readFileSync(options.template, 'utf8');
        // Compile the EJS template
        const compiledTemplate = ejs.compile(templateFile);

        // Render the template with the data
        const renderedTemplate = compiledTemplate(content);
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
              user: MAIL_USER,
              pass: MAIL_PASSWORD
            }
          });
          const mailOptions = {
            from: options?.sender ?? MAIL_SENDER,
            to: receiver.toString(),
            subject: subject ?? 'Test Email',
            html: renderedTemplate
          };
          // console.log(transporter,mailOptions)
     return await transporter.sendMail(mailOptions);  
    } catch (error) {
        console.log("while sending mail", error);
        throw error;
    }
}