const mongoose = require('mongoose')

const NoteSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, 'Please add a title'],
        unique: true,
        trim: true,
        maxlength: [40, 'Title should not be more than 40 characters']
    },
    description: {
        type: String,
        required: true,
        maxlength: [1000 , 'Title should not be more than 1000 characters']
    }
})

module.exports = mongoose.models.Note || mongoose.model('Note', NoteSchema)