import React from 'react';
import PropTypes from 'prop-types';
import { Grid, Divider } from 'semantic-ui-react';
import { Text } from 'styled_components/Text';
import { HeightColumn, HeightRow } from 'styled_components/Grid';
import _ from 'lodash';

const SinglePageLayout = ({ title, headerButtons, itemLists, entity }) => {
    return (
        <>
            <Grid stackable>
                <Grid.Row>
                    <Grid.Column width={8}>
                        <Text size='28' inverted truncate>{`${entity}: ${title}`}</Text>
                    </Grid.Column>
                    {headerButtons && (
                        <Grid.Column width={8}>
                            {headerButtons}
                        </Grid.Column>
                    )}
                </Grid.Row>
            </Grid>
            <Divider/>
            <Grid className='flex-stretched' columns='equal' stackable divided>
                <HeightRow>
                    {_.map(itemLists, (list, index) => (
                        <HeightColumn key={`item:${index}`}>
                            {list}
                        </HeightColumn>
                    ))}
                </HeightRow>
            </Grid>
        </>
    );
};

SinglePageLayout.propTypes = {
    title: PropTypes.string.isRequired,
    headerButtons: PropTypes.any,
    itemLists: PropTypes.array.isRequired,
};

export default SinglePageLayout;
