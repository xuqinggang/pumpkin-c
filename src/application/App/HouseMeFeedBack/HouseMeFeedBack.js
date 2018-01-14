import React, { PureComponent } from 'react';
import LogoImg from 'images/App/singleLogo.png';

import MeFeedBackBack from 'components/App/HouseMeFeedBack/MeFeedBackBack/MeFeedBackBack';

import './styles.less';

const classPrefix = 'm-aboutus';

export default class AboutUs extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            textareaVal: '',
        };
    }

    handleTextAreaChange = (e) => {
        const textareaVal = e.target.value;
        this.setState({
            textareaVal,
        });
    }

    render() {
        const {
            textareaVal,
        } = this.state;

        return (
            <div className={`${classPrefix}`}>
                <MeFeedBackBack />
                <div>
                    <textarea className={`${classPrefix}-textarea`} name="" cols="30" rows="10" value={textareaVal} />
                </div>
            </div>
        );
    }
}
