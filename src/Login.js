import React, { Component } from 'react';
import './Login.css';

class Login extends Component { //Componente de tela de Login, conforme protótipo no figma, porém não-funcional
  render() { // A estilização está sendo feita em Login.css
    return (
      <div className="TelaLogin">
          <h1 className = "title">SamsAI</h1>

          <div className= "box">
            <h1>Bem vindo de volta!</h1>

            <div className= "Entradas">
              <div className= "Email">
                <h3>Email de login:</h3>
                  <input name= "email"></input>
              </div>
              <div className= "Senha">
                <h3>Senha:</h3>
                <input name="senha"/>
              </div>

            </div>

            <div className= "semSenha">
              <a className= "cadastro"><p>Cadastre-se aqui</p></a>
              <a className= "esqueci"><p>Esqueci minha senha</p></a>
            </div>
            
            <button>Login</button>

          </div>

      </div>
    );
  }
}

export default Login;
