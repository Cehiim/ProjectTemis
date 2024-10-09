import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Conversa from './Conversa';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(
    <Conversa/>,
    document.getElementById('root'));
registerServiceWorker();
