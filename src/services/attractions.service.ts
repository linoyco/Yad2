import { getDB } from '../config/db';

export async function getAllAttractions(): Promise<any> {
    try {
        const db = getDB();
        const collection = db.collection('attractions');
        const attractions = await collection.find({}).toArray();
        return attractions;
    } catch (err) {
        console.error('Error >>', err);
        throw err;
    }
}

module.exports = {
    getAllAttractions,
};