import withStyles from '@material-ui/core/styles/withStyles';
import MuiDialogTitle from '@material-ui/core/DialogTitle/DialogTitle';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import React from 'react';

const DialogTitle = withStyles(theme => ({
    closeButton: {
        position: 'absolute',
        right: theme.spacing(1),
        top: theme.spacing(1),
        color: theme.palette.grey[500],
    },
    dialogTitleRoot:{
        padding:theme.spacing(1.4)
    },
    dialogTitleContainer:{
        background:theme.palette.grey[100],
        padding:theme.spacing(1)
    }

}))(props => {
    const { children, classes, onClose } = props;
    return (
        <MuiDialogTitle
            className={classes.dialogTitleRoot}
            disableTypography
        >
            <div className={classes.dialogTitleContainer}>
                <Typography variant="h6">
                    {children}
                </Typography>
                {onClose ? (
                    <IconButton
                        aria-label="close"
                        className={classes.closeButton}
                        onClick={onClose}
                    >
                        <CloseIcon fontSize="small" />
                    </IconButton>
                ) : null}
            </div>
        </MuiDialogTitle>
    );
});

export default DialogTitle;
