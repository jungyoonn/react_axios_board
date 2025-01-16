import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../hooks/AuthContext';

const Dashboard = () => {
  const {email, token, logout} = useAuth();

  // const [email, setEmail] = useState(localStorage.getItem('email'));
  // const [token, setToken] = useState(localStorage.getItem('token'));
  // const navigate = useNavigate();

  // const handleLogout = (e) => {
  //   // setItem, getItem, removeItem
  //   if(email) {
  //     setEmail(localStorage.removeItem('email'));
  //     setToken(localStorage.removeItem('token'));
  //   } else {
  //     navigate('/');
  //   }
  // }

  return (
    <div>
      <h1>시작 페이지</h1>
      <p>{email || 'guest'}</p>
      <p>{token}</p>
      {email ? <> <button onClick={logout}>로그아웃</button><Link to={"/notes"}>글 목록</Link></> : <Link to={"/"}>로그인</Link>}
      {/* {email && <Link to={'/list'}>글 목록</Link>} */}
    </div>
  );
}

export default Dashboard;
