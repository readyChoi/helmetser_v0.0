import { Button, Container, CssBaseline, makeStyles, TextField, Typography, Input, InputAdornment, InputLabel, IconButton, FormControl  } from "@material-ui/core";
import { useHistory } from "react-router-dom";
import { member as basic, SNACKBAR_TIME } from '../../request/values';

import React, { useState } from "react";
import { useSnackbar } from 'notistack';
import ToastStr from '../../request/toastStr';
import { COLORS } from '../Theme'

import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';

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
    back : {
        marginLeft : '-1vh',
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
        alignItems: 'left',
        color: `${COLORS.PUMPKIN}`,
    },
    form: {
        width: '100%',
        marginTop: '3vh',
    },
    submit: {
        height: 60,
        color: `${COLORS.PUMPKIN}`,
        textColor: '#ffffff',
        margin: theme.spacing(3, 0, 2),
        borderRadius: '27px',
        boxShadow: '6px 3px 6px 0 rgba(0, 0, 0, 0.16)',
        border: 'solid 0.5px #cfd4d9',
        backgroundColor: `${COLORS.PUMPKIN}`,
    },

}));



const AuthPassword: React.FC<any> = props => {
    const classes = useStyles();
    let history = useHistory();
    const state: any = history.location.state
    const email = state.email

    // const {member, setMember} = props
    const [password, setPassword] = useState<string>('');
    const [passwordRe, setPasswordRe] = useState<string>('');
    const [check, setCheck] = useState<boolean>(false);
    const [showPassword, setShowPassword] = useState<boolean>(false);


    const buttonText = ['비밀번호를 입력해주세요.', '비밀번호를 확인해주세요', '확인']

    const { enqueueSnackbar } = useSnackbar();

    const valueChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { value, id } = e.target;
        if (id === 'password') {
            setPassword(value);
            if (passwordRe === value) setCheck((prevState) => true)
            else setCheck((prevState) => false)
        } else if (id === 'passwordRe') {
            setPasswordRe(value);
            if (password === value) setCheck((prevState) => true)
            else setCheck((prevState) => false)
        }
    }

    const handleClickShowPassword = () => {
        setShowPassword((prevState) => !prevState);
    };

    const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
    };

    const handleClick = (e: any) => {
        if (!check) {
            enqueueSnackbar(ToastStr.PWD_CHECK_FALSE_STR, { variant: "warning", autoHideDuration: SNACKBAR_TIME })
            setPasswordRe('');
            return;
        } else if (password.length < 6 || password.length > 20) {
            enqueueSnackbar(ToastStr.PWD_ET_CHECK_STR, { variant: "warning", autoHideDuration: SNACKBAR_TIME })
            return;
        }

        // setMember(Object.assign(member, { password : password}))
        history.push({
            pathname: '/personalInfo',
            // search: '?update=true',  // query string
            state: {  // location state
                email: email,
                password: password,
            },
        });
    }

    return (
        <div className={classes.background}>
            <Container component="main" className={classes.container}>
                <CssBaseline />
                <div className={classes.paper}>
                    <div className={classes.title}>
                        <Typography variant="h6" >
                            해커톤 프로젝트에
                        </Typography>
                        <Typography variant="h6" >
                            오신 것을 환영합니다!
                        </Typography>
                    </div>

                    <div className={classes.form}>
                        <FormControl fullWidth>
                            <InputLabel style = {{fontSize: '3vw'}} htmlFor="filled-adornment-password">비밀번호를 입력하세요</InputLabel>
                            <Input
                                id="password"
                                fullWidth
                                type={showPassword ? 'text' : 'password'}
                                value={password}
                                onChange={valueChangeHandler}
                                style = {{fontSize: '4vw'}}
                                endAdornment={
                                    <InputAdornment position="end">
                                        <IconButton
                                            aria-label="toggle password visibility"
                                            onClick={handleClickShowPassword}
                                            onMouseDown={handleMouseDownPassword}
                                        >
                                            {showPassword ? <Visibility /> : <VisibilityOff />}
                                        </IconButton>
                                    </InputAdornment>
                                }
                            />
                        </FormControl>

                        <TextField
                            variant="standard"
                            margin="normal"
                            fullWidth
                            id="passwordRe"
                            label="비밀번호를 다시 입력하세요"
                            name="password"
                            type="password"
                            value={passwordRe}
                            InputProps={{style: {fontSize: '4vw'}}}
                            InputLabelProps={{style: {fontSize: '3vw'}}}
                            onChange={valueChangeHandler}
                            style={{ color: `${COLORS.charcoal_grey}` }}
                        />

                        <Button
                            fullWidth
                            variant="contained"
                            className={classes.submit}
                            onClick={handleClick}
                        >
                            <Typography variant="h3">
                                {password === '' ? buttonText[0] : check ? buttonText[2] : buttonText[1]}
                            </Typography>
                        </Button>

                    </div>
                </div>
            </Container>
        </div>

    )
}

export default AuthPassword;