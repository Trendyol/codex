import { User } from '@hooks/data/models/types';
import { ActionTypes } from '@modules/Room/models/enum';
import { io } from 'socket.io-client';

const socket = io('http://localhost:4000/room', {
  withCredentials: true,
});

export const joinRoom = (
  roomId: string,
  messageCallback: (user: User, message: string) => void,
  actionCallback: (user: User, key: ActionTypes, data?: any) => void,
) => {
  socket.emit('join_room', { roomId });

  socket.on('message_room', ({ user, message }) => {
    messageCallback(user, message);
  });

  socket.on('action_room', ({ user, key, data }) => {
    actionCallback(user, key, data);
  });
};

export const sendMessage = (roomId?: string, message?: string) => {
  socket.emit('send_message_room', { roomId, message });
};

export const sendAction = (roomId: string, key: ActionTypes, data?: any) => {
  socket.emit('send_action_room', { roomId, key, data });
};

export const disconnectSocket = () => {
  socket.disconnect();
};