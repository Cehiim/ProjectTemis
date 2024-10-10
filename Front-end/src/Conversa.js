import React, { useState } from 'react';
import BemVindo from './BemVindo.js';
import Input from './Input.js'
import menu_hamburguer from './assets/Menu.png'
import profile_photo from './assets/Profile_Photo.png'
import Chat from './Chat'; 

function Conversa(){
    const TopoStyle = {
        display: 'flex',
        alignItems: 'center',
        paddingTop: '20px',
        marginLeft: '20px',
        marginBottom: '30px',
    }

    const TitleStyle={
        fontWeight: '600',
        fontSize: '50px',
        marginLeft: '5vh',
        marginRight: '70vw',
    }

    const InputStyle={
        position: 'fixed', /* Posiciona o elemento em relação à janela de visualização */
        left: '10vh',
        bottom: '30px',
        display: 'flex',
        justifyContent: 'center',
    }

        // Define um estado para controlar se o texto está visível ou não
        const [isVisible, setIsVisible] = useState(true);

        // Função para alternar a visibilidade do texto
        const toggleText = () => {
          setIsVisible(false); // Inverte o valor de isVisible
        };

    return(
        <body>
        <div style = {TopoStyle}>
            <img src={menu_hamburguer}/>
            <h1 style = {TitleStyle}>SamsAI</h1> 
            <img src={profile_photo}/>
        </div>
        
        <BemVindo isVisible={isVisible}/>
        <Chat/>
        <div style = {InputStyle}>
            <Input onToggleText={toggleText}/>
        </div>

    </body>
    );
}
export default Conversa;