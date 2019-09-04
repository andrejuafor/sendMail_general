const sgMail = require('@sendgrid/mail')
// import config from '../src/server/config'

sgMail.setApiKey(process.env.SENDGRID_API_KEY);
//sgMail.setSubstitutionWrappers('{{', '}}')

module.exports = {
  sendEmail (object) {
      let data = {
        to: object.to,
        from: object.from,
        subject: object.subject,
        text: object.subject,
        html: object.html,
        categories: [object.categoria_sendgrid]
      }
      let resultMail = sgMail.send(data)
      return resultMail.statusCode
    }
}


