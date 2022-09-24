import { Button, Container, CssBaseline, makeStyles, TextField, Typography, Input, InputAdornment, InputLabel, IconButton, FormControl  } from "@material-ui/core";
import { useHistory } from "react-router-dom";
import { member as basic, SNACKBAR_TIME } from '../request/values';

import React, { useState } from "react";
import { useSnackbar } from 'notistack';
import ToastStr from '../request/toastStr';

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
    },
    form: {
        width: '100%',
        marginTop: '3vh',
    },
    submit: {
        height: 60,
        textColor: '#ffffff',
        margin: theme.spacing(3, 0, 2),
        borderRadius: '27px',
        boxShadow: '6px 3px 6px 0 rgba(0, 0, 0, 0.16)',
        border: 'solid 0.5px #cfd4d9',
    },

}));



const NewTest: React.FC<any> = props => {
    const classes = useStyles();
    let history = useHistory();


    return (
        <div>tesfsddsfs</div>
    )
}

export default NewTest;