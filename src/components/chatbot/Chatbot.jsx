import React, { useState, useEffect, useRef } from 'react';
import './chatbot.scss';

const Chatbot = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState([
        { type: 'bot', text: 'Xin chào! Tôi là trợ lý ảo của web. Tôi có thể giúp gì cho bạn?' }
    ]);
    const [inputValue, setInputValue] = useState('');
    const messagesEndRef = useRef(null);

    const toggleChat = () => setIsOpen(!isOpen);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages, isOpen]);

    const handleSendMessage = (e) => {
        e.preventDefault();
        if (!inputValue.trim()) return;

        const userMsg = inputValue.trim();
        setMessages(prev => [...prev, { type: 'user', text: userMsg }]);
        setInputValue('');

        // Tự động trả lời sau 1 giây
        setTimeout(() => {
            let botReply = 'Xin lỗi, tôi chưa hiểu ý bạn lắm. Bạn có thể nói rõ hơn không?';
            const lowerMsg = userMsg.toLowerCase();

            if (lowerMsg.includes('chào') || lowerMsg.includes('hi') || lowerMsg.includes('hello')) {
                botReply = 'Chào bạn! Chúc bạn xem phim vui vẻ nhé.';
            } else if (lowerMsg.includes('phim gì hay') || lowerMsg.includes('phim mới')) {
                botReply = 'Bạn có thể xem phần "Phim Đang Chiếu Rạp" hoặc "Phim Bộ Mới Cập Nhật" ở trang chủ nhé!';
            } else if (lowerMsg.includes('lỗi') || lowerMsg.includes('không xem được') || lowerMsg.includes('chặn')) {
                botReply = 'Nếu phim bị lỗi hoặc bị diệt virus chặn, bạn hãy chọn Đổi Máy Chủ (Server 2, 3) hoặc bấm "Visit anyway" trên bảng cảnh báo nhé!';
            } else if (lowerMsg.includes('cảm ơn') || lowerMsg.includes('tks') || lowerMsg.includes('thank')) {
                botReply = 'Không có chi! Cần hỗ trợ gì thêm cứ nhắn mình nhé.';
            }

            setMessages(prev => [...prev, { type: 'bot', text: botReply }]);
        }, 1000);
    };

    return (
        <div className="chatbot-wrapper">
            <button className={`chatbot-toggle ${isOpen ? 'open' : ''}`} onClick={toggleChat}>
                {isOpen ? <i className='bx bx-x'></i> : <i className='bx bx-message-rounded-dots'></i>}
            </button>

            <div className={`chatbot-window ${isOpen ? 'active' : ''}`}>
                <div className="chatbot-header">
                    <div className="header-info">
                        <i className='bx bx-bot'></i>
                        <span>Trợ lý Ảo (Online)</span>
                    </div>
                    <button className="close-btn" onClick={toggleChat}>
                        <i className='bx bx-minus'></i>
                    </button>
                </div>
                
                <div className="chatbot-messages">
                    {messages.map((msg, idx) => (
                        <div key={idx} className={`message ${msg.type}`}>
                            <div className="message-content">{msg.text}</div>
                        </div>
                    ))}
                    <div ref={messagesEndRef} />
                </div>

                <form className="chatbot-input" onSubmit={handleSendMessage}>
                    <input 
                        type="text" 
                        placeholder="Nhập câu hỏi của bạn..." 
                        value={inputValue}
                        onChange={(e) => setInputValue(e.target.value)}
                    />
                    <button type="submit">
                        <i className='bx bx-send'></i>
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Chatbot;
