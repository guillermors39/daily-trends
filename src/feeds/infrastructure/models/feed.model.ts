import mongoose, {
  HydratedDocument,
  Model,
  Schema,
  SchemaTypes,
} from 'mongoose';

import { TFeedDto } from '../../domain/types';

const FeedSchema = new Schema<TFeedDto>(
  {
    uuid: {
      type: SchemaTypes.String,
      index: true,
    },
    title: SchemaTypes.String,
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

export const FeedModel = mongoose.model<TFeedDto>('feeds', FeedSchema);

export type IFeedModel = Model<TFeedDto>;

export type TFeedModelInstance = HydratedDocument<TFeedDto>;
