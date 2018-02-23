'use strict';

const LRU = require('lru-cache');

const cache = LRU({
    // 缓存的条数
    max: 20,
    // 缓存时间
    maxAge: 1000 * 60 * 10,
});

module.exports = cache;
