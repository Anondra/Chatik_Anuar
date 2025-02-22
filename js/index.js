import ChatBot from './chat.js';

const chatBot = new ChatBot('chatBox', 'chatContent');

document.getElementById('toggleChat').addEventListener('click', () => chatBot.toggleChat());
