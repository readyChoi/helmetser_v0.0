import { Button, Container, CssBaseline, makeStyles, TextField, Typography } from "@material-ui/core";
import { useHistory } from "react-router-dom";
import axios from "axios";
import { member as v_member, basic, Values, SNACKBAR_TIME } from '../../request/values';

import React, { useState } from "react";
import { COLORS } from '../Theme'

import { useSnackbar } from 'notistack';
import ToastStr from '../../request/toastStr';

const useStyles = makeStyles((theme) => ({

    nanumSquare_regular: {
        fontFamily: 'NanumR',
    },
    background: {
        position: 'absolute',
        top: 0,
        width: '100vw',
        height: '100vh',
        background: `url("/images/background.png")`,
    },
    back: {
        marginLeft: '-1vh',
    },
    container: {
        width: '82%',
        marginTop: '7vh',
        padding: 0,
    },
    paper: {
        // marginTop: theme.spacing(8),
        // width: '82%',
        margin: 'auto',
        marginTop: '6vh',
        display: 'flex',
        flexDirection: 'column',
    },
    title: {
        // width: '80%',
        alignItems: 'left'
    },
    form: {
        width: '100%',
        marginTop: theme.spacing(1),
    },
    submit: {
        height: 60,
        color: `${COLORS.WATER_BLUE}`,
        textColor: '#ffffff',
        margin: theme.spacing(3, 0, 2),
        borderRadius: '27px',
        boxShadow: '6px 3px 6px 0 rgba(0, 0, 0, 0.16)',
        border: 'solid 0.5px #cfd4d9',
        backgroundColor: `${COLORS.WATER_BLUE}`,
        "&:hover": {
            backgroundColor: `${COLORS.WATER_BLUE}`,
        }
    },
    animation: {
        width: '5vw',
        borderWidth: 3,
        borderColor: `${COLORS.SLATE_GREY}`,
        fontSize: 0,
        borderLeftColor: `${COLORS.WATER_BLUE}`,
        animation: 'rotating 2s 0.25s linear infinite',
        "&:after": {
            content: ""
        },

    },
    testBtn: {
        height: 60,
        color: `${COLORS.WATER_BLUE}`,
        textColor: '#ffffff',
        margin: theme.spacing(3, 0, 2),
        borderRadius: '27px',
        boxShadow: '6px 3px 6px 0 rgba(0, 0, 0, 0.16)',
        border: 'solid 0.5px #cfd4d9',
        backgroundColor: `${COLORS.WATER_BLUE}`,
        "&:hover": {
            backgroundColor: `${COLORS.WATER_BLUE}`,
        },
        "&:after": {
            content: "이메일 인증 요청하기"
        }
    },
}));

const SERVER = basic.server;


const AuthEmail: React.FC<any> = props => {
    const classes = useStyles();
    let history = useHistory();

    const [email, setEmail] = useState<string>('');
    const [auth, setAuth] = useState<boolean>(false);

    const { enqueueSnackbar } = useSnackbar();

    const buttonText = ["이메일 중복 확인하기", "다음으로"]

    const valueChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { value } = e.target;
        setEmail(value);
    }

    const getAuth = () => {
        let url = new URL(SERVER + v_member.member + v_member.auth_app_info);
        let params = { 'email': email ? email.toString().trim() : '', 'action': 'join' }
        url.search = new URLSearchParams(params).toString();

        axios({
            method: 'GET',
            withCredentials: true,
            url: url.toString(),
        }).then((res) => {
            return res.data
        }).then((data: any) => {
            console.log(data);
            if (data.code === Values.SUCCESS_CODE) {
                enqueueSnackbar(ToastStr.JOIN_FAIL_STR, { variant: "warning", autoHideDuration: SNACKBAR_TIME })
            } else if (data.code === Values.FAIL_CODE) {
                // this is success == dont exist same id
                enqueueSnackbar(ToastStr.EMAIL_AUTH_SUCCESS_STR, { variant: "success", autoHideDuration: SNACKBAR_TIME * 2 })
                setAuth((prevState) => true);
            }
        })
    }

    const pushB = () => {
        let url = new URL(SERVER + v_member.member + v_member.push);
        //let params = { 'email': email ? email.toString().trim() : '', 'action': 'join' }
        let params;
        url.search = new URLSearchParams(params).toString();

        axios({
            method: 'POST',
            withCredentials: true,
            url: url.toString(),
        }).then((res) => {
            return res.data
        }).then((data: any) => {
            console.log(data);
            if (data.code === Values.SUCCESS_CODE) {
                enqueueSnackbar(ToastStr.JOIN_FAIL_STR, { variant: "warning", autoHideDuration: SNACKBAR_TIME })
            } else if (data.code === Values.FAIL_CODE) {
                // this is success == dont exist same id
                enqueueSnackbar(ToastStr.EMAIL_AUTH_SUCCESS_STR, { variant: "success", autoHideDuration: SNACKBAR_TIME * 2 })
                setAuth((prevState) => true);
            }
        })
    }
    
    const movePassword = () => {
        // setMember({ id : email})
        history.push({
            pathname: '/password',
            // search: '?update=true',  // query string
            state: {  // location state
                email: email,
            },
        });
    }
    

    const handleButton = (e: any) => {
        // e.preventDefault();
        
        if (!auth) {
            pushB()
        } else {
            // setAnimation(true);
            if (email.length  === 0) {
                enqueueSnackbar(ToastStr.EMAIL_ADDR_CHECK_STR, { variant: "warning", autoHideDuration: SNACKBAR_TIME })
            } else if(email.length > 32) {
                enqueueSnackbar(ToastStr.EMAIL_ADDR_CHECK_LEN, { variant: "warning", autoHideDuration: SNACKBAR_TIME })
            } else {
                getAuth();
            }
        }
        
    }

    return (
        <div className={classes.background}>
            <Container component="main" className={classes.container}>
                <CssBaseline />
                <div className={classes.paper}>
                    <div className={classes.title}>
                        <Typography variant="h6" style={{ color: `${COLORS.WATER_BLUE}` }}>
                            해커톤 프로젝트에
                        </Typography>
                        <Typography variant="h6" style={{ color: `${COLORS.WATER_BLUE}` }}>
                            오신 것을 환영합니다!
                        </Typography>
                    </div>

                    <div className={classes.form}>
                        <TextField
                            variant="standard"
                            margin="normal"
                            required
                            fullWidth
                            id="member_email"
                            label=" 이메일을 입력하세요. (32자 이내)"
                            name="email"
                            autoComplete="email"
                            autoFocus
                            InputProps={{style: {fontSize: '4vw'}}}
                            InputLabelProps={{style: {fontSize: '3vw'}}}
                            value={email}
                            onChange={valueChangeHandler}
                            style={{ color: `${COLORS.charcoal_grey}` }}
                        />
                        <Typography variant="h1" style={{ fontFamily: 'NanumR', }}>
                            교육 프로그램 진행을 위해 이메일 가입이 필요합니다.
                        </Typography>

                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            className={classes.submit}
                            onClick={handleButton}
                        >
                            {/*
                            {auth && <CheckIcon style={{marginRight: '2vw', color: `${COLORS.WHITE}`}}/>}
                            */}
                            <Typography variant="h3">
                                {auth ? buttonText[1] : buttonText[0]}
                            </Typography>
                        </Button>

                        <Button
                            onClick={pushB}>
                        </Button>

                    </div>
                </div>
            </Container>
        </div>

    )
}

export default AuthEmail;