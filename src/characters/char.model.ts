import * as mongoose from 'mongoose'; 

export const characterSchema = new mongoose.Schema({
    name: {type: String, required: true},
    title: {type: [String], required: false},
    species: {type:[String], required: false}, 
    gender: {type: String, required: true}, 
    actor: {type: String, required: true},
    picture: {type: String, requred: true},  
})

export interface character extends mongoose.Document {
    id: string,
    name: string,
    title: Array<string>,
    species: Array<string>,
    gender: string, 
    actor: string,
    picture: string,
}