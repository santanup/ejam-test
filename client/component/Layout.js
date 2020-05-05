import React, {useEffect} from 'react';
import PropTypes from 'prop-types';
import CssBaseline from '@material-ui/core/CssBaseline';
import Hidden from '@material-ui/core/Hidden';
import makeStyles from '@material-ui/core/styles/makeStyles';
import Navigator from './Navigator';
import Header from './Header';

const drawerWidth = 256;

const useStyle = makeStyles(theme => ({
    root: {
        display: 'flex',
        minHeight: '100vh',
    },
    drawer: {
        [theme.breakpoints.up('sm')]: {
            width: drawerWidth,
            flexShrink: 0,
        },
    },
    app: {
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
    },
    main: {
        flex: 1,
        padding: theme.spacing(6, 4),
        background: '#eaeff1',
    },
    footer: {
        padding: theme.spacing(2),
        background: '#eaeff1',
    },
}));

function Layout({children, title}) {
    const classes = useStyle();
    const [mobileOpen, setMobileOpen] = React.useState(false);

    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    };

    return (
        <div className={classes.root}>
            <CssBaseline />
            <nav className={classes.drawer}>
                <Hidden smUp implementation="js">
                    <Navigator
                        PaperProps={{ style: { width: drawerWidth } }}
                        variant="temporary"
                        open={mobileOpen}
                        onClose={handleDrawerToggle}
                    />
                </Hidden>
                <Hidden xsDown implementation="css">
                    <Navigator PaperProps={{ style: { width: drawerWidth } }} />
                </Hidden>
            </nav>
            <div className={classes.app}>
                <Header onDrawerToggle={handleDrawerToggle} title={title}/>
                <main className={classes.main}>
                    {children}
                </main>
                {/*<footer className={classes.footer}>*/}
                {/*    /!*<Copyright />*!/*/}
                {/*</footer>*/}
            </div>
        </div>
    );
}

Layout.propTypes = {
    children: PropTypes.any.isRequired,
    title: PropTypes.string,
};

export default Layout;
