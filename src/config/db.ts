import { MongoClient, MongoClientOptions, Db } from 'mongodb';

let db: Db;

export async function connectToDB(url: string, dbName: string): Promise<void> {
    try {
        const options: MongoClientOptions = {
            ignoreUndefined: false,
        };
        const client = await MongoClient.connect(url, options);
        db = client.db(dbName);
        const collection = db.collection('attractions');
        await collection.deleteMany({});
        console.log('Connected to MongoDB successfully and cleared the attractions collection');
    } catch (err) {
        console.error('Error connecting to MongoDB:', err);
        process.exit(1);
    }
}

export function getDB(): Db {
    if (!db) {
        throw new Error('You must connect to the database first');
    }
    return db;
}