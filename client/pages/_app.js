import React, {useState} from 'react';
import PropTypes from 'prop-types';
import Head from 'next/head';
import { ThemeProvider } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import theme from '../src/theme';
import {SnackbarProvider} from 'notistack';
import DefaultLayout from '../component/Layout';

const Noop = ({ children }) => children;

export default function MyApp(props) {

    const { Component, pageProps } = props;

    let Layout = DefaultLayout;

    if (typeof Component.Layout !== 'undefined') {
        Layout = Component.Layout ? Component.Layout : Noop;
    }

    React.useEffect(() => {
    // Remove the server-side injected CSS.
        const jssStyles = document.querySelector('#jss-server-side');
        if (jssStyles) {
            jssStyles.parentElement.removeChild(jssStyles);
        }

    }, []);


    return (
        <React.Fragment>
            <Head>
                <title>Project</title>
                <meta name="viewport" content="minimum-scale=1, initial-scale=1, width=device-width" />
            </Head>
            <ThemeProvider theme={theme}>
                <SnackbarProvider>
                    <CssBaseline />
                    <Layout title={Component.title ? Component.title : ''}>
                        <Component {...pageProps} />
                    </Layout>
                </SnackbarProvider>
            </ThemeProvider>
        </React.Fragment>
    );
}

MyApp.propTypes = {
    Component: PropTypes.elementType.isRequired,
    pageProps: PropTypes.object.isRequired,
};
