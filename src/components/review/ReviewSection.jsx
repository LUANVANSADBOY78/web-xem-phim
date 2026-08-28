import React, { useState, useEffect, useCallback } from 'react';

import './review.scss';

const ReviewSection = ({ movieId }) => {
    const storageKey = `reviews_${movieId}`;

    const loadReviews = useCallback(() => {
        try {
            const stored = localStorage.getItem(storageKey);
            return stored ? JSON.parse(stored) : [];
        } catch {
            return [];
        }
    }, [storageKey]);

    const [reviews, setReviews] = useState(loadReviews);
    const [rating, setRating] = useState(0);
    const [username, setUsername] = useState('');
    const [comment, setComment] = useState('');
    const [hoverRating, setHoverRating] = useState(0);

    useEffect(() => {
        setReviews(loadReviews());
        setRating(0);
        setUsername('');
        setComment('');
    }, [movieId, loadReviews]);

    const averageRating =
        reviews.length > 0
            ? (reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length).toFixed(1)
            : 0;

    const formatDate = (dateStr) => {
        const date = new Date(dateStr);
        return date.toLocaleDateString('vi-VN', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!username.trim() || !comment.trim()) {
            alert('Vui lòng nhập tên hiển thị và bình luận!');
            return;
        }

        if (rating < 1) {
            alert('Vui lòng chọn đánh giá sao!');
            return;
        }

        const newReview = {
            id: Date.now(),
            username: username.trim(),
            rating,
            comment: comment.trim(),
            date: new Date().toISOString(),
        };

        const updatedReviews = [newReview, ...reviews];

        localStorage.setItem(storageKey, JSON.stringify(updatedReviews));
        setReviews(updatedReviews);

        setRating(0);
        setUsername('');
        setComment('');

        alert('Đánh giá của bạn đã được gửi!');
    };

    const renderStars = (count) => {
        return Array.from({ length: 5 }, (_, i) => (
            <span key={i} className="star filled">
                {i < count ? '★' : '☆'}
            </span>
        ));
    };

    return (
        <div className="review-section">
            <div className="review-section__header">
                <h2>Đánh giá từ người xem</h2>
                {reviews.length > 0 && (
                    <div className="review-section__average">
                        Đánh giá trung bình: {averageRating}/5 ★ ({reviews.length} lượt)
                    </div>
                )}
            </div>

            <form className="review-section__form" onSubmit={handleSubmit}>
                <div className="review-section__form-group">
                    <label>Tên hiển thị</label>
                    <input
                        type="text"
                        placeholder="Nhập tên của bạn..."
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                </div>

                <div className="review-section__form-group">
                    <label>Đánh giá</label>
                    <div className="star-rating">
                        {Array.from({ length: 5 }, (_, i) => (
                            <span
                                key={i}
                                className={`star ${i < (hoverRating || rating) ? 'filled' : ''}`}
                                onClick={() => setRating(i + 1)}
                                onMouseEnter={() => setHoverRating(i + 1)}
                                onMouseLeave={() => setHoverRating(0)}
                            >
                                {i < (hoverRating || rating) ? '★' : '☆'}
                            </span>
                        ))}
                        {rating > 0 && <span className="star-rating__text">{rating}/5</span>}
                    </div>
                </div>

                <div className="review-section__form-group">
                    <label>Bình luận</label>
                    <textarea
                        rows="4"
                        placeholder="Chia sẻ cảm nhận của bạn về bộ phim..."
                        value={comment}
                        onChange={(e) => setComment(e.target.value)}
                    />
                </div>

                <button type="submit" className="review-section__submit">
                    Gửi đánh giá
                </button>
            </form>

            <div className="review-section__list">
                {reviews.length === 0 ? (
                    <p className="review-section__empty">
                        Chưa có đánh giá nào. Hãy là người đầu tiên!
                    </p>
                ) : (
                    reviews.map((review) => (
                        <div key={review.id} className="review-card">
                            <div className="review-card__header">
                                <span className="review-card__username">{review.username}</span>
                                <span className="review-card__date">
                                    {formatDate(review.date)}
                                </span>
                            </div>
                            <div className="review-card__stars">
                                {renderStars(review.rating)}
                            </div>
                            <p className="review-card__text">{review.comment}</p>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
};

export default ReviewSection;
