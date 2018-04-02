import React from 'react';
import HouseHead from 'components/App/HouseDetail/HouseDetailIndex/HouseHead/HouseHead';
import './styles.less';

const classPrefix = 'g-apartmentdetail';

export default function ApartmentDetail({
    history,
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
                <div>xxx</div>
                <div>ssssss</div>
            </div>
        </React.Fragment>
    )
}