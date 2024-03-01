import mongoose, { Schema, SchemaTypes } from 'mongoose';

const FeedSchema = new Schema(
  {
    uuid: {
      type: SchemaTypes.UUID,
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

export const FeedModel = mongoose.model('feeds', FeedSchema);

export type IFeedModel = typeof FeedModel;
