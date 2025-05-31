// socket.js
let io;

module.exports = function (server) {
    const { Server } = require('socket.io');
    io = new Server(server, {
        cors: {
            origin: '*', // ganti dengan frontend production
            methods: ['GET', 'POST']
        }
    });

    io.on('connection', (socket) => {
        console.log(`🟢 Socket connected: ${socket.id}`);

        // saat client join di kelas
        socket.on('join_class', (roomId) => {
            socket.join(roomId);
            console.log(`🔵 Socket ${socket.id} joined room ${roomId}`);
        });

    });

    return io;
};

module.exports.emitAnnouncement = function (class_id, data) {
    if (io) {
        io.to(`class_${class_id}`).emit("new_announcement", data);
    }
};
module.exports.emitUpdateAnnouncement = function (class_id, data) {
    if (io) {
        io.to(`class_${class_id}`).emit('announcement_updated', data);
    }
};
module.exports.emitDeleteAnnouncement = function (class_id, id) {
    if (io) {
        io.to(`class_${class_id}`).emit('announcement_deleted', {id});
    }
};

module.exports.emitNotification = function (class_id, data) {
    if (io) {
        io.to(`class_${class_id}`).emit("new_notification", data);
    }
}; 