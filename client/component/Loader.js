import React from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';
import Box from '@material-ui/core/Box';

const Loader = () => {

    return (
        <Box display="flex" height="-webkit-fill-available" alignItems="center" justifyContent="center">
            <CircularProgress size={120} thickness={2.5}/>
        </Box>
    );
};

export default Loader;