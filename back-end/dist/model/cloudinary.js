"use strict";Object.defineProperty(exports, "__esModule", {value: true});var _cloudinary = require('cloudinary');
require('dotenv/config');

_cloudinary.v2.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.API_KEY,
    api_secret: process.env.API_SECRET,
});

exports.v2 = _cloudinary.v2;