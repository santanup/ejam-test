import React from 'react';
import { confirmable } from 'react-confirm';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '../component/DialogTitle';
import PropTypes from 'prop-types';
import {ThemeProvider} from '@material-ui/core/styles';
import theme from '../src/theme';
import Typography from '@material-ui/core/Typography';

class ConfirmDialog extends React.Component {

    static propTypes =  {
        Body: PropTypes.node,
        cancel: PropTypes.any,
        cancelLabel: PropTypes.string,
        confirmation: PropTypes.string,
        content: PropTypes.any,
        dismiss: PropTypes.any,
        modal: PropTypes.any,
        okLabel: PropTypes.string,
        proceed: PropTypes.any,
        show: PropTypes.bool,
        title: PropTypes.string,
    };

    render() {

        const {
            okLabel = 'OK',
            cancelLabel = 'Cancel',
            title,
            confirmation,
            show,
            proceed,
            dismiss,
            cancel,
            modal,
            content
        } = this.props;

        return (
            <ThemeProvider theme={theme}>
                <Dialog
                    fullWidth
                    id="ln-confirm-dialog"
                    maxWidth="xs"
                    modal={modal}
                    onClose={dismiss}
                    open={show}
                >
                    <DialogTitle onClose={dismiss}>
                        {title}
                    </DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                            <Typography
                                variant='h6'
                            >
                                {confirmation}
                            </Typography>
                        </DialogContentText>
                        {
                            content &&
                            <DialogContentText>
                                {content}
                            </DialogContentText>
                        }
                    </DialogContent>
                    <DialogActions>
                        <Button
                            color="primary"
                            onClick={cancel}
                        >
                            {cancelLabel}
                        </Button>
                        <Button
                            color="primary"
                            onClick={proceed}
                        >
                            {okLabel}
                        </Button>
                    </DialogActions>
                </Dialog>
            </ThemeProvider>
        );
    }
}

export default confirmable(ConfirmDialog);
