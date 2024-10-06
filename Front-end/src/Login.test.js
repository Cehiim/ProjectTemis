import React, {StrictMode} from 'react';
import ReactDOM from 'react-dom';
import Login from './Login';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.createRoot(div).render(
    <StrictMode>
      <Login />
    </StrictMode>
  );
});
