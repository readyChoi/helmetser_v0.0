import { makeStyles } from "@material-ui/core";


const useStyles = makeStyles((theme) => ({
    background: {
        position: 'absolute',
        top: 0,
        width: '100vw',
        height: '100vh',
        background: `url("/images/background.png")`,
    },
    logoSection: {
        textAlign: 'center',
        marginTop: '35vh',
        "& img": {
            width: '60vw'
        }
    },
    footer: {
        position: 'absolute',
        textAlign: 'center',
        bottom: '5vh',
        left: 0,
        right: 0,
        "& img": {
            width: '27vw'
        }
    }

}));

const Splash: React.FC<any> = (props) => {
    const classes = useStyles();
    return (
        <div className={classes.background}>
            <div className={classes.logoSection}>
                <img src="/images/logo.webp" />
            </div>

            <div className={classes.footer}>
                <img src="/images/spreneur.webp" />
            </div>
        </div>

    )
}

export default Splash