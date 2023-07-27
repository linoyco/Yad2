import { Request, Response } from 'express';

import { getAllAttractions } from '../services/attractions.service';
import { AttractionsDto } from '../models/attractions.model';

export async function getAttractions(req: Request, res: Response): Promise<AttractionsDto[]> {
    const attractions = await getAllAttractions();
    res.json(attractions);
    return attractions;
}