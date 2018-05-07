import ReactDOM from 'react-dom';
import ImagePreviewWrap from './ImagePreviewWrap';

let instance = null;
let oneDiv;
const propsData = {
    message: '',
    buttons: [],
};
function getInstance() {
    function create(div) {
        document.body.appendChild(div);
        instance = ReactDOM.render(<ImagePreviewWrap {...propsData} />, div);
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
        index,
        images,
    } = opts;
    propsData.index = index;
    propsData.images = images;
    const ins = getInstance();
    ins.show();
}
