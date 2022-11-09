import { injectIntl } from 'react-intl';
import { connect } from "react-redux";
import actions from 'redux/actions/groupActions';
import { getUserLeadState } from 'redux/selectors/userSelectors';
import { client } from 'helpers/redux/actions';
import AddGroupForm from './AddGroupForm';

const mapDispatchToProps = dispatch => ({
    createGroup: client(dispatch, actions.createGroup),
    createInnerGroup: client(dispatch, actions.createInnerGroup),
});

const mapStateToProps = state => ({
    isLead: getUserLeadState(state),
});

export default connect(mapStateToProps, mapDispatchToProps)(injectIntl(AddGroupForm));
