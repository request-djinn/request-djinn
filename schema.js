import mongoose from 'mongoose';
const { Schema } = mongoose;

const requestSchema = new Schema({
  contentId : {
    type: Number,
    required: true,
    unique: true
  },
  allHeaders: {
    type: Array,
    required: true
  },
 body: {
    type: String, // is this JSON or just string?
    required: true
  }
});

//create model
const Request = mongoose.model('requests', requestSchema);

module.exports = Request;

// could all of the required ones go into a requiredHeaders attribute so we just reduce the size?
// binKey: {
//   type: String,
//   required: true,
//   unique: true
// },
// host: {
//   type: String,
//   required: true
// },
// fromIp: {
//   type: String,
//   required: true
// },
// requestMethod: {
//   type: String,
//   required: true
// },
// connection: {
//   type: String,
//   required: true
// },
// userAgent: {
//   type: String,
//   required: true
// },
// accept: {
//   type: String,
//   required: true
// },
// createdTime: {
//   type: Timestamp,
//   default: Date.now,
//   required: true
// },
// contentType: {
//   type: String,
//   required: true
// },