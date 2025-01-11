import './index.css';

function BemVindo({ isVisible }) { 
  return ( //Componente BemVindo some após o usuário enviar sua primeira mensagem
    <div>
      {isVisible && <Text/>}
    </div>
  );
    
}
export default BemVindo;

function Text(){
    const BoasVindas = { //Estiliza texto de boas vindas
        color: '#CE5967',
        fontSize: '75px',
        fontWeight: '800',
        marginLeft: '30vh',
      };

    return(
        <div style = {BoasVindas}>
            <p style = {{ color: '#CE5967' }}>Olá, Lorem Ipsum</p>
            <p style = {{ color: '#CE5967' }}>Como posso ajudar?</p>
        </div>
    );
}
