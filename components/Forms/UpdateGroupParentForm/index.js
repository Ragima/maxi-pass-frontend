import { injectIntl } from 'react-intl';
import { connect } from "react-redux";
import actions from 'redux/actions/groupActions';
import { getGroupsState } from 'redux/selectors/groupsSelectors';
import { client } from 'helpers/redux/actions';
import { getUserLeadState } from 'redux/selectors/userSelectors';
import UpdateGroupParentForm from './UpdateGroupParentForm';


const mapDispatchToProps = dispatch => ({
    createInnerGroup: client(dispatch, actions.createInnerGroup),
    deleteParentGroup: client(dispatch, actions.deleteParentGroup),
});

const mapStateToProps = state => ({
    groups: getGroupsState(state),
    isLead: getUserLeadState(state),
});

export default connect(mapStateToProps, mapDispatchToProps)(injectIntl(UpdateGroupParentForm));
