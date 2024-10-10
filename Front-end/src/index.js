import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Conversa from './Conversa';
import Chat from './Chat'; 
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(
    <Conversa/>,
    document.getElementById('root'));
registerServiceWorker();

//Substituir depois Chat por Conversa