import React from 'react';
import { Link } from 'react-router-dom';
import { OutlineButton } from '../components/button/Button';
import HeroSlide from '../components/hero-slide/HeroSlide';
import MovieList from '../components/movie-list/MovieList';
import { category, movieType, tvType } from '../api/tmdbApi';

export default function Home() {
    return (
        <div>
            <HeroSlide />
            <div className="section mb-3">
                <div className="section__header mb-2">
                    <h2>Phim nổi bật</h2>
                    <Link to="/movie">
                        <OutlineButton>
                            Xem thêm
                        </OutlineButton>
                    </Link>
                </div>
                <MovieList category={category.movie} type={movieType.popular} />
            </div>

            <div className="section mb-3">
                <div className="section__header mb-2">
                    <h2>Phim Top Điểm cao</h2>
                    <Link to="/movie">
                        <OutlineButton>
                            Xem thêm
                        </OutlineButton>
                    </Link>
                </div>
                <MovieList category={category.movie} type={movieType.top_rated} />
            </div>

            <div className="section mb-3">
                <div className="section__header mb-2">
                    <h2>Phim Đang Chiếu Rạp</h2>
                    <Link to="/movie">
                        <OutlineButton>Xem thêm</OutlineButton>
                    </Link>
                </div>
                <MovieList category={category.movie} type={movieType.now_playing} />
            </div>

            <div className="section mb-3">
                <div className="section__header mb-2">
                    <h2>Phim Bộ Mới Cập Nhật</h2>
                    <Link to="/tv">
                        <OutlineButton>Xem thêm</OutlineButton>
                    </Link>
                </div>
                <MovieList category={category.tv} type={tvType.on_the_air}/>
            </div>

            <div className="section mb-3">
                <div className="section__header mb-2">
                    <h2>Phim Truyền hình nổi bật</h2>
                    <Link to="/tv">
                        <OutlineButton>Xem thêm</OutlineButton>
                    </Link>
                </div>
                <MovieList category={category.tv} type={tvType.popular}/>
            </div>

            <div className="section mb-3">
                <div className="section__header mb-2">
                    <h2>Phim Truyền hình điểm cao</h2>
                    <Link to="/tv">
                        <OutlineButton>Xem thêm</OutlineButton>
                    </Link>
                </div>
                <MovieList category={category.tv} type={tvType.top_rated}/>
            </div>

            <div className="section mb-3">
                <div className="section__header mb-2">
                    <h2>Phim Sắp Chiếu</h2>
                    <Link to="/movie">
                        <OutlineButton>Xem thêm</OutlineButton>
                    </Link>
                </div>
                <MovieList category={category.movie} type={movieType.upcoming} />
            </div>
        </div>
    );
}
