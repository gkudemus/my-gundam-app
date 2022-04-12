import dbConnect from "../../../utils/dbConnect"
import note from "../../../models/note"

dbConnect()

export default async (req, res) => {
    const {
        query: { id },
        method 
    } = req
    
    switch(method) {
        case 'GET':
            try {
                const notes = await note.findById(id)
                if(!notes) {
                    res.status(400).json({success: false})
                }
                res.status(200).json({success: true, data: notes})
            } catch (error) {
                res.status(400).json({success: false})
            }
            break
        case 'PUT':
            try {
                const notes = await note.findByIdAndUpdate(id, req.body, {
                     new: true,
                     runValidators: true
                })

                if(!notes) {
                    res.status(400).json({success: false})
                }
                
                res.status(200).json({success: true, data: notes})
            } catch (error) {
                res.status(400).json({success: false})
            }
            break
        case 'DELETE':
            try {
                const deletedNote = await note.deleteOne({ _id: id})
                if(!deletedNote) {
                    return res.status(400).json({success: false})
                }
                res.status(200).json({success: true, data: {} })
            } catch (error) {
                res.status(400).json({success: false})
            }
            break
        default:
            res.status(400).json({success: false})
            break;
    }
}