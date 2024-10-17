const express = require('express');
const http = require('http');
const socketIo = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

let questions = [
  { question: "What is the capital of France?", answer: "Paris" },
  { question: "Who wrote 'Hamlet'?", answer: "Shakespeare" },
];

let currentQuestionIndex = 0;

io.on('connection', (socket) => {
    
  socket.emit('new-question', questions[currentQuestionIndex]);

  socket.on('submit-answer', (data) => {
    const { playerName, answer } = data;
    if (answer === questions[currentQuestionIndex].answer) {
      io.emit('correct-answer', playerName);
      currentQuestionIndex++; 
    } else {


      socket.emit('wrong-answer', 'Incorrect, please try again!');
    }
  });
});

server.listen(5000, () => {
  console.log('Server running on port 5000');
});
