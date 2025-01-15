import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import UseAxios from '../../hooks/useAxios';

const List = () => {
  const {data, loading, error, req} = UseAxios();

  const navigate = useNavigate();

  // effect
  useEffect(() => {
    req('get', 'notes/listall');

    // unmount 시 할 일
    return () => {
      
    };
  }, [req]);
  
  if(error) {
    return <div><h1>에러가 발생했습니다</h1></div>;
  }

  if(loading) {
    return <div><h1>로딩 중 . . . </h1></div>
  }

  return (
    <div>
      <h1>List</h1>
      <button onClick={() => navigate('/write')}>글쓰기</button>
      <Link to={"/dashboard"}>메인 화면</Link>
      <ul>
        {data && data.map(b => <li key={b.num}><Link to={`/notes/${b.num}`}>{b.title}</Link></li>)}
      </ul>
    </div>
  );
}

export default List;
