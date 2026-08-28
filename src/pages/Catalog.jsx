import React from 'react';
import { useParams, useLocation } from 'react-router';
import PageHeader from '../components/page-header/PageHeader';
import {category as cate} from '../api/tmdbApi';
import MovieGrid from '../components/movie-grid/MovieGrid';

const Catalog = () => {

    const {category} = useParams();
    const location = useLocation();
    const query = new URLSearchParams(location.search);
    const type = query.get('type');

    let title = category === cate.movie ? 'Phim lẻ' : 'Phim bộ';
    if (type === 'theater') title = 'Phim chiếu rạp';
    if (type === 'animation') title = 'Phim hoạt hình';

    return (
        <>
            <PageHeader>
                {title}
            </PageHeader>
            <div className="container">
                <div className="section mb-3">
                    <MovieGrid category={category} type={type} />
                </div>
            </div>
        </>
    );
}

export default Catalog;
