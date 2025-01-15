import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import UseAxios from '../../hooks/useAxios';
import { useAuth } from '../../hooks/AuthContext';

const Write = () => {
  // const [title, setTitle] = useState('');
  // const [content, setContent] = useState('');
  // const [memberEmail, setMemberEmail] = useState('');
  const {email, token} = useAuth();
  const [board, setBoard] = useState({title: '', content: '', memberEmail: email});
  const navigate = useNavigate();
  const {req} = UseAxios();

  // email을 확실히 set하기 위해서 하는 작업
  useEffect(() => {
    setBoard(prev => ({...prev, writerEmail:email}));
  }, [email]);

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

    // 빈 값에 대한 추가 처리 필요
    req('post', 'notes', board);

    alert("글을 작성했습니다");
    navigate("/notes");
  }

  const handleFileUpload = async (e) => {
    const file = e.target.files[0];

    if(!file) {
      return;
    }

    const formData = new FormData();
    formData.append("file", file);
  
    try {
      const headers = {
        'Authorization':`Bearer ${token}`,
      }
      const response = await fetch("http://localhost:8080/api/v1/file/upload", {
        method: "POST",
        body: formData,
        headers
      });
  
      const result = await response.json();
      if (result.status === "success") {
        console.log("File uploaded successfully:", result.data);
      } else {
        console.error("Upload failed:", result.message);
      }
    } catch (error) {
      console.error("Error during upload:", error);
    }

  };

  return (
    <div>
      <h1>Write</h1>
      <form onSubmit={handleSubmit}>
        <label>제목 : <input type='text' name='title' id='title' value={board.title || ''} onChange={handleChange} /></label>
        <br />
        <label>내용 : <textarea rows='5' name='content' id='content' value={board.content || ''} onChange={handleChange} /></label>
        <br />
        <label>작성자 : <input type='text' name='memberEmail' id='memberEmail' value={board.memberEmail} onChange={handleChange} readOnly /></label>
        <br />
        <input type='file' onChange={handleFileUpload} name='file' />
        <br />
        <button>등록</button>
        <Link to={"/notes"}>목록</Link>
      </form>
    </div>
  );
}

export default Write;
