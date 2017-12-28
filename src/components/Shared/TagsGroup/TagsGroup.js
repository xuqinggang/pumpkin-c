import React, { PureComponent, Component } from 'react';
import classnames from 'classnames';

import Tags from 'Shared/Tags/Tags';
import { shallowEqual } from 'lib/util';

export default class TagsGroup extends Component {
    constructor(props) {
        super(props);
        this.state = {
            tagStateObj: {},
        };
    }

    onTagsChange = (tagStateObj) => {
        const {
            onTagsChange,
            type,
        } = this.props;

        if (onTagsChange) {
            onTagsChange(type, tagStateObj);
        }

        this.setState({
            tagStateObj,
        });
    }

    componentWillReceiveProps(nextProps) {
        if ('activeIndexObj' in nextProps) {
            this.setState({
                tagStateObj: nextProps.activeIndexObj,
            });
        }
    }

    shouldComponentUpdate(nextProps, nextState) {
        return !shallowEqual(nextState.tagStateObj, this.state.tagStateObj);
    }

    render() {
        console.log('MoreTags render');
        const {
            className,
            classPrefix,
            tagItemClass,
            tagsArr,
            label,
        } = this.props;
        return (
            <div className={className}>
                <h1 className={`${classPrefix}-title`}>{label}</h1>
                <Tags
                    tagsArr={tagsArr}
                    itemClass={classnames(`${classPrefix}-item`, tagItemClass)}
                    onChange={this.onTagsChange}
                    activeIndexObj={this.state.tagStateObj}
                />
            </div>
        )
    }
}
