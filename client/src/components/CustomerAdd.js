import React from 'react';
import { post } from 'axios';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
    hidden: {
        display: 'none'
    }
});

class CustomerAdd extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            file: null, //byte 형태의 데이터
            userName: '',
            birthday: '',
            gender: '',
            job: '',
            fileName: '', //보내고자 하는 파일의 이름
            open: false // 현재 다이얼로그 창이 열려있는지 확인하는 변수
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
            fileName: '',
            open: false
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

    handleClickOpen = () => {
        this.setState({
            open: true
        })
    }

    handleClose = () => {
        this.setState({
            file: null,
            username: '',
            birthday: '',
            gender: '',
            job: '',
            fileName: '',
            open: false
        })  
    }

    render() {
        const {classess} = this.props;
        return (
            <div>
                <Button variant="contained" color="primary" onClick={this.handleClickOpen}>
                    고객 추가하기
                </Button>
                <Dialog open={this.state.open} onClose = {this.state.handleClose}>
                    <DialogTitle>고객 추가</DialogTitle>
                    <DialogContent>
                        <input className = {classes.hidden} accept="image/*" id="raised-button-file" type="file" file={this.state.file} value={this.state.fileName} onChange={this.handleFileChange}/><br/>
                        <label htmlFor="raised-button-file">
                            <Button variant="contained" color="primary" component="span" name="file">
                                {this.state.fileName === "" ? "프로필 이미지 선택" : this.state.fileName}
                            </Button>
                        </label>
                        <br/>
                        <TextField label= "이름" type= "text" name="userName" value={this.state.userName} onChange= {this.handleValueChange}/><br/>
                        <TextField label= "생년월일" type= "text" name="birthday" value={this.state.birthday} onChange= {this.handleValueChange}/><br/>
                        <TextField label= "성별" type= "text" name="gender" value={this.state.gender} onChange= {this.handleValueChange}/><br/>
                        <TextField label= "직업" type= "text" name="job" value={this.state.job} onChange= {this.handleValueChange}/><br/>
                    </DialogContent>
                    <DialogActions>
                        <Button variant="contained" color="primary" onClick={this.handleFormSubmit}>추가</Button>
                        <Button variant="outliend" color="primary" onClick={this.handleClose}>닫기</Button>
                    </DialogActions>
                </Dialog>
            </div>
        )
    }
}


export default withSytles(styles)(CustomerAdd);