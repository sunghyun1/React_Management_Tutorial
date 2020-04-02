import React from 'react';
import './App.css';
import Customer from './components/Customer';

const customers = [
{
  'id': 1,
  'image': 'http://placeimg.com/64/64/1',
  'name': '최성현',
  'birthday': '930928',
  'gender': '남자',
  'job': '대학생'
},
{
  'id': 2,
  'image': 'http://placeimg.com/64/64/2',
  'name': '홍길동',
  'birthday': '931028',
  'gender': '남자',
  'job': '프로그래머'
},
{
  'id': 3,
  'image': 'http://placeimg.com/64/64/3',
  'name': '나동빈',
  'birthday': '931128',
  'gender': '여자',
  'job': '디자이너'
}
]

function App() {
  return (
    <div>
      { customers.map( c => { return ( <Customer key = {c.id} id = {c.id} image = {c.image} name = {c.name} birthday = {c.birthday} gender = {c.gender} job = {c.job} />) }) }
    </div> 
  );
}

export default App;
