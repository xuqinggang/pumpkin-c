// 额外的资源库文件引入

export default (context) => {
    return [
        {
            test: /flexible\.js/,
            loader: 'file-loader',
            options: {
                name: 'lib/flexible.[hash:8].[ext]',
            },
        },
    ];
};
