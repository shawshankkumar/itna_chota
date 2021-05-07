import database from './database';
import express from './express';
import Logger from './logger';
import Express from 'express';
import { updateCache } from './cache';

export default async ({ expressApp }: { expressApp: Express.Application }): Promise<void> => {
    await database();
    Logger.info(`✅    Connection to database successful`);

    await express({ app: expressApp });
    Logger.info('✅    Express loaded');

    await updateCache();
    Logger.info('✅    Cache loaded');

    Logger.info('✅ All modules loaded!');
};
