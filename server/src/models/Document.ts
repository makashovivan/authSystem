import {model, Schema, Types, Document} from 'mongoose'
import { IUser } from './User'

export interface IDocument extends Document {
  title: string,
  text: string,
  date?: Date,
  owner: IUser['_id']
}

const schema = new Schema({
  title: {type: String, required: true},
  text: {type: String, required: true},
  date: {type: Date, default: Date.now},
  owner: {type: Types.ObjectId, ref: 'User'},
})

export default model<IDocument>('Document', schema)  