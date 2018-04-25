import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import './styles.less';

const classPrefix = 'm-easyhead';

class EasyHead extends PureComponent {
    render() {
        const { renderRight } = this.props;
        return (
            <div className={`${classPrefix} f-display-flex f-flex-align-center`}>
                <a
                    href="javascript:history.back();"
                    className={`f-display-flex f-flex-align-center icon-back ${classPrefix}-btn-back-browser`}/>
                <div className="head-right-wrap">
                    {
                        renderRight()
                    }
                </div>
            </div>
        );
    }
}

EasyHead.propTypes = {
    renderRight: PropTypes.func,
};

EasyHead.defaultProps = {
    renderRight: () => null,
};

export default EasyHead;
