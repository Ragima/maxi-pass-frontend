import { actionsCreator } from 'redux/actions/index';

const actions = ['CREATE_VAULT', 'GET_VAULTS', 'DELETE_VAULT', 'EDIT_VAULT', 'GET_VAULT', 'GET_VAULTS_PAGE', 'GENERATE_VAULT_REPORT'];

export default actionsCreator(actions);
