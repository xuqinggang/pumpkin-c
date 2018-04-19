
// 模板方法模式
class AbstractFilterState {
    constructor(name) {
        this.name = name;
        this.state = {};
        this.label = '';
        this.param = {};
    }

    // for set state
    setFilterState(state) {
        this.state = state;
        this.param = this.setParam(state);
        this.label = this.setLabel(state);

        if (this.param === undefined || this.label === undefined) {
            throw new Error('setParam or setLabel should return some value');
        }

        this.setStore(state, this.param, this.label);
    }

    setParam(state) {
        throw new Error('you need overwrite setParam');
    }

    setLabel(state) {
        throw new Error('you need overwrite setLabel');
    }

    setStore(state, param, label) {
        throw new Error('you need overwrite setStore');
    }
}

export class BrandFilterState extends AbstractFilterState {
    constructor() {
        super('brand');
    }

    setParam(state) {
        console.log(state, this.state);
        return '';
    }

    setLabel(state) {
        console.log(state, this.state);
        return '';
    }

    setStore(state, param, label) {
        console.log(state, this.state);
        return '';
    }
}

export class PositionFilterState extends AbstractFilterState {

}
