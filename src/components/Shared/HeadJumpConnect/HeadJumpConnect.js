import React, { Component } from 'react';
import classnames from 'classnames';

const classPrefix = 'm-headJump';

export default function() {
    return function(WrappedCom) {
        return class HeadJumpConnect extends Component {
            constructor(props) {
                super(props);
            }
            render() {
                return (
                    <div className={ classnames(classPrefix, 'g-tophead', 'g-grid-row') }>
                        <span className={`${classPrefix}-jumpbtn grid-col grid-col-reset icon-back`}></span>
                        <div className={`${classPrefix}-other grid-col f-flex-justify-end`}>
                            <WrappedCom />
                        </div>
                    </div>
                )
            }
        }
    }
}
