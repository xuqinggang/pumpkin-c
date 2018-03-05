import Service from 'lib/Service';

export function kzPv(traceKey = 'xxx', traceId = 'nangua_daili_list') {
    Service.get(`http://pv.kuaizhan.com/newInc?traceId=${traceId}&traceKey=${traceKey}`);
}
