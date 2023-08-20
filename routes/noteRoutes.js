const express= require('express');
const { NoteModel } = require('../models/noteModel');
const { auth } = require('../middlewares/auth.middleware');

const noteRouter=express.Router();

noteRouter.post('/create',auth,async(req, res) => {
try {
    const note= new NoteModel(req.body)
    await note.save()
    res.send({msg:"A new note created"})

} catch (error) {
    res.send({msg: error.message});
}
})


// reading the notes
noteRouter.get('/',auth,async(req, res) => {
    try {
        // get all the notes 
        // const notes= await NoteModel.find() 

        // only get the notes created by the user
        const notes= await NoteModel.find({userID:req.body.userID}) 

        res.send(notes)
    } catch (error) {
        res.send({msg: error.message});
    }
    })


    // update the notes

    noteRouter.patch('/update/:noteID',auth,async(req, res) => {
const {noteID}=req.params
const note=await NoteModel.findOne({_id:noteID})
        try {
            if(req.body.userID !==note.userID) {
            res.send({msg:"You are not authorized"})
            }else{
                await NoteModel.findByIdAndUpdate({_id:noteID},req.body)

            res.send({msg:"note with id " +noteID+ " has been updated"})
            }
        
        } catch (error) {
            res.status(400).send({msg: error.message});
        }
        })

    noteRouter.delete('/delete/:noteID',auth,async(req, res) => {
        const {noteID}=req.params
        const note=await NoteModel.findOne({_id:noteID})
     try {

            if(req.body.userID !==note.userID) {
                    res.send({msg:"You are not authorized"})
            }else{

               await NoteModel.findByIdAndDelete({_id:noteID})
                res.send({msg:"note with id " +noteID+ " has been deleted"})
            }
        } catch (error) {
                res.status(400).send({msg: error.message});
            }
            })
        



module.exports ={
    noteRouter
}
