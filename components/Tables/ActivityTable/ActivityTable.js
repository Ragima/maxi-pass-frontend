import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { Flex } from 'styled_components/Flexbox';
import { ActivityGrid } from 'styled_components/Grid';
import { Grid, Icon, Pagination, Responsive } from 'semantic-ui-react';
import { StyledInput } from 'styled_components/Input';
import DayPickerInput from 'react-day-picker/DayPickerInput';
import NoDataText from 'components/Elements/NoDataText';
import _ from 'lodash';
import ModalSendReport from 'components/Modals/ModalSendReport';
import ActivityData from './ActivityData';

class ActivityTable extends React.Component {
    state = {};

    getData = () => {
        const { getActivities } = this.props;
        getActivities({ page: 1, ...this.state });
    }

    debouncedFunc = _.debounce(this.getData, 500)

    handleChange = (e, { value, name }) => {
        this.setState({ [name]: value || undefined }, this.debouncedFunc);
    };


    handlePaginationChange = (e, { activePage }) => {
        const { getActivities } = this.props;
        getActivities({ page: activePage, ...this.state });
    };

    render() {
        const { activities, users, intl } = this.props;
        const { from, to } = this.state;
        return (
            <>
                <div className='filters' style={{ paddingBottom: '20px' }}>
                    <Responsive as={Fragment} minWidth={Responsive.onlyTablet.minWidth}>
                        <Flex justify='flex-end' height='auto'><ModalSendReport type='activity' users={users} data={{ page: activities.current_page, ...this.state }}/></Flex>
                        <ActivityGrid>
                            <Grid.Row verticalAlign='middle'>
                                <Grid.Column width={6}>
                                    <StyledInput stretch icon='clipboard' name='activity_type' placeholder={intl.formatMessage({ id: 'activity' })} iconPosition='left' onChange={this.handleChange}/>
                                </Grid.Column>
                                <Grid.Column width={2}>
                                    <StyledInput stretch icon='tasks' name='action_type' placeholder={intl.formatMessage({ id: 'type' })} iconPosition='left' onChange={this.handleChange}/>
                                </Grid.Column>
                                <Grid.Column width={2}>
                                    <StyledInput stretch icon='handshake' name='action_act' placeholder={intl.formatMessage({ id: 'action' })} iconPosition='left' onChange={this.handleChange}/>
                                </Grid.Column>
                                <Grid.Column width={3}>
                                    <DayPickerInput
                                        value={from}
                                        placeholder={intl.formatMessage({ id: 'from' })}
                                        component={props => (
                                            <StyledInput {...props} stretch iconPosition='left'>
                                                <Icon name='calendar'/>
                                                <input/>
                                                <Icon name='delete' onClick={() => this.handleChange(null, { value: undefined, name: 'from' })} link className='right-icon'/>
                                            </StyledInput>
                                        )}
                                        format="LL"
                                        onDayChange={value => this.handleChange(null, { value, name: 'from' })}
                                    />
                                    <DayPickerInput
                                        value={to}
                                        component={props => (
                                            <StyledInput {...props} stretch iconPosition='left'>
                                                <Icon name='calendar'/>
                                                <input/>
                                                <Icon name='delete' onClick={() => this.handleChange(null, { value: undefined, name: 'to' })} link className='right-icon'/>
                                            </StyledInput>
                                        )}
                                        placeholder={intl.formatMessage({ id: 'to' })}
                                        format="LL"
                                        onDayChange={value => this.handleChange(null, { value, name: 'to' })}
                                    />

                                </Grid.Column>
                                <Grid.Column width={3}>
                                    <StyledInput icon='user' stretch placeholder={intl.formatMessage({ id: 'actor' })} name='actor' iconPosition='left' onChange={this.handleChange}/>
                                </Grid.Column>
                            </Grid.Row>
                        </ActivityGrid>
                    </Responsive>
                </div>
                {_.isEmpty(activities.data) ? <NoDataText textId='noResults'/>
                    : (
                        <Flex direction='column' height='auto' className='flex-stretched' padding='0 0 10px 0'>
                            <ActivityData data={activities.data}/>
                            <Flex height='auto' justify='center' margin='20px 0 0 0'>
                                <Pagination
                                    activePage={activities.current_page}
                                    totalPages={activities.total_pages}
                                    onPageChange={this.handlePaginationChange}
                                    siblingRange={1}
                                    boundaryRange={0}
                                    ellipsisItem={null}
                                    nextItem={null}
                                    prevItem={null}
                                />
                            </Flex>
                        </Flex>
                    )}
                </>
        );
    }
}

ActivityTable.propTypes = {
    intl: PropTypes.object.isRequired,
    activities: PropTypes.object,
    users: PropTypes.array,
};

ActivityTable.defaultProps = {
    activities: {},
    users: [],
};

export default ActivityTable;
