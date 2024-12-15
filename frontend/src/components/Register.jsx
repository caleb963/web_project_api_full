import React, {useState} from 'react';
import '../blocks/register.css';
import {useNavigate}  from 'react-router-dom';

function Register({ onRegister}) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        onRegister(email, password);
    };

    const navigate = useNavigate();

    return (
        <form className="register" onSubmit={handleSubmit}>
            <h2 className='register__title'>Register</h2>
            <input
            className="register__input"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
            />
            <input
            className="register__input"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
            />
            <button className="register__button" type="submit">Register</button>
            <a className="register__link" onClick={() => {
               navigate('/signin');
            }}><p className="register__link-message">you're a member already? login here</p></a>
        </form>
    );
}

export default Register;