import ConfirmDialog from '../component/confirmDialog';
import { createConfirmation } from 'react-confirm';

const confirm = createConfirmation(ConfirmDialog);

const Confirm = (title, message,okLabel, options = {}) => confirm({ title, confirmation: message, ...options,okLabel });

export default Confirm;
