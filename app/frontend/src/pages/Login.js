import React, { useState, useEffect, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import HeaderContext from '../context/HeaderContext';
import { axiosLoginWithAuthorization } from '../services/fetchs';

function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isDisabled, setIsDisabled] = useState(true);

  const { setShowHeader } = useContext(HeaderContext);

  useEffect(() => {
    // estado para controlar a exibição do header
    setShowHeader(false);
  }, [setShowHeader]);

  useEffect(() => {    
    const validationLogin = () => {
      const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
      const limit = 3;  
      setIsDisabled(!(regex.test(email) && password.length > limit));
    }
    validationLogin();
  }, [email, password]);

  const handleLogin = async () => {
    try {
      const response = await axiosLoginWithAuthorization(email, password); 
      if (Number(response) === 200) {
        localStorage.setItem('adminBooks', JSON.stringify(`${email}${password}`))
        navigate('/home');
      } else {
        toast.error('Credenciais inválidas');
      }
    } catch (error) {
      console.error('Erro ao efetuar login:', error.message);
    }    
  };
  
  return (
    <main>
      <ToastContainer
        limit={1}
      />
      <form>
      <h1>Login</h1>
        <fieldset>
          <label htmlFor="email-input">
            <input
              className="input"
              id='email-input'
              type="email"
              name="email"
              placeholder="email"
              value={ email }
              onChange={ (e) => setEmail(e.target.value)}
            />
          </label>
        </fieldset>
        <fieldset>
          <label htmlFor="password-input">
            <input
              id='password-input'
              type="password"
              name="password"
              placeholder="password"
              value={ password.toString()}
              onChange={ (e) => setPassword(e.target.value)}
            />
          </label>
        </fieldset>
        <fieldset>
          <Link
            className="link"
            to="/signin"
          >
            Sign in
          </Link>
        </fieldset>
        <button
        className="btn"
        type="button"
        disabled={ isDisabled }
        onClick={ handleLogin }
        >
          Login
        </button>
      </form>
    </main>
  )
}

export default Login;
