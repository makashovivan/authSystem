import {model, Schema, Types} from 'mongoose'

const schema = new Schema({
  email: {type: String, required: true, unique: true},
  password: {type: String, required: true},
  documents: [{type: Types.ObjectId, ref: 'Document'}],
})

export default model('User', schema)