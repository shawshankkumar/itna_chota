import { fileURLToPath } from 'url';
import db from '../loaders/database';
import { customAlphabet } from 'nanoid';
const nanoid = customAlphabet('abcdefghijklmnopqrstuvwxyz1234567890ABCDEFGHIJKLMNOPQRSTUVWXYZ', 6);
export const createLink = async (data: string) => {
  try {
    if (data === null) throw { code: '409', message: 'There is no link' };
    let storeUrl = {
      urlCode: nanoid(),
      url: data,
    };
    await (await db()).collection('itnachota').insertOne(storeUrl);
    return storeUrl;
  } catch (error) {
    if (error.code === '409') throw error;
    throw { code: '500', message: 'could not create short url' };
  }
};
export const fetchLink = async (data: string) => {
  try {
    console.log(data);
    let storeUrl = await (await db()).collection('itnachota').findOne({ urlCode: data });
    if (storeUrl === undefined) {
      console.log('error');
      throw { code: '404', message: 'could not find the url' };
    }
    return storeUrl;
  } catch (error) {
    console.log('error1');
    if (error.code === '404') throw error;
    throw { code: '500', message: 'Could not fetch the url' };
  }
};
