import React, { useState, useEffect, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import HeaderContext from '../context/HeaderContext';
import { axiosCreateUser } from '../services/fetchs';

function SignIn() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
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
      setIsDisabled(!(regex.test(email) && (password.length > limit) && (username !== "")));
    }
    validationLogin();
  }, [username, email, password]);

  const handleLogin = async () => {
    try {
      const response = await axiosCreateUser(username, email, password);
      if (String(response) === "OK") {
        // Autenticação bem-sucedida, redirecionar para /home
        toast.success('Usuário criado!');
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
      <ToastContainer />
      <form>
        <h1>Sign In</h1>
        <fieldset>
          <label htmlFor="username-input">
            <input
              className="input"
              id='username-input'
              type="username"
              placeholder="username"
              value={ username }
              onChange={ (e) => setUsername(e.target.value)}
            />
          </label>
        </fieldset>
        <fieldset>
        <label htmlFor="email-input">
          <input
            className="input"
            id='email-input'
            type="email"
            placeholder="email"
            value={ email }
            onChange={ (e) => setEmail(e.target.value)}
          />
        </label>
        </fieldset>
        <fieldset>
        <label htmlFor="password-input">
          <input
            className="input"
            id='password-input'
            type="password"
            placeholder="password"
            value={ password.toString()}
            onChange={ (e) => setPassword(e.target.value)}
          />
        </label>
        </fieldset>
        <fieldset>
          <button
            className="btn"
            type="button"
            disabled={ isDisabled }
            onClick={ handleLogin }
          >
            Login
          </button>
        </fieldset>
        <Link
          className="link"
          to="/">
          Login
        </Link>
      </form>
    </main>
  )
}

export default SignIn;
