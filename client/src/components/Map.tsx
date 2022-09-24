import { Button, Container, CssBaseline, makeStyles, TextField, Typography, Input, InputAdornment, InputLabel, IconButton, FormControl  } from "@material-ui/core";
import { useHistory } from "react-router-dom";
import { member as v_member, basic, Values, SNACKBAR_TIME } from '../request/values';
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSnackbar } from 'notistack';
import { COLORS } from './Theme'
import { ClientRequest } from "http";
import { markAsUntransferable } from "worker_threads";
import ToastStr from '../request/toastStr';

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
    const SERVER = basic.server;

    const { enqueueSnackbar } = useSnackbar();
    const { member } = props;
    const [locker, setLocker] = useState<any>('');
    const mapScript = document.createElement("script");
    mapScript.async = true;
    mapScript.src = '//dapi.kakao.com/v2/maps/sdk.js?appkey=09a2bf6aef7641e6ca9ed7991df1bf89&autoload=false&Libraries=services,clusterer,drawing';

    const positions = [
        {
            title: '카카오', 
            lat: 35.8882679003687,
            lng: 128.61134827189184,
        },
        {
            title: '생태연못', 
            lat: 35.8883679003687,
            lng: 128.61134827189184,
        },
        {
            title: '텃밭', 
            lat: 35.8884679003687,
            lng: 128.61134827189184,
        },
        {
            title: '근린공원',
            lat: 35.8880679003687,
            lng: 128.61134827189184,
        }
    ];

    const getLocker = () => {
        let url = new URL(SERVER + v_member.member + v_member.get_map);
        let params = {}
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
                setLocker(data.lockers);
            }
        })
    }

    const handleNew = (E: any) => {
        history.push({
            pathname: '/newTest/' + positions[E].title,
            state: {
                sale: positions[E].title
            }
          });
      }

    
    useEffect(() => {
        getLocker()
        const imageSrc = 'https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/marker_red.png', // 마커이미지의 주소입니다    
            imageSize = new kakao.maps.Size(64, 69), // 마커이미지의 크기입니다
            imageOption = {offset: new kakao.maps.Point(27, 69)}; // 마커이미지의 옵션입니다. 마커의 좌표와 일치시킬 이미지 안에서의 좌표를 설정합니다.

        const markerImage = new kakao.maps.MarkerImage(imageSrc, imageSize, imageOption);

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
        
        // 마커를 클릭했을 때 마커 위에 표시할 인포윈도우를 생성합니다
        const iwContent = '<div style="padding:5px;">Hello World!</div>', // 인포윈도우에 표출될 내용으로 HTML 문자열이나 document element가 가능합니다
            iwRemoveable = true; // removeable 속성을 ture 로 설정하면 인포윈도우를 닫을 수 있는 x버튼이 표시됩니다

        // 인포윈도우를 생성합니다
        const infowindow = new kakao.maps.InfoWindow({
            content : iwContent,
            removable : iwRemoveable
        });

        positions.forEach((el, index) => {
            // 마커를 생성합니다
            const marker = new kakao.maps.Marker({
              //마커가 표시 될 지도
              map: map,
              //마커가 표시 될 위치
              position: new kakao.maps.LatLng(el.lat, el.lng),
              //마커에 hover시 나타날 title
              title: el.title,

              image: markerImage,

              clickable: true
            });

            kakao.maps.event.addListener(marker, 'click', function() {
                // 마커 위에 인포윈도우를 표시합니다
                infowindow.open(map, marker);  
                handleNew(index);
            })

          });
          console.log('setting complete')
    }, []);

    return (
        <div id='myMap' style={{
            width: '100vw', 
            height: '100vh'
        }}></div>
    );
}

export default AuthPassword;