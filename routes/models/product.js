'use strict'

const mongoose = require('mongoose')
const Schema = mongoose.Schema

const ProductSchema = Schema({
      namealet: String,
      namefile: String,
      base64file: String
})

module.exports = mongoose.model('products', ProductSchema)