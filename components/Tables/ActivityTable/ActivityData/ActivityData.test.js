import React from 'react';
import { mountSmart, shallowSmart, mockStore, resizeTo } from "helpers/tests/enzymeHelpers";
import ActivityData from 'components/Tables/ActivityTable/ActivityData';
import { parseActivity } from 'components/Tables/ActivityTable/ActivityData/ActivityData';

const activities = [{ activity: 'Created table', type: 'User', action: 'Create', date: new Date(), actor: 'Not me' }];

describe('ActivityData', () => {
    const props = { data: activities };
    it('should match snapshot', () => {
        const wrap = shallowSmart(<ActivityData {...props}/>);
        expect(wrap).toMatchSnapshot();
    });
    it('should render itself', () => {
        const wrap = mountSmart(<ActivityData {...props}/>);
        expect(wrap.find('ActivityData')).toHaveLength(1);
    });
    it('should render its children', () => {
        const wrap = mountSmart(<ActivityData {...props}/>);
        expect(wrap.find('TableHeaderCell')).toHaveLength(5);
        expect(wrap.find('TableRow')).toHaveLength(2);
    });
    it('should render 10 cells if computer', () => {
        resizeTo('computer');
        const wrap = mountSmart(<ActivityData {...props}/>);
        expect(wrap.find('TableCell')).toHaveLength(10);
    });
    it('should render 1 cell if mobile', () => {
        resizeTo('mobile');
        const wrap = mountSmart(<ActivityData {...props}/>);
        expect(wrap.find('TableCell')).toHaveLength(1);
    });
});

describe('parseActivity', () => {
    it('should return parseable keys', () => {
        expect(parseActivity({
            created_at: "2019-05-29T11:28:06.002Z",
            updated_at: "2019-05-29T11:28:06.002Z",
            team_name: "RoR_Dnipro",
            actor_role: "admin",
            actor_email: "eugene@123software.ru",
            actor_action: "copied login item",
            subj1_id: "1631",
            subj1_title: "1",
            subj1_action: "from vault",
            subj2_id: "a119b395-4c22-4e94-869f-86b7b2be662b",
            subj2_title: "ArenaFinversia",
            subj2_action: "to vault",
            subj3_id: "035af34d-7fca-4651-9031-245e15934eaf",
            subj3_title: "Personal",
            action_type: "Vault item",
            action_act: "Copy",
        })).toEqual('eugene@123software.ru copied login item 1 from vault ArenaFinversia to vault Personal');
    });
    it('should return empty string', () => {
        expect(parseActivity({})).toEqual('');
    });
});
