import React, { PureComponent } from 'react';

import ReportBack from './ReportBack/ReportBack';
import ReportType from './ReportType/ReportType';
import ReportTextArea from './ReportTextArea/ReportTextArea';
import LoginRequiredConnect from 'Shared/LoginRequiredConnect/LoginRequiredConnect';

import PopToolTip from 'Shared/PopToolTip/PopToolTip';
import { ajaxHouseReport } from 'application/App/HouseDetail/ajaxInitHouseDetail';
import './styles.less';

const classPrefix = 'm-housereport';

class HouseReport extends PureComponent {
    constructor(props) {
        super(props);
        // 举报的类型
        this.reportType = 'RENTUNIT_NOT_EXISTS';
        // 举报的消息
        this.msg = '';
        this.rentUnitId = this.props.match.params.rentUnitId;
    }

    onReportTypeChange = (reportType) => {
        this.reportType = reportType;
    }

    onReportTextAreaChange = (msg) => {
        this.msg = msg;
    }

    handleSumitTap = () => {
        ajaxHouseReport(this.rentUnitId, {
            reportType: this.reportType,
            msg: this.msg
        })
            .then((bool) => {
                bool && PopToolTip({text: '举报成功'});
                this.props.history.goBack();
            })
            .catch((err) => {
                PopToolTip({text: err.code ? err.msg : err.toString()})
            })
    }

    render() {
        return (
            <div className={`${classPrefix}`}>
                <ReportBack />
                <h1 className={`${classPrefix}-title`}>您有哪些想告诉我们？</h1>
                <ReportType onChange={this.onReportTypeChange} />
                <ReportTextArea
                    onChange={this.onReportTextAreaChange}
                    className={`${classPrefix}-textarea`}
                />
                <div className={`${classPrefix}-btn-submit-wrap`}>
                    <span
                        className={`u-btn-submit ${classPrefix}-btn-submit`}
                        onTouchTap={this.handleSumitTap}
                    >
                        提交
                    </span>
                </div>
            </div>
        );
    }
}

export default LoginRequiredConnect({ pagefrom: 'detail' })(HouseReport);
