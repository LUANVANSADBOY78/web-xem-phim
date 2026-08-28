import React, { useState, useEffect } from 'react';
import './comments.scss';

const Comments = ({ movieId }) => {
    const [comments, setComments] = useState([]);
    const [name, setName] = useState('');
    const [content, setContent] = useState('');

    // Load comments từ localStorage khi component mount
    useEffect(() => {
        const savedComments = localStorage.getItem(`movie_comments_${movieId}`);
        if (savedComments) {
            setComments(JSON.parse(savedComments));
        } else {
            // Mồi vài bình luận ảo nếu chưa có
            const mockComments = [
                { id: 1, name: 'Nguyễn Văn A', content: 'Phim hay quá ad ơi!', date: new Date().toLocaleDateString() },
                { id: 2, name: 'Trần Thị B', content: 'Cập nhật thêm server mới đi ad, thỉnh thoảng hơi lag.', date: new Date().toLocaleDateString() }
            ];
            setComments(mockComments);
            localStorage.setItem(`movie_comments_${movieId}`, JSON.stringify(mockComments));
        }
    }, [movieId]);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!name.trim() || !content.trim()) return;

        const newComment = {
            id: Date.now(),
            name: name.trim(),
            content: content.trim(),
            date: new Date().toLocaleDateString()
        };

        const updatedComments = [newComment, ...comments];
        setComments(updatedComments);
        localStorage.setItem(`movie_comments_${movieId}`, JSON.stringify(updatedComments));
        
        // Reset form
        setContent('');
    };

    return (
        <div className="comments-section">
            <div className="section__header">
                <h2>Bình luận & Đánh giá</h2>
            </div>
            
            <form className="comment-form" onSubmit={handleSubmit}>
                <input 
                    type="text" 
                    placeholder="Tên của bạn" 
                    value={name} 
                    onChange={(e) => setName(e.target.value)} 
                    required 
                />
                <textarea 
                    placeholder="Nhập bình luận của bạn về bộ phim này..." 
                    value={content} 
                    onChange={(e) => setContent(e.target.value)} 
                    rows="4"
                    required
                ></textarea>
                <button type="submit" className="btn-submit">Gửi Bình Luận</button>
            </form>

            <div className="comments-list">
                {comments.map(c => (
                    <div key={c.id} className="comment-item">
                        <div className="comment-avatar">
                            {c.name.charAt(0).toUpperCase()}
                        </div>
                        <div className="comment-body">
                            <div className="comment-header">
                                <span className="comment-name">{c.name}</span>
                                <span className="comment-date">{c.date}</span>
                            </div>
                            <p className="comment-content">{c.content}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Comments;
