import React from 'react';
import { withRouter } from 'react-router';

import HouseHead from 'components/App/HouseDetail/HouseDetailIndex/HouseHead/HouseHead';
import './styles.less';

const classPrefix = 'g-apartmentdetail';

function ApartmentDetail({
    history,
    authentications,
    intro,
}) {
    return (
        <React.Fragment>
            <HouseHead
                history={history}
                renderRight={() => (
                    <span className={`${classPrefix}-title f-singletext-ellipsis`}>公寓详情</span>
                )}
            />
            <div>
                <div>{authentications.name}</div>
                <div>{intro}</div>
            </div>
        </React.Fragment>
    );
}

export default withRouter(ApartmentDetail)