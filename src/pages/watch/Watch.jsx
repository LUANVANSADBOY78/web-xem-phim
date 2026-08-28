import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import tmdbApi, { category as cate } from '../../api/tmdbApi';
import apiConfig from '../../api/apiConfig';
import './watch.scss';
import PageHeader from '../../components/page-header/PageHeader';
import MovieList from '../../components/movie-list/MovieList';
import Comments from '../../components/comments/Comments';

const Watch = () => {
    const { category, id } = useParams();
    const [item, setItem] = useState(null);
    const [currentSeason, setCurrentSeason] = useState(1);
    const [currentEpisode, setCurrentEpisode] = useState(1);
    const [currentServer, setCurrentServer] = useState('server1');
    const [cast, setCast] = useState([]);

    useEffect(() => {
        const getDetail = async () => {
            const response = await tmdbApi.detail(category, id, { params: {} });
            setItem(response);
            window.scrollTo(0, 0);
            
            if (category === cate.tv && response.seasons) {
                const validSeason = response.seasons.find(s => s.season_number > 0);
                if (validSeason) {
                    setCurrentSeason(validSeason.season_number);
                }
            }

            const creds = await tmdbApi.credits(category, id);
            setCast(creds.cast.slice(0, 5));
        };
        getDetail();
    }, [category, id]);

    // Danh sách nguồn phát phim
    const getEmbedUrl = () => {
        if (category === cate.movie) {
            switch (currentServer) {
                case 'server1': return `https://vidsrc.me/embed/movie?tmdb=${id}`;
                case 'server2': return `https://vidsrc.in/embed/movie?tmdb=${id}`;
                case 'server3': return `https://embed.su/embed/movie/${id}`;
                default: return `https://vidsrc.me/embed/movie?tmdb=${id}`;
            }
        } else {
            switch (currentServer) {
                case 'server1': return `https://vidsrc.me/embed/tv?tmdb=${id}&season=${currentSeason}&episode=${currentEpisode}`;
                case 'server2': return `https://vidsrc.in/embed/tv?tmdb=${id}&season=${currentSeason}&episode=${currentEpisode}`;
                case 'server3': return `https://embed.su/embed/tv/${id}/${currentSeason}/${currentEpisode}`;
                default: return `https://vidsrc.me/embed/tv?tmdb=${id}&season=${currentSeason}&episode=${currentEpisode}`;
            }
        }
    };

    const embedUrl = getEmbedUrl();
    const currentSeasonData = item?.seasons?.find(s => s.season_number === currentSeason);
    const movieTitle = item ? (item.title || item.name) : '';
    const bg = item ? apiConfig.originalImage(item.backdrop_path || item.poster_path) : '';

    return (
        <>
            <PageHeader>
                {movieTitle || 'Đang tải...'}
            </PageHeader>
            <div className="container">
                <div className="watch-layout">
                    {/* Phần Video Player và Servers */}
                    <div className="watch-main">
                        <div className="watch-notice">
                            <p>💡 Đang xem: <strong>{movieTitle}</strong> {category === cate.tv ? `- Mùa ${currentSeason} Tập ${currentEpisode}` : ''}</p>
                            <p className="small-note">Nếu phim bị lỗi hoặc giật lag, vui lòng chọn máy chủ khác (Server 2, Server 3).</p>
                        </div>

                        <div className="video-player" key={embedUrl}>
                            <iframe 
                                src={embedUrl}
                                title="Video Player"
                                width="100%"
                                height="100%"
                                frameBorder="0"
                                allowFullScreen
                                allow="autoplay; encrypted-media; fullscreen"
                            ></iframe>
                        </div>

                        <div className="servers-container">
                            <div className="server-label">
                                <i className="bx bx-server"></i> Đổi Máy Chủ:
                            </div>
                            <div className="servers-list">
                                <button 
                                    className={`btn-server ${currentServer === 'server1' ? 'active' : ''}`}
                                    onClick={() => setCurrentServer('server1')}
                                >
                                    VIP (Nhanh)
                                </button>
                                <button 
                                    className={`btn-server ${currentServer === 'server2' ? 'active' : ''}`}
                                    onClick={() => setCurrentServer('server2')}
                                >
                                    Dự Phòng 1
                                </button>
                                <button 
                                    className={`btn-server ${currentServer === 'server3' ? 'active' : ''}`}
                                    onClick={() => setCurrentServer('server3')}
                                >
                                    Dự Phòng 2
                                </button>
                            </div>
                        </div>

                        {/* Danh sách tập phim (Nếu là TV Show) */}
                        {category === cate.tv && item && item.seasons && (
                            <div className="episodes-container">
                                <div className="seasons-wrapper">
                                    <span className="label">Chọn Mùa:</span>
                                    <div className="seasons-list">
                                        {item.seasons.filter(s => s.season_number > 0).map((season, i) => (
                                            <button 
                                                key={i} 
                                                className={`btn-season ${currentSeason === season.season_number ? 'active' : ''}`}
                                                onClick={() => {
                                                    setCurrentSeason(season.season_number);
                                                    setCurrentEpisode(1);
                                                }}
                                            >
                                                Mùa {season.season_number}
                                            </button>
                                        ))}
                                    </div>
                                </div>

                                {currentSeasonData && currentSeasonData.episode_count > 0 && (
                                    <div className="episodes-wrapper">
                                        <span className="label">Danh Sách Tập:</span>
                                        <div className="episodes-list">
                                            {Array.from({ length: currentSeasonData.episode_count }, (_, i) => i + 1).map(ep => (
                                                <button 
                                                    key={ep}
                                                    className={`btn-episode ${currentEpisode === ep ? 'active' : ''}`}
                                                    onClick={() => setCurrentEpisode(ep)}
                                                >
                                                    {ep}
                                                </button>
                                            ))}
                                        </div>
                                    </div>
                                )}
                            </div>
                        )}

                        {/* Thông tin phim */}
                        {item && (
                            <div className="movie-info-container">
                                <h1 className="title">{item.title || item.name}</h1>
                                <div className="genres">
                                    {item.genres && item.genres.slice(0, 5).map((genre, i) => (
                                        <span key={i} className="genre-item">{genre.name}</span>
                                    ))}
                                </div>
                                <p className="overview">{item.overview}</p>
                                
                                <div className="cast">
                                    <div className="section__header">
                                        <h2>Diễn viên</h2>
                                    </div>
                                    <div className="cast-list">
                                        {cast.map((item, i) => (
                                            <div key={i} className="cast-item">
                                                <div className="cast-item__img" style={{backgroundImage: `url(${apiConfig.w500Image(item.profile_path)})`}}></div>
                                                <p className="cast-item__name">{item.name}</p>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* Phần Bình luận */}
                        <Comments movieId={id} />
                    </div>

                    {/* Phần Phim Đề Cử (Sidebar) */}
                    <div className="watch-sidebar">
                        <div className="section__header mb-2">
                            <h2>Có thể bạn sẽ thích</h2>
                        </div>
                        <MovieList category={category} type="similar" id={item?.id} />
                    </div>
                </div>
            </div>
        </>
    );
};

export default Watch;
