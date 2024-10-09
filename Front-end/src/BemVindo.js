import './index.css';
import registerServiceWorker from './registerServiceWorker';

function BemVindo({ isVisible }) {

  return (
    <div>
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
