import { Button, Container, CssBaseline, makeStyles, TextField, Typography, Input, InputAdornment, InputLabel, IconButton, FormControl  } from "@material-ui/core";
import { useHistory } from "react-router-dom";
import { member as basic, SNACKBAR_TIME } from '../request/values';

import React, { useEffect } from "react";
import { useSnackbar } from 'notistack';
import { COLORS } from './Theme'
import { ClientRequest } from "http";

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

declare global{
    interface Window{
        kakao: any;
    }
}

const { kakao } = window;

const AuthPassword: React.FC<any> = props => {
    const classes = useStyles();
    let history = useHistory()


    const { enqueueSnackbar } = useSnackbar();
    const { member } = props;
    const mapScript = document.createElement("script");
    mapScript.async = true;
    mapScript.src = '//dapi.kakao.com/v2/maps/sdk.js?appkey=09a2bf6aef7641e6ca9ed7991df1bf89&autoload=false&Libraries=services,clusterer,drawing';

    useEffect(() => {
 
        const container = document.getElementById('myMap');
        let options = {
            center: new kakao.maps.LatLng(35.8881679003687, 128.61134827189184 ),
            level: 4
        };
        const map = new kakao.maps.Map(container, options);
        if (navigator.geolocation) {
            // GeoLocation을 이용해서 접속 위치를 얻어옵니다
            navigator.geolocation.getCurrentPosition(function(position) {
                const lat = position.coords.latitude; // 위도
                const lon = position.coords.longitude; // 경도
                let locPosition = new kakao.maps.LatLng(lat, lon);
                map.panTo(locPosition);
            });
        } else {

        }
           
    }, []);

    return (
        <div id='myMap' style={{
            width: '100vw', 
            height: '100vh'
        }}></div>
    );
}

export default AuthPassword;