import React, { useState, useEffect } from 'react';

import './movie-card.scss';

import Button from '../button/Button';
import {category} from '../../api/tmdbApi';
import apiConfig from '../../api/apiConfig';
import { Link } from 'react-router-dom';
import { toggleBookmark, isBookmarked } from '../../utils/localStorage';

const MovieCard = props => {

    const item = props.item;
    const cat = props.category || item.category || 'movie';
    const link = '/' + category[cat] + '/' + item.id;
    const bg = apiConfig.w500Image(item.poster_path || item.backdrop_path);
    
    const [bookmarked, setBookmarked] = useState(false);

    useEffect(() => {
        setBookmarked(isBookmarked(item.id));
    }, [item.id]);

    const handleBookmark = (e) => {
        e.preventDefault();
        const newState = toggleBookmark({
            ...item,
            category: cat
        });
        setBookmarked(newState);
    };

    return (
        <Link to={link}>
            <div className="movie-card" style={{backgroundImage: `url(${bg})`}}>
                <div className="movie-card__bookmark" onClick={handleBookmark}>
                    <i className={bookmarked ? "bx bxs-bookmark" : "bx bx-bookmark"}></i>
                </div>
                <Button>
                    <i className="bx bx-play"></i>
                </Button>
            </div>
            <h3>{item.title || item.name}</h3>
        </Link>
    )
}

export default MovieCard;
