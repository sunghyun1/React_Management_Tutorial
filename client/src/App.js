import React from 'react';
import './App.css';
import Customer from './components/Customer';
import CustomerAdd from './components/CustomerAdd';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import CircularProgress from '@material-ui/core/CircularProgress';
import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
  root: {
    width: '100%',
    marginTop: theme.spacing.unit * 3,
    overflowX: "auto"
  },
  table: {
    minwidth: 1080
  },
  progress: {
    margin: theme.spacing.unit * 2
  }
});


function App(props) {

  function constructor(props) {
    super(props);
    this.state = {
      customers: '',
      completed: 0
    }
  }

  stateRefresh = () => {
    this.setState( {
      customers: '',
      completed: 0
    });
    this.callApi()
      .then(res => this.setState({ customers: res }))
      .catch(err => console.log(err));
  }

  function componentDidMount() {
    this.timer = setInterval(this.progress, 20); //0.02초마다 progress 함수 불러온다.
    this.callApi()
      .then(res => this.setState({ customers: res }))
      .catch(err => console.log(err));
  }

  callApi = async () => {
    const response = await fetch('/api/customers');
    const body = await response.json();
    return body;
  }

  progress = () => {
    const { completed } = this.state;
    this.setState({ completed: completed >= 100 ? 0 : completed + 1});
  }

  const { classes } = props; //비동기 처리때문에 렌더링 되기 전에 접근해서 오류가 나므로 이와 같이 코딩한다.
  return (
    <div>
      <Paper className = {classes.root}> 
        <Table className = {classes.table}>
          <TableHead>
            <TableRow>
              <TableCell>번호</TableCell>
              <TableCell>이미지</TableCell>
              <TableCell>이름</TableCell>
              <TableCell>생년월일</TableCell>
              <TableCell>성별</TableCell>
              <TableCell>직업</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            { this.state.customers ? this.state.customers.map( c => { 
              return ( <Customer key = {c.id} id = {c.id} image = {c.image} name = {c.name} birthday = {c.birthday} gender = {c.gender} job = {c.job} />) 
            }) : 
            <TableRow>
              <TableCell colSpan= "6" align = "center">
                <CircularProgress className = {classes.progress} variant = "determinate" value = {this.state.completed} />
              </TableCell>
            </TableRow>     
            }      
          </TableBody>
        </Table>
      </Paper>
      <CustomerAdd stateRefresh= {this.stateRefresh}/>
    </div>
  );
}

export default withStyles(styles)(App);
