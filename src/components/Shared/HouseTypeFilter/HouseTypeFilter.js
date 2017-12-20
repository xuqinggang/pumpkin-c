import React, { Component } from 'react';
import Tags from 'Shared/Tags/Tags';
import './styles.less';

const houseTypeClass = 'm-housetype';
const sharedTagsArr = [
    {
        unique: true,
        text: '不限',
    },
    {
        text: '2居'
    },
    {
        text: '3居'
    },
    {
        text: '3居+'
    },
    {
        text: '3居+'
    },
    {
        text: '3居+'
    },
];

const entireTagsArr = [
    {
        unique: true,
        text: '不限',
    },
    {
        text: '1居'
    },
    {
        text: '2居'
    },
    {
        text: '2居+'
    },
];


export default class HouseTypeFilter extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className={`${houseTypeClass}`}>
                <div className={`${houseTypeClass}-shared`}>
                    <h1 className={`${houseTypeClass}-title`}>合租</h1>
                    <Tags tagsArr={sharedTagsArr} itemClass={`${houseTypeClass}-item`} />
                </div>
                <div className={`${houseTypeClass}-entire`}>
                    <h1 className={`${houseTypeClass}-title`}>整租</h1>
                    <Tags tagsArr={entireTagsArr} itemClass={`${houseTypeClass}-item`} />
                </div>
            </div>
        );
    }
}
