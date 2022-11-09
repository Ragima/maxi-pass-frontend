import { injectIntl } from 'react-intl';
import { connect } from "react-redux";
import { getGroupsState } from 'redux/selectors/groupsSelectors';
import Tree from './Tree';

const mapStateToProps = state => ({
    groups: getGroupsState(state),
});

export default connect(mapStateToProps)(injectIntl(Tree));
