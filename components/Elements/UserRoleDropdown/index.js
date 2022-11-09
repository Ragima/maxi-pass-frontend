import { connect } from "react-redux";
import { injectIntl } from 'react-intl';
import { client } from 'helpers/redux/actions';
import actions from 'redux/actions/linkActions';
import { getUserGroupState } from 'redux/selectors/relationsSelectors';
import UserRoleDropdown from './UserRoleDropdown';

const mapDispatchToProps = dispatch => ({
    changeUserLeadRole: client(dispatch, actions.changeGroupUserRole),
});

const mapStateToProps = (state, ownProps) => ({
    relation: getUserGroupState(state, ownProps),
});

export default injectIntl(connect(mapStateToProps, mapDispatchToProps)(UserRoleDropdown));
