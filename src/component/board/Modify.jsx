import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import UseAxios from '../../hooks/useAxios';

const Modify = () => {
  // const {email} = useAuth();
  const [board, setBoard] = useState({title: '', content: '', memberEmail: '', attachDtos: []});
  const [uploaded, setUploaded] = useState([]);
  const navigate = useNavigate();
  const {req} = UseAxios();
  const param = useParams();
  const num = param.num;

  // email을 확실히 set하기 위해서 하는 작업
  useEffect(() => {
    (async () => {
      const resp = await req('get', `notes/${num}`);
      setBoard(resp);
      setUploaded(resp.attachDtos);
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
    req('put', `notes/${num}`, {...board, attachDtos: uploaded});

    alert("수정했습니다");
    navigate("/notes");
  }

  
  const handleFileUpload = async (e) => {
    const files = e.target.files;

    if(!files) {
      return;
    }

    const formData = new FormData();
    for(let i = 0; i < files.length; i++) {
      formData.append("file", files[i]);
    }
  
    try {
      const result = await req('post', 'file/upload', formData, {'Content-Type':'multipart/form-data'});
      console.log(result);
      setUploaded([...uploaded, ...result]); 
    } catch (error) {
      console.error("Error during upload:", error);
    }

    e.target.value = '';
  };

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

        <br />
        <p>파일 추가 첨부 : </p>
        <input type='file' onChange={handleFileUpload} name='file' multiple />
        <br />

        <ul>
          {uploaded.map(u => <li key={u.uuid}><Link to={u.url}>{u.origin}</Link><button data-uuid={u.uuid} onClick={e => setUploaded(uploaded.filter(file => file.uuid !== e.currentTarget.dataset.uuid))}>삭제</button></li>)}
        </ul>
        <hr />
        <div>
          <h3>첨부파일 : {board.attachDtos.length}개</h3>
          <ul>
            {board.attachDtos.map(a => <li key={a.uuid}><Link to={a.url}>{a.origin}</Link></li>)}
          </ul>
        </div>

        <button>등록</button>
        <Link to={"/notes"}>목록</Link>
      </form>
    </div>
  );
}

export default Modify;

