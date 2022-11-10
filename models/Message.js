import { Schema, model, models } from 'mongoose';

const messageScema = new Schema(
  {
    uid: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      max: 500,
    },
    upvotes: {
      type: Array,
      default: [],
    },
    downvotes: {
      type: Array,
      default: [],

    },
  },
  { timestamps: true }
);

export default models.Message || model('Message', messageScema);
