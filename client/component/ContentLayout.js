import React from 'react';
import PropTypes from 'prop-types';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import { withStyles } from '@material-ui/core/styles';

const styles = (theme) => ({
    paper: {
        maxWidth: 936,
        margin: 'auto',
        overflow: 'hidden',
    },
    searchBar: {
        borderBottom: '1px solid rgba(0, 0, 0, 0.12)',
    },
    searchInput: {
        fontSize: theme.typography.fontSize,
    },
    block: {
        display: 'block',
    },
    addUser: {
        marginRight: theme.spacing(1),
    },
    contentWrapper: {
        margin: '40px 16px',
    },
});

function Content(props) {

    const { classes, children, action } = props;

    return (
        <Paper className={classes.paper}>
            {
                action && <AppBar className={classes.searchBar} position="static" color="default" elevation={0}>
                    <Toolbar>
                        <Grid container spacing={2} alignItems="center">
                            <Grid item xs/>
                            <Grid item>
                                {action ? action : ''}
                            </Grid>
                        </Grid>
                    </Toolbar>
                </AppBar>
            }
            <div className={classes.contentWrapper}>
                {children}
            </div>
        </Paper>
    );
}

Content.propTypes = {
    classes: PropTypes.object.isRequired,
    children: PropTypes.any.isRequired,
    action: PropTypes.any,
};

export default withStyles(styles)(Content);
