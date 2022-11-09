import _ from 'lodash';

const actionTemplate = type => payload => ({
    type, 
    ...payload,
});

export const actionCreator = (constant) => {
    const successConstant = `${constant}_SUCCESS`;
    const errorConstant = `${constant}_ERROR`;

    const action = _.camelCase(constant);
    const successAction = _.camelCase(successConstant);
    const errorAction = _.camelCase(errorConstant);

    return {
        [constant]: constant,
        [successConstant]: successConstant,
        [errorConstant]: errorConstant,
        [action]: actionTemplate(constant),
        [successAction]: actionTemplate(successConstant),
        [errorAction]: actionTemplate(errorConstant),
    };
};

export const actionsCreator = actions => _.assign({}, ..._.map(actions, actionCreator));
