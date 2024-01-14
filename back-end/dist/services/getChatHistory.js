"use strict";Object.defineProperty(exports, "__esModule", {value: true});var _chat = require('./../model/chat');

 class GetChatHistory {
  
  

  constructor(userId, roomId) {
    this.userId = userId;
    this.roomId = roomId;
  }

  async getHistory() {
    const room = Number(this.roomId)
    const request = await _chat.getChatHistory.call(void 0, room);

    if(request.medic === this.userId || request.pacient === this.userId) return request;

    throw new Error('Without permission');
  }
} exports.GetChatHistory = GetChatHistory;