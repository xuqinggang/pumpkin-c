import ReactDOM from 'react-dom';
import Alert from './Alert';

let instance = null;
let oneDiv;
const propsData = {
    message: '',
    buttons: [],
};
function getAlert() {
    function create(div) {
        document.body.appendChild(div);
        instance = ReactDOM.render(<Alert {...propsData} />, div);
        return instance;
    }
    function destroy(div) {
        ReactDOM.unmountComponentAtNode(div);
        document.body.removeChild(div);
    }
    if (!instance) {
        oneDiv = document.createElement('div');
        instance = create(oneDiv);
    } else {
        destroy(oneDiv);
        instance = create(oneDiv);
    }
    return instance;
}
export default function (opts = {}) {
    const {
        title,
        message,
        buttons,
    } = opts;
    propsData.title = title || '';
    propsData.message = message;
    propsData.buttons = buttons || [];
    const ins = getAlert();
    ins.show();
}
