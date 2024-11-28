// services/notificationService.js
import { Server } from 'socket.io';

class NotificationService {
  constructor(server) {
    this.io = new Server(server);
    
    this.io.on('connection', (socket) => {
      socket.on('join-room', (dialogueId) => {
        socket.join(`dialogue-${dialogueId}`);
      });
    });
  }

  async notifyDialogueUpdate(dialogueId, update) {
    this.io.to(`dialogue-${dialogueId}`).emit('dialogue-update', update);
  }
}