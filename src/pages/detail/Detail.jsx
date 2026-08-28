import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';

import tmdbApi from '../../api/tmdbApi';
import apiConfig from '../../api/apiConfig';

import './detail.scss';
import CastList from './CastList';
import VideoList from './VideoList';

import MovieList from '../../components/movie-list/MovieList';
import ReviewSection from '../../components/review/ReviewSection';
import Button from '../../components/button/Button';

const Detail = () => {
    const { category, id } = useParams();
    const [item, setItem] = useState(null);

    useEffect(() => {
        const getDetail = async() => {
            const response = await tmdbApi.detail(category, id, { params: {} });
            setItem(response);
            window.scrollTo(0, 0);
            
            // Thêm vào lịch sử xem
            if (response) {
                const { addHistory } = await import('../../utils/localStorage');
                addHistory({
                    ...response,
                    category: category // lưu lại category để chuyển hướng đúng
                });
            }
        };
        getDetail();
    }, [category, id]);

    return ( <
        > {
            item && ( <
                >
                <
                div className = "banner"
                style = {
                    {
                        backgroundImage: `url(${apiConfig.originalImage(item.backdrop_path || item.poster_path)})`,
                    }
                } >
                < /div>

                <
                div className = "mb-3 movie-content container" >
                <
                div className = "movie-content__poster" >
                <
                div className = "movie-content__poster__img"
                style = {
                    {
                        backgroundImage: `url(${apiConfig.originalImage(item.poster_path || item.backdrop_path)})`,
                    }
                } >
                < /div> <
                /div>

                <
                div className = "movie-content__info" >
                <
                h1 className = "title" > { item.title || item.name } < /h1>

                <
                div className = "genres" > {
                    item.genres &&
                    item.genres.slice(0, 5).map((genre, i) => ( <
                        span key = { i }
                        className = "genres__item" > { genre.name } <
                        /span>
                    ))
                } <
                /div>

                <
                p className = "overview" > { item.overview } < /p>

                <div className="watch-btn">
                    <Button 
                        onClick={() => window.location.href = `/${category}/${item.id}/watch`}
                    >
                        XEM PHIM
                    </Button>
                </div>

                <
                div className = "cast" >
                <
                div className = "section__header" >
                <
                h2 > Diễn viên < /h2> <
                /div> <
                CastList id = { item.id }
                /> <
                /div> <
                /div> <
                /div>

                <
                div className = "container" >
                <
                div className = "section mb-3" >
                <
                VideoList id = { item.id }
                /> <
                /div>

                <
                div className = "section mb-3" >
                <
                div className = "section__header mb-2" >
                <
                h2 > Phim tương tự < /h2> <
                /div> <
                MovieList category = { category }
                type = "similar"
                id = { item.id }
                /> <
                /div>

                <
                div className = "section mb-5" >
                <
                ReviewSection movieId = { item.id }
                /> <
                /div> <
                /div> <
                />
            )
        } <
        />
    );
};

export default Detail;