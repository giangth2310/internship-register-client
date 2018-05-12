import React from 'react';

import {
    Dialog,
    DialogContent,
    DialogActions,
    DialogContentText,
    DialogTitle,
    Button
} from 'material-ui';

const dialogMessage = (props) => (
    <Dialog 
        open={props.open}
        onClose={props.onClose} >
        <DialogTitle>
            {props.title}
        </DialogTitle>
        <DialogContent>
            <DialogContentText>
                {props.content}
            </DialogContentText>
        </DialogContent>
        <DialogActions>
            <Button color='primary' onClick={props.onClose}>
                OK
            </Button>
        </DialogActions>
    </Dialog>
);

export default dialogMessage;