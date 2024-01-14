"use strict";Object.defineProperty(exports, "__esModule", {value: true});var _FindUser = require('../utils/FindUser');

var _client = require('../prisma/client');
var _chat = require('../model/chat');
var _cloudinary = require('../model/cloudinary');

 class GenerateConsult {
  
  // image: string

  constructor(
    consult,
    // image : string
  ) {
    this.consult = consult;
    // this.image = image;
  }

  async execute() {

    const findUser = new (0, _FindUser.FindUser)(this.consult.medicId);

    const user = await findUser.byId();

    if(!user) throw new Error('User doesn\'t exist');


    // if(!user.userData) throw new Error('you have to provide your medical information before you can make a consultation');
    
    if(user.role === 'USER') throw new Error('The ID provided is not associated with any doctor');
    
    // const img = await this.upload(this.image);

    // if(!img.url) throw new Error('Image can\'t be uploaded');
    
    const request = await _client.client.consult.create({
      data: {
        ...this.consult
      }
    });


    await _chat.createRoom.call(void 0, 
      request,
      // img
    );
    
    return { status: 'success', message: 'request processed successfully' };
  }

  async upload(image) {
    try {
      if(!image) return { url: 'https://freefrontend.com/assets/img/500-error-page-html-templates/HTML-500-Internal-Error.png', format: 'png'}
      const request = await _cloudinary.v2.uploader.upload(image, {
          upload_preset: 'ml_default',
      });
      return request
  } catch (err) {
      console.error('FATAL ERROR 53:',err);
  }

  }

} exports.GenerateConsult = GenerateConsult;