import { connect } from "react-redux";
import { injectIntl } from 'react-intl';
import { client } from 'helpers/redux/actions';
import actions from 'redux/actions/linkActions';
import { getUserVaultState } from 'redux/selectors/relationsSelectors';
import PolicyUserDropdown from './PolicyUserDropdown';

const mapDispatchToProps = dispatch => ({
    changeVaultPolicy: client(dispatch, actions.changeUserVaultPolicy),
});

const mapStateToProps = (state, ownProps) => ({
    relation: getUserVaultState(state, ownProps),
});

export default injectIntl(connect(mapStateToProps, mapDispatchToProps)(PolicyUserDropdown));
