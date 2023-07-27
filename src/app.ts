import express from 'express';
import axios from 'axios';
import cors from 'cors';

import config from './config';
import { connectToDB, getDB } from './config/db';
import { AttractionsDto } from './models/attractions.model';
import { getAttractions } from './controllers/attractions.controller';

async function insertAttractionData(AttractionData: AttractionsDto): Promise<void> {
  const db = getDB();
  const collection = db.collection<AttractionsDto>('attractions');
  await collection.insertOne(AttractionData);
}

async function bootstrap() {
  const app = express();
  app.use(cors());
  app.use(express.json());
  app.get('/get-attractions', getAttractions);

  app.listen(config.port, () => {
    return console.log(`Express is listening at http://localhost:${config.port}`);
  });

  await connectToDB(config.dbUri, config.dbName);

  let AttractionsArr: AttractionsDto[] = [];

  await axios.get(config.govAttractionsUrl)
    .then(response => {
      response.data.result.records.map((record: any) => {
        AttractionsArr.push({
          id: record.Id,
          name: record.Name,
          address: record.Address,
          link: record.URL,
          openingHours: record.Opening_Hours,
          x: record.X,
          y: record.Y,
        });
      });
    });

  AttractionsArr.map(async (attraction: AttractionsDto) => {
    await insertAttractionData(attraction);
  });
  console.log('Data inserted successfully');
}

bootstrap();