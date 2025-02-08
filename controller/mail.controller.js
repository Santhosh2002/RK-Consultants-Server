const sgMail = require('@sendgrid/mail')
sgMail.setApiKey(process.env.API_KEY); 

const sendMail = (req,res) => {
    const {email, subject, message} = req.body;
    if (!email || !subject || !message) {
        return res.status(400).json({error: 'All fields are required'})
    }
    const msg = {
        to: email,
        from: 'info@rkrealco.com',
        subject: subject,
        text: message,
        html: message
    }
    console.log(msg)
    sgMail.send(msg).then(()=>{
        res.status(200).json({message: 'Email sent successfully'})
    }).catch((error)=>{
        res.status(500).json({error: error})
    })
}

module.exports = {sendMail}