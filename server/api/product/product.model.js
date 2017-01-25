'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const BidSchema = new Schema({
    user: {type:String, ref: 'User'},
    value: Number,
    time: Date,
    message: String
});

const ProductSchema = new Schema({
  name: {type:String, required: true},
  bids: [BidSchema],
  created: { type: Date, default: Date.now },
  deadline: Date,
  description: {type:String, required: true},
  images: {type:String, required: true},
  startPrice: {type:Number, required: true},
  currentPrice: {type:Number},
  updated: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Product', ProductSchema);