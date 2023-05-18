import * as mongoose from 'mongoose'; 

export const speciesSchema = new mongoose.Schema({
    name: {type: String, required: true},
    status:{type: String, required: false},
    description: {type: String, required: true},
    picture: {type: String, requred: false},  
})

export interface species extends mongoose.Document {
    id: string,
    name: string,
    status: string,
    description: string,
    picture: string,
}
