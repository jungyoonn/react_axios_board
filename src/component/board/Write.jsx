import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import UseAxios from '../../hooks/useAxios';

const Write = () => {
  // const [title, setTitle] = useState('');
  // const [content, setContent] = useState('');
  // const [memberEmail, setMemberEmail] = useState('');
  const [board, setBoard] = useState({title: '', content: '', memberEmail: 'user89@a.com'});
  const navigate = useNavigate();
  const {req} = UseAxios();

  const handleChange = (e) => {
    // switch(e.target.id) {
    //   case "title" :
    //     setTitle(e.target.value);
    //     break;
    //   case "content" :
    //     setContent(e.target.value);
    //     break;
    //   case "memberEmail" :
    //     setMemberEmail(e.target.value);
    //     break;
    //   default:
    // }
    
    const {name, value} = e.target;
    setBoard({...board, [name] : value});
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    // console.log({title, content, memberEmail});
    console.log(board);

    req('post', 'write', board);

    alert("글을 작성했습니다");
    navigate("/");
  }

  return (
    <div>
      <h1>Write</h1>
      <form onSubmit={handleSubmit}>
        <label>제목 : <input type='text' name='title' id='title' value={board.title} onChange={handleChange} /></label>
        <br />
        <label>내용 : <textarea rows='5' name='content' id='content' value={board.content} onChange={handleChange} /></label>
        <br />
        <label>작성자 : <input type='text' name='memberEmail' id='memberEmail' value={board.memberEmail} onChange={handleChange} /></label>
        <button>등록</button>
      </form>
    </div>
  );
}

export default Write;
