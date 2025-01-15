import React, { useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import UseAxios from '../../hooks/useAxios';

const View = () => {
  const {data, loading, error, req} = UseAxios();
  const param = useParams();
  const num = param.num;
  const navigate = useNavigate();

  useEffect(() => {
    (async () => {
      const resp = await req('get', `notes/${num}`)
      console.log(resp);
    })();
  }, [num, req]);

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

  return data && (
    <div>
      <h1>View</h1>
      <p>{num}번 게시글</p>
      <p>제목 : </p>
      <p style={{color:"white"}}>{data.title}</p>
      <p>내용 : </p>
      <p style={{color:"white"}}>{data.content}</p>
      <p>작성자 : </p>
      <p style={{color:"white"}}>{data.memberEmail}</p>
      <p>작성일 : </p>
      <p style={{color:"white"}}>{data.regDate}</p>

      <Link to={"/notes"}>목록</Link>
      <Link to={`/notes/modify/${num}`}>수정</Link>
      <button onClick={handleDelete}>삭제</button>
    </div>
  );
}

export default View;
