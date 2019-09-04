'use strict'

const express = require('express')
const asyncify = require('express-asyncify')
const Joi = require('joi')
const sendEmail = require('../SendGrid')

const routes = asyncify(express.Router())

const bodyMessage = Joi.object().keys({
  collector: Joi.object().keys({
    to: Joi.object().keys({
      email: Joi.string().required(),
      nombre: Joi.string().required(),
    }).required(),
    from: Joi.object().keys({
      name: Joi.string().required(),
      email: Joi.string().required()
    }),
    subject: Joi.string().required(),
    html: Joi.string().required(),
    categoria_sendgrid: Joi.string().required()
  }).required()
})

//SendMail:^#58wv=CQ=\@PPUH
//U2VuZE1haWw6XiM1OHd2PUNRPVxAUFBVSA==

routes.post('/send', async(req, res, next) => {
  console.log('Request a /send')
  try{
      let dataAuth = req.headers.authorization
      console.log(dataAuth)
      if(dataAuth === undefined){
        return res.status(400).send({error: true, message: 'No se enviaron datos en headers'})
      }else{
        const {body} = req
        await Joi.validate(body, bodyMessage)
        let consulta = {
            to: {
              name: body.collector.to.nombre,
              email: body.collector.to.email,
            },
            from: {
                name: body.collector.from.name,
                email: body.collector.from.email,
            },
            subject:  body.collector.subject,
            html: body.collector.html,
            categoria_sendgrid:  body.collector.categoria_sendgrid
        }
         sendEmail.sendEmail(consulta)
        
        return res.status(200).send({error: false, message: 'Consulta enviada correctamente'})
      }
  }catch(err){
      return next(err)
  }
})


module.exports = routes
