import React, { useState } from 'react';
import styled from 'styled-components';
import './index.css';
import registerServiceWorker from './registerServiceWorker';

function BemVindo() {
    // Define um estado para controlar se o texto está visível ou não
    const [isVisible, setIsVisible] = useState(true);

  // Função para alternar a visibilidade do texto
  const toggleText = () => {
    setIsVisible(!isVisible); // Inverte o valor de isVisible
  };

  return (
    <div>
      <button onClick={toggleText}>
        {isVisible ? 'Esconder texto' : 'Mostrar texto'}
      </button>
      {isVisible && <Text/>}
    </div>
  );
    
}
export default BemVindo;

function Text(){
    const BoasVindas = {
        color: '#CE5967',
        fontSize: '75px',
        fontWeight: '800',
        marginLeft: '30vh'

      };

    return(
        <div style = {BoasVindas}>
            <p style = {{ color: '#CE5967' }}>Olá, Lorem Ipsum</p>
            <p style = {{ color: '#CE5967' }}>Como posso ajudar?</p>
        </div>
    );
}

registerServiceWorker();
