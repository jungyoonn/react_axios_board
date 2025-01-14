import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
import UseAxios from '../../hooks/useAxios';
import { useAuth } from '../../hooks/AuthContext';

const LoginForm = () => {
  // state
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const {loading, error, req} = UseAxios('http://localhost:8080/api/');

  // const navigate = useNavigate();
  const {login} = useAuth();

  const handleSubmit = async e => {
    e.preventDefault();
    const member = {email, password};
    console.log(member);

    try {
      const resp = await req('get', `login?email=${email}`);
      console.log(resp);
      resp && login(email, resp);

      // 1. email
      // localStorage.setItem("email", email);
      // 2. token
      // localStorage.setItem("token", resp);
      // resp && navigate('/dashboard');

    } catch(error) {
      console.error("로그인 실패", error);
    }

  }

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor='email'>email : </label>
        <input type='text' id='email' name='email' value={email} onChange={e => setEmail(e.target.value)} />
        </div>
      <div>
        <label htmlFor='password'>password : </label>
        <input type='password' id='password' name='password' value={password} onChange={e => setPassword(e.target.value)} />
      </div>
      <div>
        <button disabled={loading}>{loading ? '로그인 중 . . . ' : '로그인'}</button>
        {/* <button>로그인</button> */}
        {error && <p style={{color:'red'}}>에러가 발생했습니다 <br />{error.message}</p>}
      </div>
    </form>
  );
}

export default LoginForm;
