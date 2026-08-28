import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import bg from '../../assets/footer-bg.jpg';
import Button from '../../components/button/Button';
import './register.scss';

const Register = () => {
    const history = useHistory();
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const handleRegister = (e) => {
        e.preventDefault();
        // Mock Auth Logic
        if (name && email && password && confirmPassword) {
            if (password !== confirmPassword) {
                alert('Mật khẩu xác nhận không khớp!');
                return;
            }
            alert('Đăng ký thành công!');
            history.push('/login');
        } else {
            alert('Vui lòng nhập đầy đủ thông tin!');
        }
    };

    return (
        <div className="auth-page" style={{ backgroundImage: `url(${bg})` }}>
            <div className="auth-page__overlay"></div>
            <div className="auth-page__form-container">
                <h2>Đăng Ký</h2>
                <form onSubmit={handleRegister}>
                    <div className="form-group">
                        <label>Họ và tên</label>
                        <input 
                            type="text" 
                            placeholder="Nhập họ và tên" 
                            value={name}
                            onChange={e => setName(e.target.value)}
                        />
                    </div>
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
                    <div className="form-group">
                        <label>Xác nhận mật khẩu</label>
                        <input 
                            type="password" 
                            placeholder="Nhập lại mật khẩu" 
                            value={confirmPassword}
                            onChange={e => setConfirmPassword(e.target.value)}
                        />
                    </div>
                    <Button type="submit" className="w-100 mb-2">Đăng Ký</Button>
                </form>
                <div className="auth-page__redirect">
                    Đã có tài khoản? <Link to="/login">Đăng nhập</Link>
                </div>
            </div>
        </div>
    );
}

export default Register;
