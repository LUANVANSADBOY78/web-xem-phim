import React from 'react';
import './footer.scss';
import bg from '../../assets/footer-bg.jpg';
import logo from '../../assets/tmovie.png';
import { Link } from 'react-router-dom';

const Footer = () => {
    return (
        <div className="footer" style={{ backgroundImage: `url(${bg})` }}>
            <div className="footer__content container">
                <div className="footer_content_logo">
                    <div className="logo">
                        <img src={logo} alt="" />
                        <Link to="/">XemPhim</Link>
                    </div>
                </div>
                <div className="footer__content__menus">
                    <div className="footer__content__menu">
                        <Link to="/">Trang chủ</Link>
                        <Link to="/">Liên hệ</Link>
                        <Link to="/">Điều khoản dịch vụ</Link>
                        <Link to="/">Về chúng tôi</Link>
                    </div>
                    <div className="footer__content__menu">
                        <Link to="/">Trực tiếp</Link>
                        <Link to="/">Hỏi đáp</Link>
                        <Link to="/">Gói cao cấp</Link>
                        <Link to="/">Chính sách bảo mật</Link>
                    </div>
                    <div className="footer__content__menu">
                        <Link to="/">Phim đáng xem</Link>
                        <Link to="/">Mới phát hành</Link>
                        <Link to="/">Top IMDB</Link>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Footer;
