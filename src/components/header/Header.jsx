import React, { useRef, useEffect, useState } from 'react';
import { Link, useLocation, useHistory } from 'react-router-dom';
import './header.scss';

import logo from '../../assets/tmovie.png';

const headerNav = [
    { display: 'Trang chủ', path: '/' },
    { display: 'Phim chiếu rạp', path: '/movie?type=theater' },
    { display: 'Phim bộ', path: '/tv' },
    { display: 'Phim lẻ', path: '/movie' },
    { display: 'Hoạt hình', path: '/movie?type=animation' },
];

const Header = () => {
    const { pathname } = useLocation();
    const history = useHistory();
    const headerRef = useRef(null);
    const [keyword, setKeyword] = useState('');

    const active = headerNav.findIndex(e => e.path === pathname);

    useEffect(() => {
        const shrinkHeader = () => {
            if (document.body.scrollTop > 10 || document.documentElement.scrollTop > 10) {
                headerRef.current.classList.add('shrink');
            } else {
                headerRef.current.classList.remove('shrink');
            }
        }
        window.addEventListener('scroll', shrinkHeader);
        return () => {
            window.removeEventListener('scroll', shrinkHeader);
        };
    }, []);

    const goToSearch = (e) => {
        e.preventDefault();
        if (keyword.trim().length > 0) {
            history.push(`/movie/search/${keyword}`);
        }
    }

    return (
        <div ref={headerRef} className="header">
            <div className="header__top container">
                <div className="logo">
                    <img src={logo} alt="" style={{width: '30px', marginRight: '10px'}}/>
                    <Link to="/">Motchill</Link>
                </div>
                
                <div className="search-bar">
                    <form onSubmit={goToSearch}>
                        <input 
                            type="text" 
                            placeholder="Nhập tên phim bạn muốn tìm kiếm..." 
                            value={keyword}
                            onChange={(e) => setKeyword(e.target.value)}
                        />
                        <button type="submit" className="bx bx-search"></button>
                    </form>
                </div>

                <div className="user-actions">
                    <Link to="/login" className="action-item"><i className="bx bx-log-in"></i> Đăng nhập</Link>
                    <Link to="/register" className="action-item"><i className="bx bx-user-plus"></i> Đăng ký</Link>
                    <Link to="/history" className="action-item"><i className="bx bx-history"></i> Lịch sử</Link>
                    <Link to="/bookmarks" className="action-item"><i className="bx bx-bookmark"></i> Bookmark</Link>
                </div>
            </div>
            
            <div className="header__bottom">
                <ul className="header__nav container">
                    {
                        headerNav.map((e, i) => (
                            <li key={i} className={`${i === active ? 'active' : ''}`}>
                                <Link to={e.path}>
                                    {e.display}
                                </Link>
                            </li>
                        ))
                    }
                </ul>
            </div>
        </div>
    );
}

export default Header;