import {model, Schema, Types, Document} from 'mongoose'
import { IDocument } from './Document'


export interface IUser extends Document {
  email: string;
  password: string;
  documents: IDocument[];
}


const schema = new Schema({
  email: {type: String, required: true, unique: true},
  password: {type: String, required: true},
  documents: [{type: Types.ObjectId, ref: 'Document'}],
})

export default model<IUser>('User', schema)