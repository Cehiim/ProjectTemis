import React, { useState } from 'react';
import BemVindo from './BemVindo.js';
import LangflowClient from './LangflowClient.js';
import './Chat.css'
import '@chatscope/chat-ui-kit-styles/dist/default/styles.min.css';
import { MainContainer, ChatContainer, MessageList, Message, MessageInput, TypingIndicator } from '@chatscope/chat-ui-kit-react';

const API_KEY = "chave";

function Chat() {
    const [typing, setTyping] = useState(false);
    const [isVisible, setIsVisible] = useState(true);
    const [messages, setMessages] = useState([]) //Lista de mensagens vazia
    const [isInputDisabled, setIsInputDisabled] = useState(false);

    const stripHtml = (html) => {
        const tempDiv = document.createElement('div');
        tempDiv.innerHTML = html;
        return tempDiv.textContent || tempDiv.innerText || '';
    };

    const handleSend = async (message) => {
        const cleanMessage = stripHtml(message);
        setIsInputDisabled(true); // Desativa o input após o envio
        setIsVisible(false);
        const newMessage = {
            message: cleanMessage,
            user: "user",
            direction: "outgoing",
        }

        const newMessages = [...messages, newMessage]; //Todas as mensagens antigas + a nova mensagem enviada
        setTyping(true);

        //Atualiza o status da mensagem
        setMessages(newMessages);

        //Processa a mensagem (envia e exibe a resposta)
        await getBotResponse(cleanMessage, newMessages);
    }

    async function getBotResponse(userMessage, chatMessages) {
        const flowIdOrName = 'id';
        const langflowId = 'id2';
        const inputValue = userMessage;
        const inputType = 'chat';
        const outputType = 'chat';
        const stream = false;
        const applicationToken = API_KEY;
        const langflowClient = new LangflowClient('https://api.langflow.astra.datastax.com',
            applicationToken);
        try{
            const tweaks = {
                "ChatInput-17Y07": {},
                "AstraVectorStoreComponent-Zo8EJ": {},
                "ParseData-i5f3r": {},
                "Prompt-HvopQ": {},
                "ChatOutput-mXK87": {},
                "SplitText-Sy3qT": {},
                "File-uyRG3": {},
                "AstraVectorStoreComponent-WZDCY": {},
                "File-mw66q": {},
                "File-AkkQC": {},
                "File-He07V": {},
                "AstraVectorize-h9QGT": {},
                "AstraVectorize-vpUfx": {},
                "Maritalk-k38zD": {}
            };
    
            const response = await langflowClient.runFlow(
                flowIdOrName,
                langflowId,
                inputValue,
                inputType,
                outputType,
                tweaks,
                stream,
                (data) => console.log("Received:", data.chunk), // onUpdate
                (message) => console.log("Stream Closed:", message), // onClose
                (error) => console.log("Stream Error:", error) // onError
            );

            if (!stream && response && response.outputs) {
                const answer = response.outputs[0].outputs[0].messages[0].message
                
                if (response) {
                    setMessages([...chatMessages, {
                        message: answer, // Adiciona o texto da mensagem de resposta
                        direction: "incoming",
                    }]);
                } else {
                    console.error("Mensagem de saída não encontrada.");
                }
            }
            setTyping(false);
            
        }
        catch (error) {
            //console.error('Main Error', error.message);
            setMessages(
                [...userMessage, {
                    message: error.message, //Coloca onde estiver o conteúdo
                    direction: "incoming",
                }]
            )
        }
        setIsInputDisabled(false); // Reativa o input após a resposta do bot
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
    // Colocar <BemVindo isVisible={isVisible}/> em algum lugar quando puder
    return (
        <div style = {containerStyle}>
            <MainContainer style={ChatStyle}>
                <ChatContainer>
                    <MessageList
                    scrollBehavior= "smooth"
                    typingIndicator = {typing ? <TypingIndicator content= "Escrevendo mensagem..." /> : null}>
                        {messages.map((message, i) => {
                            return <Message key = {i} model = {message}/>
                        })}
                    </MessageList>
                    <MessageInput placeholder='Escreva uma mensagem...' onSend={handleSend} disabled={isInputDisabled}/>
                </ChatContainer>
            </MainContainer>
        </div>
    );
}

export default Chat;