import React, { useState, useEffect } from 'react';
import { getHistory, getBookmarks } from '../../utils/localStorage';
import MovieCard from '../../components/movie-card/MovieCard';
import PageHeader from '../../components/page-header/PageHeader';
import './user-list.scss';

const UserList = (props) => {
    const isHistory = props.type === 'history';
    const [items, setItems] = useState([]);

    useEffect(() => {
        if (isHistory) {
            setItems(getHistory());
        } else {
            setItems(getBookmarks());
        }
    }, [isHistory]);

    return (
        <>
            <PageHeader>
                {isHistory ? 'Lịch Sử Xem Phim' : 'Phim Đã Lưu (Bookmark)'}
            </PageHeader>
            <div className="container">
                <div className="section mb-3">
                    <div className="user-list">
                        {items.length === 0 ? (
                            <div className="user-list__empty">
                                {isHistory ? 'Bạn chưa xem phim nào.' : 'Bạn chưa lưu phim nào.'}
                            </div>
                        ) : (
                            <div className="movie-grid">
                                {items.map((item, i) => (
                                    <MovieCard category={item.category || 'movie'} item={item} key={i}/>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </>
    );
};

export default UserList;
