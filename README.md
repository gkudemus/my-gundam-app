This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

screens:
![image](https://user-images.githubusercontent.com/6787094/162889921-3f095827-0eb4-41b3-a0c6-1c3ac54d8442.png)
![image](https://user-images.githubusercontent.com/6787094/162890003-d80215bf-80f7-4e5c-bd70-004737e7e72f.png)
![image](https://user-images.githubusercontent.com/6787094/162890095-1642ce18-2f21-4220-947a-bcee1af6da43.png)
![image](https://user-images.githubusercontent.com/6787094/162890215-517d8fbd-8458-4ffd-990b-24c745345748.png)

## Getting Started

Gundam Mecha App

stack used:
NextJS Typescript (FE)
MongoDB Atlas (database)

MongoDB Atlas set up
step 1: If you're a first timer, you can create a MongoDB atlas account, it's for free.
step 2: create a cluster, it's pretty straight forward, use the region closest to you, in my case, I just used AWS - singapore, then go ahead and create cluster
step 3: set up network access, click add IP address, click 'allow access from anywhere' tab, click confirm
step 4: go to database access, add new database user, 

NEXTJS setup

step 1: in your IDE (vscode), type npx create-next-app <name of your app> --typescript in the vscode terminal, make sure you're executing this command in the directory where you choose for your nextjs app. Make sure it's a clean empty folder. After that's done, navigate to your project directory by typing cd <name of your app>. To check if your nextjs setup is all good, execute the command 'npm run dev' or 'yarn dev'

step 2: install mongoose package into your project by typing 'npm i mongoose'
step 3: create a new folder 'models', then inside, create a file <name of your model file>.js, code inside would contain this snippet:
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

// note: here the schema contains two string elements; title and description. You can add more if you wish.

step 4: in the next.config.js file, it must contain this snippet:

/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    MONGO_URI: "mongodb+srv://gkudemus:ugnOl6AkYEIjvYvq@cluster0.51oul.mongodb.net/gundamDB?retryWrites=true&w=majority",
    NEXT_PUBLIC_REALM_APP_ID: "application-0-yfoxz"
  }
}

module.exports = nextConfig

// note: MONGO_UR contains your connection string which can be found in the mongodb atlas app (Clusters (go to your cluster) -> Connect -> Connect your application -> Connection String only tab, then copy your connection string

step 5: create folder 'utils' and inside, create a file called 'dbConnect.js'. dbConnect.js will contain a function to connect your app to your mongodb atlas cluster db.

step 6: set up logic of your GET, PUT, DELETE methods inside your api folder. Note that nextjs has file-base routing, since our api route is /api/notes,
under the api folder, just create another file called 'notes', then inside create a js file called index.js. There you'll put the logic for your http requests.

import dbConnect from "../../../utils/dbConnect"
import note from "../../../models/note"

dbConnect()

export default async (req, res) => {
    const { method } = req
    
    switch(method) {
        case 'GET':
            try {
                const notes = await note.find({})
                res.status(200).json({success: true, data: notes})
            } catch (error) {
                res.status(400).json({success: false})
            }
            break
        case 'POST':
            try {
                const notes = await note.create(req.body)
                res.status(201).json({success: true, data: notes})
            } catch (error) {
                res.status(400).json({success: false})
            }
            break
        default:
            res.status(400).json({success: false})
            break;
    }
}
