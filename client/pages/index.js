import React, {useEffect, useState} from 'react';
import ContentLayout from '../component/ContentLayout';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import {useSnackbar} from 'notistack';
import CircularProgress from '@material-ui/core/CircularProgress';
import {createDeployment, getDeployments} from '../Endpoints/deployment';
import DeploymentStore from '../store/DeploymentStore';
import {useStore} from 'laco-react';
import Typography from '@material-ui/core/Typography';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import DeploymentItem from '../component/DeploymentItem';

function Index() {

    const [open, setOpen] = React.useState(false);
    const [url, setUrl] = React.useState('');
    const [urlError, setUrlError] = React.useState('');
    const [templateName, setTemplateName] = React.useState('');
    const [templateNameError, setTemplateNameError] = React.useState('');

    const [loading, setLoading] = useState(false);
    const { enqueueSnackbar } = useSnackbar();

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const {data: deployments} = useStore(DeploymentStore);

    function checkUrl(value) {
        return /^(?:(?:(?:https?|ftp):)?\/\/)(?:\S+(?::\S*)?@)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,})))(?::\d{2,5})?(?:[/?#]\S*)?$/i.test(value);
    }

    const validateTemplateName = () => {
        if (!templateName) {
            setTemplateNameError('Please enter a template name');
            return false;
        } else {
            return true;
        }
    };

    const validateUrl = () => {
        setTemplateNameError('');
        if (!checkUrl(url)) {
            setUrlError('Please enter valid url');
            return false;
        } else {
            setUrlError('');
            return true;
        }
    };

    const handleCreate = () => {
        if (!validateTemplateName()) return;
        if (!validateUrl()) return;
        setLoading(true);
        createDeployment(url, templateName)
            .then(response => {
                handleClose();
                setLoading(false);
                setUrl('');
                setTemplateName(0);
                DeploymentStore.set(result => ({total: result.total + 1, data: [...result.data, response]}), 'create-deployment');
                enqueueSnackbar('Create successfully', {variant: 'success'});
            })
            .catch(error => {
                enqueueSnackbar(error.message ? error.message : 'Something went wrong!', {variant: 'error'});
                setLoading(false);
            });
    };

    const handleEnter = (event) => {
        if (event.keyCode === 13) {
            handleCreate();
        }
    };

    useEffect(() => {
        if (!deployments.length) {
            getDeployments(0)
                .then(response => {
                    const {total, data} = response;
                    DeploymentStore.set(() => ({total, data}), 'get-all');
                });
        }
    }, []);

    return (
        <ContentLayout
            action={
                <Button variant="contained" color="primary" onClick={handleClickOpen}>
                    {'Create Deployment'}
                </Button>
            }
        >

            {
                deployments.length ?
                    <Table aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <TableCell>Template Name</TableCell>
                                <TableCell align="right">URL</TableCell>
                                <TableCell align="right"/>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {deployments.map((deployment, index) => <DeploymentItem deployment={deployment} index={index} key={index}/>)}
                        </TableBody>
                    </Table> :
                    <Typography variant="body2" align="center">
                        {'You have no deployments'}
                    </Typography>
            }
            <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">Create deployment</DialogTitle>
                <DialogContent>
                    <TextField
                        autoFocus
                        fullWidth
                        label="Template Name"
                        margin="normal"
                        onChange={event => setTemplateName(event.target.value)}
                        required
                        variant="outlined"
                        value={templateName}
                        onKeyDown={handleEnter}
                        error={Boolean(templateNameError)}
                        helperText={templateNameError}
                    />
                    <TextField
                        fullWidth
                        label="Url"
                        margin="normal"
                        onChange={event => setUrl(event.target.value)}
                        required
                        type="text"
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
                    <Button onClick={handleCreate} color="primary" disabled={loading}>
                        {loading ? <CircularProgress
                            size={24}
                        /> : 'Create'}
                    </Button>
                </DialogActions>
            </Dialog>
        </ContentLayout>
    );
}

Index.title = 'deployments';

export default Index;
