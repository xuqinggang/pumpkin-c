import Service from 'lib/Service';

// 举报房源
export function ajaxHouseReport(rentUnitId, paramsObj) {
    return Service.post(`/api/v1/rentUnits/${rentUnitId}/reports`, paramsObj)
        .then((data) => {
            if (data.code === 200) {
                return true;
            }

            throw new Error(data);
        })
}
