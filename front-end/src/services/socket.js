import { io } from 'socket.io-client';

const socket = io('https://mednetbackend-5e56eedccbf5.herokuapp.com/');

export default socket;