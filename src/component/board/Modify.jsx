import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import UseAxios from '../../hooks/useAxios';
import { useAuth } from '../../hooks/AuthContext';

const Modify = () => {
  const {email} = useAuth();
  const [board, setBoard] = useState({title: '', content: '', memberEmail: email});
  const navigate = useNavigate();
  const {req} = UseAxios();
  const param = useParams();
  const num = param.num;

  // email을 확실히 set하기 위해서 하는 작업
  useEffect(() => {
    (async () => {
      const resp = await req('get', `notes/${num}`);
      setBoard(resp);
    })();
  }, [req, num]);

  const handleChange = (e) => {
    const {name, value} = e.target;
    setBoard({...board, [name] : value});
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(board);

    // 빈 값에 대한 추가 처리 필요
    req('put', `notes/${num}`, board);

    alert("수정했습니다");
    navigate("/notes");
  }

  return (
    <div>
      <h1>Modify</h1>
      <form onSubmit={handleSubmit}>
        <input type='hidden' value={num} />
        <label>제목 : <input type='text' name='title' id='title' value={board.title} onChange={handleChange} /></label>
        <br />
        <label>내용 : <textarea rows='5' name='content' id='content' value={board.content} onChange={handleChange} /></label>
        <br />
        <label>작성자 : <input type='text' name='memberEmail' id='memberEmail' value={board.memberEmail} onChange={handleChange} readOnly /></label>
        <button>등록</button>
        <Link to={"/notes"}>목록</Link>
      </form>
    </div>
  );
}

export default Modify;

