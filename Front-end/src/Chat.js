import React, { useState } from 'react';
import LangflowClient from './LangflowClient';

function Chat() {
    const [userInput, setUserInput] = useState('');
    const [messages, setMessages] = useState([]);

    const applicationToken = 'AstraCS:gPMthwSCPXlJgTescaMBPySM:1ec7f2f52fe7b9c35b3f8495a2a29d84604f96373138fd76f09a175222b99cd7';
    const langflowClient = new LangflowClient('https://api.langflow.astra.datastax.com', applicationToken);

    const handleSend = async () => {
        const trimmedInput = userInput.trim();
        if (trimmedInput) {
            addMessage(trimmedInput, 'user');
            setUserInput('');

            try {
                const botResponse = await getBotResponse(trimmedInput);
                addMessage(botResponse, 'bot');
            } catch (error) {
                addMessage("[Erro]", 'bot');
            }
        }
    };

    const addMessage = (content, sender) => {
        setMessages(prevMessages => [...prevMessages, { content, sender }]);
    };

    const getBotResponse = async (userMessage) => {
        const flowIdOrName = '68344e2d-b57a-4992-b172-214aca3fcaa1';
        const langflowId = 'efde00ae-4d32-4471-8e8d-26482560f5a9';
        const inputType = 'chat';
        const outputType = 'chat';
        const stream = false; // Defina como false se você não precisar de streaming

        const tweaks = {}; // Ajuste os tweaks conforme necessário

        const response = await langflowClient.runFlow(
            flowIdOrName,
            langflowId,
            userMessage,
            inputType,
            outputType,
            tweaks,
            stream
        );

        if (response && response.outputs) {
            const flowOutputs = response.outputs[0];
            const firstComponentOutputs = flowOutputs.outputs[0];
            return firstComponentOutputs.outputs.message.text;
        }
    };

    return (
        <div>
            <div id="chat-box" style={{ maxHeight: '400px', overflowY: 'auto' }}>
                {messages.map((msg, index) => (
                    <div key={index} className={msg.sender}>
                        {msg.content}
                    </div>
                ))}
            </div>
            <input
                type="text"
                value={userInput}
                onChange={(e) => setUserInput(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSend()}
            />
            <button onClick={handleSend}>Enviar</button>
        </div>
    );
}

export default Chat;