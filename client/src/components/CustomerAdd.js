import React from 'react';
import { post } from 'axios';
import { response } from 'express';

class CustomerAdd extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            file: null, //byte 형태의 데이터
            userName: '',
            birthday: '',
            gender: '',
            job: '',
            fileName: '' //보내고자 하는 파일의 이름
        }
    }

    handleFormSubmit = (e) => {
        e.preventDefault()
        this.addCustomer()
            .then((response) => {
                console.log(response.data);
                this.props.stateRefresh(); //간단한 테스트를 위해서 reload 함수를 수행해서 페이지를 바로 새로고침한 후, 고객 데이터를
                                  //바로 받아온다.
            })
        this.setState({
            file: null,
            username: '',
            birthday: '',
            gender: '',
            job: '',
            fileName: ''
        })  
    }

    handleFileChange = (e) => {
        this.setState({
            file: e.target.files[0], //여러 개의 파일 중에서 한 개의 파일만 업로드할 수 있다.
            fileName: e.target.value
        })
    }

    handleValueChange = (e) => {
        let nextState = {};
        nextState[e.target.name] = e.target.value;
        this.setState(nextState);
    }

    // 모듈이자 함수, api주소로 데이터를 보낼 수 있도록 한다.
    addCustomer = () => {
        const url = 'api/customers';
        const formData = new FormData();
        formData.append('image', this.state.file);
        formData.append('name', this.state.userName);
        formData.append('birthday', this.state.birthday);
        formData.append('gender', this.state.gender);
        formData.append('job', this.state.job);
        //파일이 포함되어 있는 데이터를 서버로 전송하고자 할 때 웹 표준에 맞는 헤더를 추가해야한다.
        const config = {
            headers: {
                'content-type': 'multipart/form-data' //전달하고자 하는 데이터에 파일이 포함되어 있을 때 설정
            }
        }
        return post(url, formData, config);
    }

    render() {
        return (
            <form onSubmit= {this.handleFormSubmit}> 
                <h1>고객 추가</h1>
                프로필 이미지: <input type="file" name="file" file={this.state.file} value={this.state.fileName} onChange={this.handleFileChange}/><br/>
                이름: <input type= "text" name="userName" value={this.state.userName} onChange= {this.handleValueChange}/><br/>
                생년월일: <input type= "text" name="birthday" value={this.state.birthday} onChange= {this.handleValueChange}/><br/>
                성별: <input type= "text" name="gender" value={this.state.gender} onChange= {this.handleValueChange}/><br/>
                직업: <input type= "text" name="job" value={this.state.job} onChange= {this.handleValueChange}/><br/>
                <button type="submit">추가하기</button>
            </form>
        )
    }
}


export default CustomerAdd;