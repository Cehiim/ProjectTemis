import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Login from './Login';
import BemVindo from './BemVindo.js';
import menu_hamburguer from './assets/Menu.png'
import profile_photo from './assets/Profile_Photo.png'
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(
    <body>
        <div class="topo">
            <img src={menu_hamburguer}/>
            <h1>SamsAI</h1> 
            <img src={profile_photo}/>
        </div>
        <BemVindo/>
    </body>,
    document.getElementById('root'));
registerServiceWorker();
