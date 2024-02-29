import { Request, Response } from 'express';

import { FeedModel } from '../models';

export class FeedsController {
  async create(req: Request, res: Response): Promise<void> {
    const body = req.body;

    const doc = await FeedModel.create({ uuid: crypto.randomUUID(), ...body });

    res
      .json({
        data: doc.toObject(),
      })
      .status(200);
  }
}
