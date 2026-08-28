import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import bg from '../../assets/footer-bg.jpg';
import Button from '../../components/button/Button';
import './login.scss';

const Login = () => {
    const history = useHistory();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = (e) => {
        e.preventDefault();
        // Mock Auth Logic
        if (email && password) {
            alert('Đăng nhập thành công!');
            history.push('/');
        } else {
            alert('Vui lòng nhập đầy đủ thông tin!');
        }
    };

    return (
        <div className="auth-page" style={{ backgroundImage: `url(${bg})` }}>
            <div className="auth-page__overlay"></div>
            <div className="auth-page__form-container">
                <h2>Đăng Nhập</h2>
                <form onSubmit={handleLogin}>
                    <div className="form-group">
                        <label>Email</label>
                        <input 
                            type="email" 
                            placeholder="Nhập email của bạn" 
                            value={email}
                            onChange={e => setEmail(e.target.value)}
                        />
                    </div>
                    <div className="form-group">
                        <label>Mật khẩu</label>
                        <input 
                            type="password" 
                            placeholder="Nhập mật khẩu" 
                            value={password}
                            onChange={e => setPassword(e.target.value)}
                        />
                    </div>
                    <Button type="submit" className="w-100 mb-2">Đăng Nhập</Button>
                </form>
                <div className="auth-page__redirect">
                    Chưa có tài khoản? <Link to="/register">Đăng ký ngay</Link>
                </div>
            </div>
        </div>
    );
}

export default Login;
