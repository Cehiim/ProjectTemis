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

    function getBotResponse(userMessage) {
        // Simple predefined responses
        const responses = {
            'hello': 'Hi there! How can I assist you today?',
            'how are you?': 'I\'m just a bot, but I\'m here to help you!',
            'bye': 'Goodbye! Have a great day!',
        };
        return responses[userMessage.toLowerCase()] || 'I\'m not sure how to respond to that. Could you please clarify?';
    }

    function handleSend() {
        const userMessage = userInput.value.trim();
        if (userMessage) {
            addMessage(userMessage, 'user');
            userInput.value = '';

            const botResponse = getBotResponse(userMessage);
            addMessage(botResponse, 'bot');

            addToHistory(userMessage, botResponse);
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