import React, { useEffect, useState } from 'react';
import './App.css';

import { SNACKBAR_TIME, SPLASH_TIME } from './request/values';
import { useCookies } from 'react-cookie';
import { SnackbarProvider } from 'notistack';
import { makeStyles } from '@material-ui/core';
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import { SnackbarCloseButton } from './components/SnackBar';

import useMember from './components/useMember'
import Splash from './components/Splash';
import HeaderBar from './components/header/HeaderBar';

import Login from './components/Login'
import AuthEmail from './components/auth/Email'
import AuthPassword from './components/auth/Password'
import PersonalInfo from './components/auth/PersonalInfo'
import New from './components/new'
import NewTest from './components/newTest'


const useStyles = makeStyles({
  snackBar: {
    "& .SnackbarItem-action-*": {
      paddingLeft: 0,
    },
    "& > #notistack-snackbar": {
      "&:hover ~ $b": {
        backgroundColor: "#ccc"
      }
    }
  }
});

declare global{
  interface Window{
      kakao: any;
  }
}

export interface iMember {
  email: string | null,
  classCode: string | null,
  companyNum: number | null,
  name: string | null,
}

function App(props:any) {
  const classes = useStyles();
  const [cookies, setCookie, removeCookie] = useCookies();
  const { member, setMember, deleteMember } = useMember();
  const [loading, setLoading] = useState(false);
  const { token } = props;
  

  console.log('in App token??', token)

  useEffect(() => {
    if (cookies['access'] === undefined) {
      deleteMember();
    }

    if (member == null) {
      setTimeout(() => {
        setLoading(true);
      }, SPLASH_TIME);
    } else {
      setLoading(true)
    }
  }, [])

  useEffect(() => {
    if (window.ReactNativeWebView) {
      console.log('to rn in app!!',)
      window.ReactNativeWebView.postMessage('test in app')
    }
  }, [])


  if (!loading) {
    return <Splash />
  }
  return (
    <SnackbarProvider
      maxSnack={3}
      autoHideDuration={SNACKBAR_TIME}
      style={{
        fontSize: '3vw',
      }}
      className={classes.snackBar}
      // action={key => <SnackbarCloseButton key={key} />}
      action={key => SnackbarCloseButton(key)}
    >
        <div style={{ backgroundColor: '#ffffff' }}>
          <BrowserRouter>
            <Switch>
              <Route exact path="/" component={() => <Login member={member} setMember={setMember} token={token}/>}></Route>
              <Route path="/email" component={() => <AuthEmail member={member} setMember={setMember} />}></Route>
              <Route path="/password" component={() => <AuthPassword member={member} setMember={setMember} />}></Route>
              <Route path="/personalInfo" component={() => <PersonalInfo member={member} setMember={setMember} token={token}/>}></Route>
              <Route path="/new" component={() => <New member={member}/>}></Route>
              <Route path="/new/:loackerNum" component={() => <NewTest member={member}/>}></Route>
            </Switch>
          </BrowserRouter>
        </div>
    </SnackbarProvider>
  )
}

export default App;
