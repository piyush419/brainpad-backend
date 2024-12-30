const express = require('express');
const router = express.Router();
const Note = require('../modals/Notes')
const verifyToken = require('../middleware/authMiddleware')

router.get('/', verifyToken , async(req,res)=>{
    try{
        const { page = 1, limit = 4 } = req.query;
        const skip = (page - 1) * limit;
        const userid = req.user.id
         const notes = await Note.find({userid}).skip(Number(skip)).limit(Number(limit))
         const total = await Note.countDocuments({userid});
         res.status(200).json({notes:notes, total:total})
    }catch(e){
        console.log("error fetching notes..",e)
        res.status(500).json({message:"Internal server Error"})
    }
})

router.post('/create',verifyToken, async(req,res)=>{
    try{
        const {title, content} = req.body

    if(!title || !content) {
         return res.status(400).json({message :"All field required"})
    }
   console.log(req)
    const userid = req.user.id
    const note = await Note.create({title, content,userid})
 
    return res.status(200).json({message:  "Note created Successfully"})
    }catch(e){
          console.log("error while posting notes", e)
          return res.status(500).json({message:"Internal server error"})
    }
})

router.delete('/delete/:id',verifyToken,async(req, res)=>{
   try{
    const notes_id = req.params.id
   const userid = req.user.id

   console.log(userid , notes_id)

   const note = await Note.findOne({_id:notes_id, userid})

   if(!note) return res.status(404).json({message:"Note Not Found"})

   await Note.findByIdAndDelete(notes_id)
   return res.status(200).json({message:"Note delete successfully"})
   
   }
   catch(e){
     console.log("Error while deleting a note", e)
     return res.status(500).json({message:"Internal server error"})
   }
})

router.put("/favourite", verifyToken, async(req,res)=>{
    
     try{
        const {notesId, isFav} = req.body;
        const userid = req.user.id
   
        if (typeof isFav !== 'boolean') {
            return res.status(400).json({ message: "'isFav' must be a boolean" });
          }           
       const note = await Note.findOne({_id:notesId , userid})
       if(!note) return res.status(404).json({message:"Note not found"})
   
       await Note.findByIdAndUpdate(notesId,{isFav:isFav})
       return res.status(200).json({message: isFav===true ? "Note is added to favourite" :"Note is removed successfully"})
     }
     catch(e){
        console.log("Error while add note to favourite", e)
        return res.status(500).json({message:"Internal server error"})
     }
})

router.get('/favourite', verifyToken , async(req,res)=>{
    try{
        const userid = req.user.id
         const notes = await Note.find({userid,isFav:true});
         console.log(notes)
         res.status(200).json({notes:notes})
    }catch(e){
        console.log("error fetching notes..",e)
        res.status(500).json({message:"Internal server Error"})
    }
})

module.exports = router;
