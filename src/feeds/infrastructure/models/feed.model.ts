import mongoose, {
  HydratedDocument,
  Model,
  Schema,
  SchemaTypes,
} from 'mongoose';

import { Properties } from '../../../shared/domain/types';
import { FeedEntity } from '../../domain/entities';

export type TFeedModelDto = Properties<FeedEntity>;

const FeedSchema = new Schema<TFeedModelDto>(
  {
    uuid: {
      type: SchemaTypes.String,
      index: true,
    },
    title: SchemaTypes.String,
    subtitle: SchemaTypes.String,
    authors: SchemaTypes.Array,
    date: {
      type: SchemaTypes.Date,
      index: true,
    },
    location: SchemaTypes.String,
    source: {
      code: SchemaTypes.String,
      url: SchemaTypes.String,
    },
  },
  {
    timestamps: true,
  },
);

export const FeedModel = mongoose.model<TFeedModelDto>('feeds', FeedSchema);

export type IFeedModel = Model<TFeedModelDto>;

export type TFeedModelInstance = HydratedDocument<TFeedModelDto>;
