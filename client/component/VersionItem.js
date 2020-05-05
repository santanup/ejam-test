import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import SendIcon from '@material-ui/icons/Send';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import ListItem from '@material-ui/core/ListItem';
import React, {useState} from 'react';
import DateFilter from '../src/DateFilter';
import PropTypes from 'prop-types';
import Confirm from '../src/Confirm';
import DeploymentStore from '../store/DeploymentStore';
import {deleteVersion} from '../Endpoints/version';
import {useStore} from 'laco-react';
import {useSnackbar} from 'notistack';
import CircularProgress from '@material-ui/core/CircularProgress';

const VersionItem = ({version, index, deployment}) => {

    const [loadingDelete, setLoadingDelete] = useState(false);

    const {versions = []} = deployment;

    const {data: deployments} = useStore(DeploymentStore);

    const { enqueueSnackbar } = useSnackbar();

    const handleDelete = () => {
        Confirm('Are you sure?', '', 'Yes')
            .then(() => {
                setLoadingDelete(true);
                deleteVersion(version._id)
                    .then(() => {
                        versions.splice(index, 1);
                        deployments[index] = {...deployment, versions};
                        DeploymentStore.set(() => ({data: deployments}), 'update-deployment');
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
        <ListItem>
            <ListItemAvatar>
                <Avatar>
                    <SendIcon />
                </Avatar>
            </ListItemAvatar>
            <ListItemText
                primary={version.version}
                secondary={DateFilter(new Date(version.deployedAt), true)}
            />
            <ListItemSecondaryAction>
                <IconButton edge="end" aria-label="delete" onClick={handleDelete}>
                    {loadingDelete ? <CircularProgress
                        size={24}
                    /> : <DeleteIcon />}
                </IconButton>
            </ListItemSecondaryAction>
        </ListItem>
    );
};

VersionItem.propTypes = {
    version: PropTypes.object.isRequired,
    deployment: PropTypes.object.isRequired,
    index: PropTypes.number.isRequired
};

export default VersionItem;
