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
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import InputBase from '@material-ui/core/InputBase';
import { fade } from '@material-ui/core/colorManipulator';
import MenuIcon from '@material-ui/icons/Menu';
import SearchIcon from '@material-ui/icons/Search';

const styles = theme => ({
  root: {
    width: '100%',
    minWidth: 1080
  },
  menu: {
    marginTop: 15,
    marginBottom: 15,
    display: 'flex',
    justifyContent: 'center'
  },
  paper: {
    marginLeft: 18,
    marginRight: 18
  },
  progress: {
    margin: theme.spacing.unit * 2
  },
  tableHead: {
    fontSize: '1.0rem'
  },
  grow: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    display: 'none',
    [theme.breakpoints.up('sm')]: {
      display: 'block',
    },
  },
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(3),
      width: 'auto',
    },
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputRoot: {
    color: 'inherit',
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '20ch',
    },
  },
  sectionDesktop: {
    display: 'none',
    [theme.breakpoints.up('md')]: {
      display: 'flex',
    },
  },
  sectionMobile: {
    display: 'flex',
    [theme.breakpoints.up('md')]: {
      display: 'none',
    },
  }
});


function App(props) {

  function constructor(props) {
    super(props);
    this.state = {
      customers: '',
      completed: 0,
      searchKeyword: ''
    }
  }

  stateRefresh = () => {
    this.setState( {
      customers: '',
      completed: 0,
      searchKeyword: ''
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

  handleValueChange = (e) => {
    let nextState = {};
    nextState[e.target.name] = e.target.value;
    this.nextState(nextState);
  }
  
  const filteredComponents = (data) => {
    data = data.filter((c) => {
      return c.name.indexOf(this.state.searchKeyword) > -1;
    });
    return data.map((c) => {
      return <Customer stateRefresh={this.stateRefresh} key={c.id} id={c.id} image={c.image} name={c.name} birthday={c.birthday} gender={c.gender} job={c.job} />
    });
  }

  const { classes } = props; //비동기 처리때문에 렌더링 되기 전에 접근해서 오류가 나므로 이와 같이 코딩한다.
  const cellList = ["번호", "이미지", "이름", "생년월일", "성별", "직업", "설정"];
  return (
    <div className = {classes.root}>
      <AppBar position="static">
        <Toolbar>
          <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="open drawer">
            <MenuIcon />
          </IconButton>
          <Typography className={classes.title} variant="h6" noWrap>
            고객 관리 시스템
          </Typography>
          <div className={classes.search}>
            <div className={classes.searchIcon}>
              <SearchIcon />
            </div>
            <InputBase
              placeholder="검색하기"
              classes={{
                root: classes.inputRoot,
                input: classes.inputInput,
              }}
              name = "searchKeyword"
              value = {this.state.searchKeyword}
              onChange = {this.handleValueChange}
              inputProps={{ 'aria-label': 'search' }}
            />
          </div>
          <div className={classes.grow} />
          <div className={classes.sectionDesktop}>
            <IconButton aria-label="show 4 new mails" color="inherit">
              <Badge badgeContent={4} color="secondary">
                <MailIcon />
              </Badge>
            </IconButton>
            <IconButton aria-label="show 17 new notifications" color="inherit">
              <Badge badgeContent={17} color="secondary">
                <NotificationsIcon />
              </Badge>
            </IconButton>
            <IconButton
              edge="end"
              aria-label="account of current user"
              aria-controls={menuId}
              aria-haspopup="true"
              onClick={handleProfileMenuOpen}
              color="inherit"
            >
              <AccountCircle />
            </IconButton>
          </div>
          <div className={classes.sectionMobile}>
            <IconButton
              aria-label="show more"
              aria-controls={mobileMenuId}
              aria-haspopup="true"
              onClick={handleMobileMenuOpen}
              color="inherit"
            >
              <MoreIcon />
            </IconButton>
          </div>
        </Toolbar>
      </AppBar>
      <div className= {classes.menu}>
        <CustomerAdd stateRefresh= {this.stateRefresh}/>
      </div>
      <Paper className ={classes.paper}> 
        <Table className = {classes.table}>
          <TableHead>
            <TableRow>
              {cellList.map(c => {
                return <TableCell className={classes.tableHead}>{c}</TableCell>
              })}
            </TableRow>
          </TableHead>
          <TableBody>
            { this.state.customers ? 
              filteredComponents(this.state.customers) :
            <TableRow>
              <TableCell colSpan= "6" align = "center">
                <CircularProgress className = {classes.progress} variant = "determinate" value = {this.state.completed} />
              </TableCell>
            </TableRow>     
            }      
          </TableBody>
        </Table>
      </Paper>
    </div>
  );
}

export default withStyles(styles)(App);
