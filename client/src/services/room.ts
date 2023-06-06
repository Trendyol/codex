import { User } from '@hooks/data/models/types';
import { ActionTypes } from '@modules/Room/models/enum';
import { io } from 'socket.io-client';
import { getConfigWithTypes } from '@contexts/ConfigContext';

const configs = getConfigWithTypes();

const socket = io(`${configs.baseUrl}/room`, {
  withCredentials: true,
  transports: ['websocket'],
});

export const joinRoom = (
  roomId: string,
  messageCallback: (user: User, message: string, time: string) => void,
  actionCallback: (user: User, key: ActionTypes, data?: any) => void,
) => {
  socket.connect();

  socket.emit('join_room', { roomId });

  socket.on('message_room', ({ user, message, time }) => {
    messageCallback(user, message, time);
  });

  socket.on('action_room', ({ user, key, data }) => {
    actionCallback(user, key, data);
  });
};

export const sendMessage = (user: User, roomId?: string, message?: string) => {
  socket.emit('send_message_room', { user, roomId, message });
};

export const sendAction = (user: User, roomId: string, key: ActionTypes, data?: any) => {
  socket.emit('send_action_room', { user, roomId, key, data });
};

export const disconnectSocket = () => {
  socket.disconnect();
};
