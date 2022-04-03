import { Router, Request, Response, NextFunction } from 'express';
import nedb from 'nedb';

const dataRouter = Router();
interface dataType {
  year: string;
  month: string;
  date: string;
  iso: string;
  location: string;
  time: string;
}

dataRouter.get('/matches', async (req: Request, res: Response, next: NextFunction) => {
  const database = new nedb({ filename: './database/nedb.db' });
  database.loadDatabase();
  database.find({}, (error: Error, data: dataType[]) => {
    res.json(data);
  });
});

export default dataRouter;
