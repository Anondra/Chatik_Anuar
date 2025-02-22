export default class ChatBot {
    constructor(chatBoxId, chatContentId) {
        this.chatBox = document.getElementById(chatBoxId);
        this.chatContent = document.getElementById(chatContentId);
        this.chatFlow = this.getChatFlow();
        
    }
    getChatFlow() {
        return {
            start: {
                message: "Привет! Выберите один из вопросов:",
                options: [
                    { text: "Как сделать заказ?", next: "order" },
                    { text: "Какие у вас услуги?", next: "services" },
                    { text: "Как связаться с поддержкой?", next: "contact" },
                    { text: "Есть ли у вас гарантия?", next: "warranty" }
                ]
            },
            order: {
                message: "Чтобы сделать заказ, выберите товар и оформите через корзину.",
                options: [
                    { text: "Как оплатить?", next: "payment" },
                    { text: "Как отследить заказ?", next: "tracking" },
                    { text: "Связаться с оператором", next: "operator" }
                ]
            },
            services: {
                message: "Мы предоставляем доставку, гарантию и поддержку!",
                options: [
                    { text: "Подробнее о доставке", next: "delivery" },
                    { text: "Подробнее о поддержке", next: "support" },
                    { text: "Связаться с оператором", next: "operator" }
                ]
            },
            contact: { message: "Связаться с поддержкой можно по email: support@example.com", options: [] },
            warranty: { message: "Гарантия на товары – 12 месяцев!", options: [] },
            payment: { message: "Мы принимаем карты, PayPal и другие способы оплаты.", options: [] },
            tracking: { message: "Ваш заказ можно отследить в личном кабинете.", options: [] },
            delivery: { message: "Доставка занимает 3-5 рабочих дней.", options: [] },
            support: { message: "Наша поддержка работает 24/7!", options: [] },
            operator: {
                message: "Вы можете связаться с оператором следующим образом:",
                options: [
                    { text: "Написать в чат", action: "openChat" },
                    { text: "Связаться в WhatsApp", action: "openWhatsApp" },
                    { text: "Связаться в Telegram", action: "openTelegram" }
                ]
            }
        };
    }

    toggleChat() {
        this.chatBox.style.display = this.chatBox.style.display === 'block' ? 'none' : 'block';
        if (this.chatContent.innerHTML === '') this.startChat();
    }

    startChat() {
        this.chatContent.innerHTML = '';
        this.addMessage(this.chatFlow.start);
    }

    addMessage(node) {
        const botMsg = document.createElement('div');
        botMsg.className = 'chat-message bot-message';
        botMsg.innerText = node.message;
        this.chatContent.appendChild(botMsg);

        if (node.options.length > 0) {
            const optionsDiv = document.createElement('div');
            optionsDiv.className = 'chat-options';
            node.options.forEach(option => {
                const btn = document.createElement('button');
                btn.innerText = option.text;
                btn.onclick = () => option.action ? this.handleAction(option.action) : this.selectOption(option.next, option.text);
                optionsDiv.appendChild(btn);
            });
            this.chatContent.appendChild(optionsDiv);
        }
        chatBox.scrollTop = chatBox.scrollHeight;
    }

    selectOption(nextNode, selectedText) {
        const userMsg = document.createElement('div');
        userMsg.className = 'chat-message user-message';
        userMsg.innerText = selectedText;
        this.chatContent.appendChild(userMsg);
        
        if (this.chatFlow[nextNode]) this.addMessage(this.chatFlow[nextNode]);
    }

    handleAction(action) {
        if (action === "openChat") {
            alert("Чат с оператором скоро будет доступен!");
        } else if (action === "openWhatsApp") {
            window.open("https://wa.me/1234567890", "_blank");
        } else if (action === "openTelegram") {
            window.open("https://t.me/your_support", "_blank");
        }
    }
}
