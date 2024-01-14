"use strict";Object.defineProperty(exports, "__esModule", {value: true});var _generateConsult = require('./../services/generateConsult');



 class GenerateConsultController {

  async handle(req, res) {
    const { body } = req;
    const {
      // image,
      consult
    } = body;
    
    const consultObj = {
      status: 'wait',
      ...consult,
    }

    const generateConsult = new (0, _generateConsult.GenerateConsult)(
      consultObj,
      // image
    );

    const request = await generateConsult.execute();

    return res.status(200).json(request)
  }
} exports.GenerateConsultController = GenerateConsultController;