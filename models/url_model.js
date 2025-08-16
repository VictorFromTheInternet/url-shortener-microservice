import mongoose from 'mongoose'
const {Schema, model} = mongoose

export const urlsSchema = new Schema({
    original_url: {type: String, required: true, unique: true},     
    short_url: {type: Number, required: true, unique: true},
})


export default model('Urls', urlsSchema)