import React from 'react';
import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle
} from '@mui/material';

interface IProps {
    open: boolean;
    handleClose: () => void;
}

function ThanksModal({ open, handleClose }: IProps) {
    return (
        <Dialog
            open={open}
            onClose={handleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description">
            <DialogTitle id="alert-dialog-title">
                Успешная регистрация
            </DialogTitle>
            <DialogContent>
                <DialogContentText id="alert-dialog-description">
                    <div className="d-flex justify-content-center align-content-center mt-4 mb-4">
                        <i
                            className="fa-regular fa-circle-check c-green"
                            style={{ fontSize: 200 }}
                        />
                    </div>
                    Спасибо, вы успешно зарегистрировались на нашем сайте
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose} autoFocus>
                    закрыть
                </Button>
            </DialogActions>
        </Dialog>
    );
}

export default ThanksModal;
