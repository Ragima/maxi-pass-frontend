import React from 'react';
import { PageContent } from 'styled_components/Content';
import { PageContainer } from 'styled_components/Container';
import PropTypes from 'prop-types';
import HeaderLayout from 'components/Layouts/HeaderLayout';
import MenuLayout from 'components/Layouts/MenuLayout';
import unlayoutedPages from 'constants/unlayoutedPages';
import _ from 'lodash';

const FullLayout = ({ children, router }) => {
    const pathname = _.get(router, 'pathname', '');
    const isUnlayoutedPage = _.some(unlayoutedPages, page => pathname.includes(page));

    return (isUnlayoutedPage ? children
        : (
            <PageContent>
                <HeaderLayout/>
                <MenuLayout>
                    <PageContainer wide>                    
                        {children}
                    </PageContainer>
                </MenuLayout>
            </PageContent>
        )
    );  
};

FullLayout.propTypes = {
    children: PropTypes.any,
    router: PropTypes.object,
};

export default FullLayout;
