import express from 'express'
import cors from 'cors'
import { Server } from 'socket.io'
import http from 'http'

const app = express();
const server = http.createServer(app);


const allowedOrigins = [
  "http://localhost:5173",               // local dev
  "https://chat-app-frontend-eight-rouge.vercel.app"     // deployed frontend 
];


const io = new Server(server, {
  cors: {
    origin: [
      "http://localhost:5173",
      "https://chat-app-frontend-eight-rouge.vercel.app"
    ],
    methods: ["GET", "POST"],
    credentials: true
  }
});
app.get("/", (req, res) => {
  res.send("Socket.IO Server is Live");
});

app.use(cors({
  origin: [
    "http://localhost:5173",
    "https://chat-app-frontend-eight-rouge.vercel.app"
  ],
  credentials: true
}));

io.on("connection",(socket)=>{console.log(socket.id)

    socket.on("join_room",(data)=>{
        socket.join(data);
        console.log(`User ID :- ${socket.id} joined room : ${data}`)
    })

    socket.on("send_message",(data)=>{console.log("send message data ",data)
    socket.to(data.room).emit("receive_message",data)
})

    socket.on("disconnect",()=>{
        console.log("User Disconnected..",socket.id)
    })
});






server.listen(1000,()=>console.log("Server is running on port 1000"));