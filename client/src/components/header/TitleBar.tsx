import { AppBar, Box, IconButton, Toolbar, Typography } from "@material-ui/core"
import { makeStyles } from "@material-ui/core/styles";
import clsx from "clsx";
import { COLORS } from "../Theme";

const useStyles = makeStyles({
    container: {
        padding: 0,
        height: '93vh',
        width: '84vw',
        paddingTop: '7vh',
        background: `${COLORS.WHITE}`,
    },

    toolBar: {
        padding: 0,
    },
    back: {
        float: 'left',
        width: '10%',
    },
    titleWrapper: {
        display: 'flex',
        alignItems: 'center',
        flexWrap: 'wrap',
        float: 'left',
        textAlign: 'center',
        width: '80%',
        minHeight: '4.5vh',
        // maxHeight: '4.5vh',
        justifyContent: 'center',
    },
    titleIcon: {
        width: '7vw',
        marginBottom: '1vw',
    },
    title: {
        fontSize: 28,
        color: `${COLORS.WATER_BLUE}`,
        marginLeft: '2vw',

        fontFamily: 'NanumR',
        fontWeight: 'bold',

        // marginBottom: '0.5vh',
        // alignItems: 'center',
        // flexGrow: 1,
        // textAlign: 'center',
    },

})

const TitleBar: React.FC<any> = props => {

    const classes = useStyles();
    const { title, titleIcon, titleIconClass, rightButton } = props;

    return (
        <AppBar position="static" color='transparent' style={{ boxShadow: 'none' }}>
            <Toolbar className={clsx(classes.toolBar, classes.titleWrapper)} style={{ width: '100%', boxShadow: 'none' }}>
                {rightButton && <div style={{ flex: 1 }}/>}

                <img className={titleIconClass || classes.titleIcon} src={`/images/title/${titleIcon}.webp`} />
                <Typography className={classes.title} variant="h5" noWrap color='primary'>
                    {title}
                </Typography>

                {rightButton && <div style={{ flex: 1 }}>
                    {rightButton}
                </div>}

            </Toolbar>
        </AppBar>
    )
}

export const TitleBackBar: React.FC<any> = props => {

    const classes = useStyles();
    const { history, title, titleIcon, titleIconClass } = props;

    return (
        <AppBar position="static" color='transparent' style={{ boxShadow: 'none' }}>
            <Toolbar className={classes.toolBar}>
                <Box display="flex" style={{ width: "100%" }}>
                    <Box className={classes.back} onClick={() => history.goBack()}>
                        <IconButton style={{marginLeft: '5vw'}}>
                            <img src="/images/title/back.webp" />
                        </IconButton>
                    </Box>
                    <Box className={classes.titleWrapper}>
                        <img className={titleIconClass || classes.titleIcon} src={`/images/title/${titleIcon}.webp`} />
                        <Typography className={classes.title} variant="h5" noWrap color='primary'>
                            {title}
                        </Typography>
                    </Box>
                    <Box className={classes.back}>
                    </Box>
                </Box>
            </Toolbar>
        </AppBar>
    )
}


export default TitleBar