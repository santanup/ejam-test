import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import Button from '@material-ui/core/Button';
import React, {useState} from 'react';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import TextField from '@material-ui/core/TextField';
import DialogActions from '@material-ui/core/DialogActions';
import CircularProgress from '@material-ui/core/CircularProgress';
import Dialog from '@material-ui/core/Dialog';
import Collapse from '@material-ui/core/Collapse';
import {useSnackbar} from 'notistack';
import {useStore} from 'laco-react';
import DeploymentStore from '../store/DeploymentStore';
import {deleteDeployment, updateDeployment} from '../Endpoints/deployment';
import Confirm from '../src/Confirm';
import PropTypes from 'prop-types';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import {createVersion} from '../Endpoints/version';
import VersionStore from '../store/VersionStore';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import FolderIcon from '@material-ui/icons/Folder';
import DeleteIcon from '@material-ui/icons/Delete';
import SendIcon from '@material-ui/icons/Send';
import VersionItem from './VersionItem';

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        maxWidth: 450,
    },
    demo: {
        backgroundColor: theme.palette.background.paper,
    },
    title: {
        margin: theme.spacing(4, 0, 2),
    },
}));

const DeploymentItem = ({deployment, index}) => {

    const classes = useStyles();

    const [open, setOpen] = React.useState(false);
    const [openVersionCreate, setVersionCreate] = React.useState(false);
    const [openVersions, setOpenVersions] = React.useState(false);

    const [name, setName] = React.useState(deployment.templateName);
    const [url, setUrl] = React.useState(deployment.url);
    const [urlError, setUrlError] = React.useState('');
    const [nameError, setNameError] = React.useState('');

    const [versionName, setVersionName] = React.useState();

    const [loading, setLoading] = useState(false);
    const [loadingDelete, setLoadingDelete] = useState(false);
    const { enqueueSnackbar } = useSnackbar();

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };
    const handleToggleVersion = () => setOpenVersions(!openVersions);

    const {data: deployments} = useStore(DeploymentStore);

    function checkUrl(value) {
        return /^(?:(?:(?:https?|ftp):)?\/\/)(?:\S+(?::\S*)?@)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,})))(?::\d{2,5})?(?:[/?#]\S*)?$/i.test(value);
    }

    const validateTemplateName = () => {
        if (!name) {
            setNameError('Please enter a template name');
            return false;
        } else {
            return true;
        }
    };

    const validateUrl = () => {
        setNameError('');
        if (!checkUrl(url)) {
            setUrlError('Please enter valid url');
            return false;
        } else {
            setUrlError('');
            return true;
        }
    };

    const handleUpdate = () => {
        if (!validateTemplateName()) return;
        if (!validateUrl()) return;
        setLoading(true);
        updateDeployment(deployment._id, url, name)
            .then(response => {
                handleClose();
                setLoading(false);
                deployments[index] = response;
                DeploymentStore.set(() => ({data: deployments}), 'update-deployment');
                enqueueSnackbar('Update successfully', {variant: 'success'});
            })
            .catch(error => {
                enqueueSnackbar(error.message ? error.message : 'Something went wrong!', {variant: 'error'});
                setLoading(false);
            });
    };

    const handleEnter = (event) => {
        if (event.keyCode === 13) {
            handleUpdate();
        }
    };

    const {versions = []} = deployment;

    const handleCreateVersion  = () => {
        setLoading(true);
        createVersion(versionName, deployment._id)
            .then(response => {
                setVersionCreate(false);
                setLoading(false);
                // deployments[index] = response;
                versions.push(response);
                setVersionName('');
                deployments[index] = {...deployment, versions};
                DeploymentStore.set(() => ({data: deployments}), 'update-deployment');
                enqueueSnackbar('Create successfully', {variant: 'success'});
            })
            .catch(error => {
                enqueueSnackbar(error.message ? error.message : 'Something went wrong!', {variant: 'error'});
                setLoading(false);
            });
    };

    const handleDelete = () => {
        Confirm('Are you sure?', '', 'Yes')
            .then(() => {
                setLoadingDelete(true);
                deleteDeployment(deployment._id)
                    .then(() => {
                        deployments.splice(index, 1);
                        DeploymentStore.set((result) => ({data: deployments, total: result.total - 1}), 'delete-deployment');
                        enqueueSnackbar('Deleted successfully', {variant: 'success'});
                        setLoadingDelete(false);
                    })
                    .catch(error => {
                        enqueueSnackbar(error.message ? error.message : 'Something went wrong!', {variant: 'error'});
                        setLoadingDelete(false);
                    });
            });
    };

    return (
        <React.Fragment>
            <TableRow>
                <TableCell component="th" scope="row">
                    {deployment.templateName}
                </TableCell>
                <TableCell align="right">{deployment.url}</TableCell>
                <TableCell align="right">
                    <Button onClick={handleToggleVersion} style={{marginRight: 8}} variant="outlined" size="small">
                        {'Releases'}
                        {openVersions ? <ExpandLess /> : <ExpandMore />}
                    </Button>
                    <Button onClick={handleClickOpen} style={{marginRight: 8}} variant="outlined" size="small">{'Edit'}</Button>
                    <Button disabled={loadingDelete} variant="outlined" size="small" onClick={handleDelete}>
                        {loadingDelete ? <CircularProgress
                            size={24}
                        /> : 'Delete'}
                    </Button>
                </TableCell>
            </TableRow>
            <TableRow>
                <Collapse in={openVersions} timeout="auto" unmountOnExit component={TableCell} colSpan={3}>
                    <List dense={true} className={classes.root}>
                        {
                            versions.map((version, index) => <VersionItem version={version} key={index} index={index} deployment={deployment}/>)
                        }
                    </List>
                    <Button onClick={() => setVersionCreate(true)} style={{marginRight: 8}} variant="outlined" size="small">{'Add Release'}</Button>
                </Collapse>
            </TableRow>
            <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">Update Deployment</DialogTitle>
                <DialogContent>
                    <TextField
                        fullWidth
                        autoFocus
                        label="Template Name"
                        margin="normal"
                        onChange={event => setName(event.target.value)}
                        required
                        type="text"
                        variant="outlined"
                        value={name}
                        onKeyDown={handleEnter}
                        error={Boolean(nameError)}
                        helperText={nameError}
                    />
                    <TextField
                        fullWidth
                        label="Url"
                        margin="normal"
                        onChange={event => setUrl(event.target.value)}
                        required
                        variant="outlined"
                        value={url}
                        onKeyDown={handleEnter}
                        error={Boolean(urlError)}
                        helperText={urlError}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="primary" disabled={loading}>
                        Cancel
                    </Button>
                    <Button onClick={handleUpdate} color="primary" disabled={loading}>
                        {loading ? <CircularProgress
                            size={24}
                        /> : 'Update'}
                    </Button>
                </DialogActions>
            </Dialog>
            <Dialog open={openVersionCreate} onClose={() => setVersionCreate(false)} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">Create Version</DialogTitle>
                <DialogContent>
                    <TextField
                        fullWidth
                        autoFocus
                        label="Version Name"
                        margin="normal"
                        onChange={event => setVersionName(event.target.value)}
                        required
                        type="text"
                        variant="outlined"
                        value={versionName}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setVersionCreate(false)} color="primary" disabled={loading}>
                        Cancel
                    </Button>
                    <Button onClick={handleCreateVersion} color="primary" disabled={loading}>
                        {loading ? <CircularProgress
                            size={24}
                        /> : 'Create'}
                    </Button>
                </DialogActions>
            </Dialog>
        </React.Fragment>
    );
};

DeploymentItem.propTypes = {
    deployment: PropTypes.object.isRequired,
    index: PropTypes.number.isRequired
};

export default DeploymentItem;
