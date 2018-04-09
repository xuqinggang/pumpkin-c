import React, { PureComponent } from 'react';
import { Redirect } from 'react-router-dom'; 
import { isHasCookie, setCookie, urlJoin } from 'lib/util';
import { isApp, isRmHead } from 'lib/const';

export default function LoginRequiredConnectWrap({ pagefrom } = {}) {
    return function LoginRequiredConnectFun(WrappedCom) {
        return class LoginRequiredConnect extends PureComponent {
            componentWillMount() {
                // 向app中注入cookie
                if (isApp() && isRmHead()) {
                    let sidVal = null;
                    if (window.iOS && iOS.getSessionId) {
                        sidVal = iOS.getSessionId();
                    }
                    if (window.android && android.getSessionId) {
                        sidVal = android.getSessionId();
                    }
                    sidVal && setCookie('sid', sidVal);
                }
            }

            render() {
                const urlStore = window.getStore('url');
                const {
                    urlPrefix,
                } = urlStore;

                if (isHasCookie('sid')) {
                    return <WrappedCom {...this.props} />;
                }

                let redirectUrl = urlJoin(urlPrefix, 'login');
                if (pagefrom) {
                    redirectUrl = `${redirectUrl}?pagefrom=${pagefrom}`;
                }

                return <Redirect to={redirectUrl} />;
            }
        };
    };
}
