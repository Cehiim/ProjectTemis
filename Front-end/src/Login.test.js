import React, {StrictMode} from 'react';
import ReactDOM from 'react-dom/client';
import Login from './Login';
import {render, screen} from '@testing-library/react';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.createRoot(div).render(
    <StrictMode>
      <Login />
    </StrictMode>
  );
});

test('verifica se há a fase "email de login:"', () => {
  render(<Login />)
  const input = screen.getByText('Email de login:')

});

test('verifica se há a fase "Senha:"', () => {
  render(<Login />)
  const input = screen.getByText('Senha:')

});

test('verifica se há botão de login', () => {
  render(<Login />)
  const input = screen.getByRole('button')

});

test('verifica se há botão para cadastrar-se', () => {
  render(<Login />)
  const input = screen.getByText('Cadastre-se aqui')
});

test('verifica se há botão para em caso o usuário tenha esquecido a senha', () => {
  render(<Login />)
  const input = screen.getByText('Esqueci minha senha')
});