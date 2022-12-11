const express = require("express");
const app = express();
const http = require("http");
const cors = require("cors");
const { Server } = require("socket.io");

app.use(cors());

const server = http.createServer(app);

server.listen(3001, () => {
    console.log("Server RUNNING");
});

// connect the socket.io server with the http server that we created 
const io = new Server(server, {
    cors: {
        origin: "http://localhost:3000",
        method: ["GET", "POST"]
    },
});

const firstPair = { username: "", room: "" };
let usersAndRooms = []; // all connected users
usersAndRooms.push(firstPair);

const addUser = ({ username, room }) => {
    username = username.trim().toLowerCase();
    room = room.trim().toLowerCase();

    const user = {
        username: username,
        room: room
    };

    if (!username || !room) {
        return {
            status: "KO",
            error: "Username and room are required."
        }
    }

    const existingUser = usersAndRooms.find((pair) => pair.room === room && pair.username === username);
    if (existingUser) {
        return {
            status: "KO",
            error: "Username already taken for this room."
        };
    }
    usersAndRooms.push(user);

    console.log(usersAndRooms);
    return { status: "OK", error: "" };


}


// listening for an event with this id/name
io.on("connection", (socket) => {
    socket.removeAllListeners();
    console.log(`User connected: ${socket.id}`);

    socket.on("join_room", ({ username, room }, callback) => {
        const { status, error } = addUser({ username, room });
        if (status !== "KO") {
            socket.join(room);
            console.log(`User with ID: ${socket.id} joined room: ${room}`);

            const data = {
                room: room,
                author: "admin",
                message: `${username} has joined!`
            }
            socket.to(room).emit('receive_message', data);
        }

        return callback({ status: status, error: error });
    })

    socket.on("send_message", (data) => {
        console.log(data);
        // send the message to the other user
        socket.to(data.room).emit("receive_message", data);
    });

    socket.on("disconnect", (data) => {
        console.log("User disconnected", socket.id);
    });

    socket.on("leave", (data) => {
        usersAndRooms.splice(usersAndRooms.findIndex(v => (v.username === data.username) && (v.room === data.room)), 1);

        console.log(usersAndRooms);
        console.log("User disconnected", socket.id);

        const leaveMessage = {
            room: data.room,
            author: "admin",
            message: `${data.username} has left the room!`
        }
        socket.to(data.room).emit('receive_message', leaveMessage);
    })
})


