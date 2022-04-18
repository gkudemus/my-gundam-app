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
            maxlength: [10000 , 'Description should not be more than 1000 characters']
        },
        armaments: {
            type: String,
            required: true,
            maxlength: [10000 , 'Armaments should not be more than 1000 characters']
        },
        equipment: {
            type: String,
            required: true,
            maxlength: [10000 , 'Equipment should not be more than 1000 characters']
        },
        history: {
            type: String,
            required: true,
            maxlength: [10000 , 'History should not be more than 1000 characters']
        },
        pilot: {
            type: String,
            required: true,
            maxlength: [10000 , 'Pilot should not be more than 1000 characters']
        }
    },
    {
        timestamps: true
    }
)

module.exports = mongoose.models.Note || mongoose.model('Note', NoteSchema )