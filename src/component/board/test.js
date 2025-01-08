const title = '제목';
const content = '내용';
const memberEmail = '작성자';
const obj = {title: '1234', content: 'abcd'};
obj.title = title;
obj['memberEmail'] = memberEmail;
console.log(obj);

const e = {};
e.target = {};
e.target.id = 'title';
e.target.value = '작성한 제목';

console.log(e);

const {id, value} = e.target;
console.log(id, value);

// obj[id] = value;
obj = {...obj, [id] : value};
console.log(obj);

// const name = e.target.id; // title
// const value = e.target.value; // 작성한 제목