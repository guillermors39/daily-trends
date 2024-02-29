import mongoose, { Schema } from 'mongoose';

const FeedSchema = new Schema(
  {
    uuid: String,
    title: String,
    subtitle: String,
    authors: Array,
    date: Date,
    location: String,
    source: {
      code: String,
      url: String,
    },
  },
  {
    timestamps: true,
  },
);

export const FeedModel = mongoose.model('feeds', FeedSchema);
