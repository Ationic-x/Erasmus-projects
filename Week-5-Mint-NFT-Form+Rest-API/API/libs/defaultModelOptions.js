'use strict'
module.exports = {
  // Mongoose will, by default, "minimize" schemas by removing empty objects.
  minimize: false,
  // The timestamps option tells mongoose to assign createdAt and updatedAt fields to your schema.
  timestamps: true,
  // If you set useNestedStrict to true, mongoose will use the child schema's strict option for casting updates.
  useNestedStrict: true,
  // Documents have a toObject method which converts the mongoose document into a plain JavaScript object.
  toObject: {
    transform: (doc, ret) => {
      delete ret._id
    }
  },
  // Exactly the same as the toObject option but only applies when the document's toJSON method is called.
  toJSON: {
    transform: (doc, ret) => {
      delete ret._id
      delete ret.__v
    }
  }
}
