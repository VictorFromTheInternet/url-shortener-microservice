import mongoose from 'mongoose'
const {Schema, model} = mongoose

export const urlsSchema = new Schema({
    main_url: {type: String, required: true},
    increment: {type: String, required: true, unique: true},    
})


export default model('Urls', urlsSchema)