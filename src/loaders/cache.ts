import nodecache from 'node-cache';
import LoggerInstance from './logger';
import db from './database';
let cache: nodecache;
const initCache = async () => {
    cache = new nodecache();
    return cache;
};

export const updateCache = async () => {
    try {
        if (!cache) await initCache();
        let urlData = await (await db()).collection('itnachota').find({}).toArray();
        urlData.forEach(async data => {
            await Promise.all([setCache(data.url, data.urlCode), setCache(data.urlCode, data.url)]);
        });
    } catch (error) {
        LoggerInstance.error(error.messages);
    }
};

export const setCache = async (key: string, value: string) => {
    return cache.set(key, value);
};

export const getCache = async (data: string) => {
    return cache.get(data) as string;
};
