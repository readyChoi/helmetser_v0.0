import MuiAlert, { AlertProps, Color } from '@material-ui/lab/Alert';
import Snackbar from '@material-ui/core/Snackbar';
import { makeStyles } from '@material-ui/core/styles';
import { SNACKBAR_TIME } from '../request/values';
import { Button } from '@material-ui/core';
import { useSnackbar } from 'notistack';
import { COLORS } from './Theme';

const useStyles = makeStyles({
    root: {
        zIndex: 2000,
    },
    snackBar: {
        "& .SnackbarItem-action": {
            paddingLeft: 0,
        }
    }
});

export interface iSnackBar {
    open: boolean,
    setOpen: (b: boolean) => void,
    severity: Color,
    text: string,
}

function Alert(props: AlertProps) {
    return <MuiAlert elevation={6} variant="filled" {...props} />
}
const CustomSnackBar: React.FC<iSnackBar> = (props) => {
    const classes = useStyles();

    const handleClose = (event?: React.SyntheticEvent, reason?: string) => {
        if (reason === 'clickaway') {
            return;
        }
        props.setOpen(false);
    }

    // let severity:Color = "success";

    // if (props.severity === "error") severity = "error"
    // else if (props.severity === "warning") severity = "warning"
    // else if (props.severity === "info") severity = "info"


    return (
        <Snackbar className={classes.root} open={props.open} autoHideDuration={SNACKBAR_TIME} onClose={handleClose}>
            <Alert onClose={handleClose} severity={props.severity}>
                {props.text}
            </Alert>

        </Snackbar>
    )
}

export const buildSnack = (snackBarState: iSnackBar, setSnackBar: React.Dispatch<React.SetStateAction<iSnackBar>>, handleOpen: Function, severity: Color, text: string) => {
    const currentState = snackBarState;

    currentState['severity'] = severity;
    currentState['text'] = text;
    handleSnackOpen(true, snackBarState, setSnackBar);
}

export const handleSnackOpen = (b: boolean, snackBarState: iSnackBar, setSnackBar: React.Dispatch<React.SetStateAction<iSnackBar>>) => {
    const currentState = snackBarState;

    currentState['open'] = b;
    setSnackBar(currentState);
}

// export const closeSnackBarButton = (key: any, closeSnackbar: any) => (
//     <Fragment>
//         <Button onClick={() => { closeSnackbar(key) }}>
//             X
//         </Button>
//     </Fragment>
// );

export function SnackbarCloseButton(key: any) {
    const { closeSnackbar } = useSnackbar();

    return (
        <div>
            <Button style={{ color: `${COLORS.WHITE}`, width: 30, minWidth: 20 }} onClick={(e) => { closeSnackbar(key) }}>
                X
            </Button>
        </div>
    );
}

export default CustomSnackBar;