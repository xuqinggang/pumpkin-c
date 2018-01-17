import Service from 'lib/Service';
import { cvtBe2feRentUnit } from './dataAdapter';

function fetchRentUnitList({ filter, pager } = {}) {
    const { curPage = 1, perPage = 20 } = pager || {};
    let { totalPage = 1 } = pager || {};

    let rentUnitList = [];
    let suggestRentUnitList = [];
    return Service.post('/api/v1/rentUnits/search', {
        ...(filter || {}),
        offset: (curPage - 1) * perPage,
        limit: perPage,
    })
    .then((res) => {
        if (res.code === 200) {
            rentUnitList = res.data.rentUnits || [];
            suggestRentUnitList = res.data.suggestRentUnits || [];

            if (Math.ceil(res.data.total / perPage) > 0) {
                totalPage = Math.ceil(res.data.total / perPage);
            }

            return {
                type: 'SUCCESS',
                message: 'ok',
            };
        }

        return {
            type: 'FAILED',
            message: res.msg,
        };
    })
    .catch(e => ({
        type: 'CRASH',
        message: e.message,
    }))
    .then(fetchStatus => ({
        fetch: fetchStatus,
        data: {
            // convet
            rentUnitList: rentUnitList.map(
                unit => (cvtBe2feRentUnit(unit)),
            ),
            suggestRentUnitList: suggestRentUnitList.map(
                unit => (cvtBe2feRentUnit(unit)),
            ),
            pager: {
                curPage,
                totalPage,
            },
        },
    }));
}

export default fetchRentUnitList;
