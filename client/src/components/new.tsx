import { Button, Container, CssBaseline, makeStyles, TextField, Typography, Input, InputAdornment, InputLabel, IconButton, FormControl  } from "@material-ui/core";
import { useHistory } from "react-router-dom";
import { member as basic, SNACKBAR_TIME } from '../request/values';

import React, { useState } from "react";
import { useSnackbar } from 'notistack';
import ToastStr from '../request/toastStr';
import { COLORS } from './Theme'

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
    let history = useHistory()

    // const {member, setMember} = props
    const [password, setPassword] = useState<string>('');
    const [passwordRe, setPasswordRe] = useState<string>('');
    const [check, setCheck] = useState<boolean>(false);
    const [showPassword, setShowPassword] = useState<boolean>(false);


    const buttonText = ['비밀번호를 입력해주세요.', '비밀번호를 확인해주세요', '확인']

    const { enqueueSnackbar } = useSnackbar();
    const { member } = props;
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
                        <Typography>{member.id}</Typography>
    

                    </div>
                </div>
            </Container>
        </div>

    )
}

export default AuthPassword;