import React, { useState } from 'react';
import LangflowClient from './LangflowClient';
import './Chat.css'
import '@chatscope/chat-ui-kit-styles/dist/default/styles.min.css';
import { MainContainer, ChatContainer, MessageList, Message, MessageInput, TypingIndicator } from '@chatscope/chat-ui-kit-react';

//const API_KEY = "coloca a API do Langflow";

function Chat() {
    const [typing, setTyping] = useState(false);

    const [messages, setMessages] = useState([
        {
            message: "Olá! Testando...",
            user: "SamsAI",
            direction: "ingoing",
        }
    ])

    const handleSend = async (message) => {
        const newMessage = {
            message: message,
            user: "user",
            direction: "outgoing",
        }

        const newMessages = [...messages, newMessage]; //Todas as mensagens antigas + a nova mensagem enviada

        //Atualiza o status da mensagem
        setMessages(newMessages);

        //Indicador de que a IA está respondendo
        setTyping(true);

        //Processa a mensagem (envia e exibe a resposta)
        await processMessageToSamsAI(newMessages);
    }

    async function processMessageToSamsAI(chatMessages){
        //chatMessages { sender: "user" or "SamsAI", message: "Message Content..."}
        //apiMessages { role: "user" or "assistant", content: "Message Content..."}

        let apiMessages = chatMessages.map((messageObject) => {
            let role = "";
            if(messageObject.sender === "SamsAI") {
                role = "assistant"
            }
            else
            {
                role = "user"
            }
            return { role: role, content: messageObject.message }
        });

        const systemMessage = {
            role: "system",
            content: "Fale comigo como se eu fosse um advogado" //Usar para os filtros
        }

        const apiRequestBody = {
            "model": "gpt-3.5-turbo",
            "messages": [
                systemMessage,
                ...apiMessages],
        }

        await fetch("https://api.langflow.astra.datastax.com", {method: "POST", 
            headers: {
                "Authorization": "Bearer " + API_KEY,
                "Content-Type": "application/json"
            },
            body: JSON.stringify(apiRequestBody)
        }).then((data) => {
            return data.json();
        }).then((data) => {
            console.log(data)
            console.log(data.choices) //E assim vai até achar o conteúdo
            setMessages(
                [...chatMessages, {
                    message: data.choices, //Coloca onde estiver o conteúdo
                    sender: "SamsAI",
                }]
            )
            setTyping(false);
        });
    }

    const containerStyle = {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center', // Centraliza verticalmente também
        height: '80vh',
        width: '100vw',
    };

    const ChatStyle={
        height: '80vh',
        width: '80vw',
        overflow: 'hidden',
        bottom: '30px',
        border: 'none',
        backgroundColor: 'transparent',
    }


    //Precisa fixar o Input e estilizá-lo
    return (
        <div style = {containerStyle}>
            <MainContainer style={ChatStyle}>
                <ChatContainer> 
                    <MessageList
                    scrollBehavior= "smooth"
                    TypingIndicator = {typing ? <TypingIndicator content= "SamsAI está digitando..."/> : null}>
                        {messages.map((message, i) => {
                            return <Message key = {i} model = {message}/>
                        })}
                    </MessageList>
                    <MessageInput placeholder='Escreva uma mensagem...' onSend={handleSend}/>
                </ChatContainer>
            </MainContainer>
        </div>
    );
}

export default Chat;