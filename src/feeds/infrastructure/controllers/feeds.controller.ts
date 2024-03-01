import { Request, Response } from 'express';

import { FeedCreateHandler } from '../../application/handlers';
import { FeedResource } from '../resources/feed.resource';

export class FeedsController {
  constructor(private readonly creator: FeedCreateHandler) {}

  async create(req: Request, res: Response): Promise<void> {
    const body = req.body;

    const entity = await this.creator.execute(body);

    const resource = new FeedResource(entity);

    res
      .json({
        data: resource.response(),
      })
      .status(200);
  }
}
