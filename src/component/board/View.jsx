import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import UseAxios from '../../hooks/useAxios';
import { useAuth } from '../../hooks/AuthContext';

const View = () => {
  const {loading, error, req} = UseAxios();
  const param = useParams();
  const num = param.num;
  const navigate = useNavigate();
  const {email} = useAuth();
  const [note, setNote] = useState({});
  const [myLike, setMyLike] = useState({});

  useEffect(() => {
    (async () => {
      const resp = await req('get', `notes/${num}`)
      console.log(resp);
      setNote(resp);

      const qs = new URLSearchParams({email, num}).toString();
      const resp2 = await req('get', `likes?${qs}`);
      setMyLike(resp2);
    })();
  }, [num, req, email]);

  if(error) {
    return <div><h1>에러가 발생했습니다</h1></div>;
  }

  if(loading) {
    return <div><h1>로딩 중 . . . </h1></div>
  }

  // 삭제 처리
  const handleDelete = e => {
    e.preventDefault();
    console.log("삭제");
    if(!window.confirm("삭제하시겠습니까?")) {
      return;
    }
    req('delete', `notes/${num}`);
    navigate('/notes');
  }

  // 좋아요 토글
  const handleLikesToggle = async(e) => {
    e.preventDefault();
    const ret = await req('post', `likes/${num}`, {email, num});
    setMyLike(!myLike);
    setNote({...note, likesCnt:note.likesCnt + (ret.result ? -1 : + 1)});
  }

  return note && (
    <div>
      <h1>View</h1>
      <p>{num}번 게시글</p>
      <p>제목 : </p>
      <p style={{color:"white"}}>{note.title}</p>
      <p>내용 : </p>
      <p style={{color:"white"}}>{note.content}</p>
      <p>작성자 : </p>
      <p style={{color:"white"}}>{note.memberEmail}</p>
      <p>작성일 : </p>
      <p style={{color:"white"}}>{note.regDate}</p>
      <p style={{color:"white"}}><button onClick={handleLikesToggle}>좋아요 <span style={{color:"red"}}>{myLike ? '♥' : '♡'}</span> {note.likesCnt}</button></p>

      <div>
        <h3>첨부파일 : {note.attachDtos && note.attachDtos.length}개</h3>
        <ul>
          {note.attachDtos && note.attachDtos.map(a => <li key={a.uuid}><Link to={a.url}>{a.origin}</Link></li>)}
        </ul>
      </div>

      <Link to={"/notes"}>목록</Link>
      <Link to={`/notes/modify/${num}`}>수정</Link>
      <button onClick={handleDelete}>삭제</button>
    </div>
  );
}

export default View;
