"use strict";Object.defineProperty(exports, "__esModule", {value: true});var _connection = require('./connection');
var _uuidv4 = require('uuidv4');

 const createRoom = async (
  data,
  image) => {
    console.log("hola");

  const { id, userId, medicId } = data;
  await _connection.connection.then((db) => 
    db.collection('history').insertOne({ pacient: userId, medic: medicId, 
      // images: [image],
      room: id, messages: [] }));
}; exports.createRoom = createRoom

 const updateChatHistory = async (data) => {
  const id = Number(data.room);
  const objectId = _uuidv4.uuid.call(void 0, );
  console.log("holaa");

  const info = { id: objectId, ...data};

  const consult = await _connection.connection.then((db) =>  db.collection('history').findOne({ room: id}));

  if(consult.pacient === data.user || consult.medic === data.user) return await _connection.connection.then((db) => 
  db.collection('history').updateOne({ room: id }, { $push: {  messages: info } } ));
  
}; exports.updateChatHistory = updateChatHistory

 const getChatHistory = async (id) => {
  console.log("holaaa");

  return await _connection.connection.then((db) => 
  db.collection('history').findOne({ room: id } ));
}; exports.getChatHistory = getChatHistory

