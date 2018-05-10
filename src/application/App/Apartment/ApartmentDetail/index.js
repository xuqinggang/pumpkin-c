import React from 'react';
import { withRouter } from 'react-router';

import EasyHead from 'Shared/EasyHead';
import './styles.less';
import { isLikeNativeView } from 'lib/const';

const classPrefix = 'g-apartmentdetail';

function ApartmentDetail({
    history,
    authentications = [],
    intro = '',
}) {
    return (
        <div className={`${classPrefix}`}>
            {
                !isLikeNativeView() &&
                <EasyHead
                    renderRight={() => (
                        <span className={`${classPrefix}-title f-singletext-ellipsis`}>公寓详情</span>
                    )}
                />
            }
            <div className="item">
                <h2 className="title">公寓认证</h2>
                <div className="f-display-flex authWrap">
                    {
                        authentications.map((auth, index) => (
                            <div className="auth" key={index}>
                                <img className="image" src={auth.image} alt="" />
                                <span className="name">{auth.name}</span>
                            </div>
                        ))
                    }
                </div>
            </div>
            <div className="item">
                <h2 className="title">公寓介绍</h2>
                <p className="intro">{intro}</p>
            </div>
        </div>
    );
}

export default withRouter(ApartmentDetail);
