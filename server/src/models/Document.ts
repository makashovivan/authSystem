import {model, Schema, Types} from 'mongoose'

const schema = new Schema({
  title: {type: String, required: true},
  text: {type: String, required: true},
  date: {type: Date, default: Date.now},
  owner: {type: Types.ObjectId, ref: 'User'},
})

export default model('Document', schema)  