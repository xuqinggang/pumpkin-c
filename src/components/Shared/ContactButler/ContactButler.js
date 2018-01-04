import React, { PureComponent } from 'react';
import classnames from 'classnames';
// import BottomDialog from 'Shared/BottomDialog';

import './styles.less';

const btnPrefix = 'm-contactbutler-btn';
const dialogPrefix = 'm-contactbutler-dialog'

export default class ContactButler extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            show: false,
        };
    }

    handleConcatTap = (e) => {
        // e.preventDefault();
        this.setState({
            show: true,
        });
    }
    
    handleNoContactTap = (e) => {
        // e.preventDefault();
        this.setState({
            show: false,
        });
    }

    render() {
        const { show } = this.state;
        const { name, img, tel } = this.props.contactButlerData;
        return (
            <a
                href={`tel:${tel}`} 
                className="f-display-inlineblock"
                event-tracking-click=""
                event-tracking-param-tel={tel}
                event-tracking-param-rentunitid={window.rentUnitId}
                event-tracking-param-eventname="detailtel" 
            >
                <span
                    className={`f-display-inlineblock ${btnPrefix}`}
                    onTouchTap={this.handleConcatTap}
                    key={0}>
                    联系管家
                </span>
            </a>
            // 去掉弹窗
            // <BottomDialog
            //     key={1}
            //     show={show}
            //     className={`${dialogPrefix}`}
            // >
            //     <BottomDialog.Body className={`${dialogPrefix}-body`}>
            //         <div>
            //             <img
            //                 className={`f-display-inlineblock f-vertical-middle ${dialogPrefix}-img`}
            //                 src={img}
            //                 alt="" 
            //             />
            //             <span className={`f-vertical-middle ${dialogPrefix}-name`}>{name}</span>
            //         </div>
            //         <a href={`tel:${tel}`} className={`f-display-inlineblock ${dialogPrefix}-tel`}>{tel}</a>
            //     </BottomDialog.Body>
            //     <BottomDialog.Footer className={`${dialogPrefix}-footer`}>
            //         <div className="f-display-inlineblock line" />
            //         <a className="f-display-inlineblock text" onTouchTap={this.handleNoContactTap}>暂不联系</a>
            //         <a href={`tel:${tel}`} className="f-display-inlineblock text">立即联系</a>
            //     </BottomDialog.Footer>
            // </BottomDialog>
        );
    }
}
