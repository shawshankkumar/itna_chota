import db from '../loaders/database';
import { customAlphabet } from 'nanoid';
import LoggerInstance from '../loaders/logger';

const nanoid = customAlphabet('abcdefghijklmnopqrstuvwxyz1234567890ABCDEFGHIJKLMNOPQRSTUVWXYZ', 6);

export const createLink = async (data: string) => {
    try {
        const urlRegex = new RegExp(
            /[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)?/gi,
        );
        if (!urlRegex.test(data)) throw { code: 422, message: 'invalid url' };
        if (!(data.startsWith('http://') || data.startsWith('https://'))) {
            data = 'https://' + data;
        }
        let store = await (await db()).collection('itnachota').findOne({ url: data });
        if (store !== null) {
            LoggerInstance.info(store.urlCode);
            return store.urlCode;
        }
        let storeUrl = {
            urlCode: nanoid(),
            url: data,
        };
        await (await db()).collection('itnachota').insertOne(storeUrl);
        return storeUrl.urlCode;
    } catch (error) {
        LoggerInstance.error(error.message);
        if (error.code === 409 || error.code === 422) throw error;
        throw { code: 500, message: 'could not create short url' };
    }
};
export const fetchLink = async (data: string) => {
    try {
        if (!data) throw { code: 204 };
        let storeUrl = await (await db()).collection('itnachota').findOne({ urlCode: data });
        if (!storeUrl) {
            throw { code: 404, message: 'could not find the url' };
        }
        return storeUrl;
    } catch (error) {
        LoggerInstance.error(error.message);
        if (error.code === 404) throw error;
        throw { code: 500, message: 'Could not fetch the url' };
    }
};
