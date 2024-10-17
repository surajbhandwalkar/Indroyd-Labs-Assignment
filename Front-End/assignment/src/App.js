import React, { useState, useEffect } from 'react';
import QRCode from 'qrcode.react';
import io from 'socket.io-client';

const CentralScreen = () => {

  
  const [question, setQuestion] = useState('');
  const [correctPlayer, setCorrectPlayer] = useState('');
  const socket = io('http://localhost:5000');

  useEffect(() => {
    socket.on('new-question', (data) => {
      setQuestion(data.question);
    });

    
    socket.on('correct-answer', (playerName) => {
      setCorrectPlayer(`Congratulations ${playerName}!`);
    });
  }, [socket]);

  return (


    <div>
      <h1>Quiz Game</h1>
      <h2>{question}</h2>
      {correctPlayer && <h3>{correctPlayer}</h3>}
      <QRCode value="http://localhost:5000/join" size={256} />
    </div>
  );
};

export default CentralScreen;
