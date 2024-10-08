class LangflowClient {
    constructor(baseURL, applicationToken) {
        this.baseURL = baseURL;
        this.applicationToken = applicationToken;
    }
    async post(endpoint, body, headers = {"Content-Type": "application/json"}) {
        headers["Authorization"] = `Bearer ${this.applicationToken}`;
        headers["Content-Type"] = "application/json";
        const url = `${this.baseURL}${endpoint}`;
        try {
            const response = await fetch(url, {
                method: 'POST',
                headers: headers,
                body: JSON.stringify(body)
                //mode: 'no-cors'
            });

            const responseMessage = await response.json();
            if (!response.ok) {
                throw new Error(`${response.status} ${response.statusText} - ${JSON.stringify(responseMessage)}`);
            }
            return responseMessage;
        } catch (error) {
            console.error('Request Error:', error.message);
            throw error;
        }
    }

    async initiateSession(flowId, langflowId, inputValue, inputType = 'chat', outputType = 'chat', stream = false, tweaks = {}) {
        const endpoint = `/lf/${langflowId}/api/v1/run/${flowId}?stream=${stream}`;
        return this.post(endpoint, { input_value: inputValue, input_type: inputType, output_type: outputType, tweaks: tweaks });
    }

    handleStream(streamUrl, onUpdate, onClose, onError) {
        const eventSource = new EventSource(streamUrl);

        eventSource.onmessage = event => {
            const data = JSON.parse(event.data);
            onUpdate(data);
        };

        eventSource.onerror = event => {
            console.error('Stream Error:', event);
            onError(event);
            eventSource.close();
        };

        eventSource.addEventListener("close", () => {
            onClose('Stream closed');
            eventSource.close();
        });

        return eventSource;
    }

    async runFlow(flowIdOrName, langflowId, inputValue, inputType = 'chat', outputType = 'chat', tweaks = {}, stream = false, onUpdate, onClose, onError) {
        try {
            const initResponse = await this.initiateSession(flowIdOrName, langflowId, inputValue, inputType, outputType, stream, tweaks);
            console.log('Init Response:', initResponse);
            if (stream && initResponse && initResponse.outputs && initResponse.outputs[0].outputs[0].artifacts.stream_url) {
                const streamUrl = initResponse.outputs[0].outputs[0].artifacts.stream_url;
                console.log(`Streaming from: ${streamUrl}`);
                this.handleStream(streamUrl, onUpdate, onClose, onError);
            }
            return initResponse;
        } catch (error) {
            console.error('Error running flow:', error);
            onError('Error initiating session');
        }
    }
}

document.addEventListener('DOMContentLoaded', () => {
    const chatBox = document.getElementById('chat-box');
    const userInput = document.getElementById('user-input');
    const sendButton = document.getElementById('send-button');
    const chatHistory = document.getElementById('chat-history');
    const historyButton = document.getElementById('history-button');
    const historyClose = document.getElementById('history-close');
    const historyList = document.getElementById('history-list');

    // Array to store conversation history
    let history = [];

    function addMessage(content, sender) {
        const messageDiv = document.createElement('div');
        messageDiv.classList.add('message');
        messageDiv.classList.add(sender);
        messageDiv.textContent = content;
        chatBox.appendChild(messageDiv);
        chatBox.scrollTop = chatBox.scrollHeight;
    }

    function addToHistory(userMessage, botResponse) {
        // Add to history array
        history.push({ user: userMessage, bot: botResponse });
        // Update the history list
        const historyItem = document.createElement('div');
        historyItem.classList.add('history-item');
        historyItem.innerHTML = `<strong>You:</strong> ${userMessage}<br><strong>Bot:</strong> ${botResponse}`;
        historyList.appendChild(historyItem);
    }

    async function getBotResponse(userMessage) {
        const flowIdOrName = '68344e2d-b57a-4992-b172-214aca3fcaa1';
        const langflowId = 'efde00ae-4d32-4471-8e8d-26482560f5a9';
        const inputValue = userMessage;
        const inputType = 'chat';
        const outputType = 'chat';
        const stream = true;
        const applicationToken = 'AstraCS:gPMthwSCPXlJgTescaMBPySM:1ec7f2f52fe7b9c35b3f8495a2a29d84604f96373138fd76f09a175222b99cd7';
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
                const flowOutputs = response.outputs[0];
                const firstComponentOutputs = flowOutputs.outputs[0];
                const output = firstComponentOutputs.outputs.message;
                //console.log("Final Output:", output.message.text);
                return output.message.text;
            }
        }
        catch (error) {
            //console.error('Main Error', error.message);
            return error.message;
        }
    }

    async function handleSend() {
        const userMessage = userInput.value.trim();
        if (userMessage) {
            addMessage(userMessage, 'user');
            userInput.value = '';
            try{
                const botResponse = await getBotResponse(userMessage);
                addMessage(botResponse, 'bot');
                addToHistory(userMessage, botResponse);
            }
            catch (error) {
                addMessage("[Erro]", 'bot');
                addToHistory(userMessage, "[Erro]");
            }
        }
    }

    sendButton.addEventListener('click', handleSend);

    userInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            handleSend();
        }
    });

    historyButton.addEventListener('click', () => {
        if (chatHistory.style.display === 'none' || chatHistory.style.display === '') {
            chatHistory.style.display = 'block';
        } else {
            chatHistory.style.display = 'none';
        }
    });

    historyClose.addEventListener('click', () => {
        chatHistory.style.display = 'none';
    });

    // Initialize the chat history tab as hidden
    chatHistory.style.display = 'none';
});
