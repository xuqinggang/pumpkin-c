import Service from 'lib/Service';

export function kzPv(traceKey = 'xxx', traceId = 'nangua_daili_list') {
    const img = document.createElement('img');
    img.src =`http://pv.kuaizhan.com/newInc?traceId=${traceId}&traceKey=${traceKey}`;
    img.style.display = 'none';
    document.body.appendChild(img);
}
