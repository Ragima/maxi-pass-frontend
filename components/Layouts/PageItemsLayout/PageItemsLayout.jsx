import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Tree from 'components/Elements/Tree';
import { HeightColumn, HeightRow, HeightGrid } from 'styled_components/Grid';

const PageItemsLayout = ({ leftColumn, rightColumn }) => {
    const [group, setGroup] = useState(null);

    return (
        <HeightGrid columns={2} stackable divided>
            <HeightRow>
                <HeightColumn width={6}>
                    {leftColumn({ group })}
                    <Tree hideInfo selectable onSelect={setGroup}/>
                </HeightColumn>
                <HeightColumn width={10}>
                    {rightColumn({ group })}
                </HeightColumn>
            </HeightRow>
        </HeightGrid>
    );
};

PageItemsLayout.propTypes = {
    leftColumn: PropTypes.func.isRequired,
    rightColumn: PropTypes.func.isRequired,
};

export default PageItemsLayout;
