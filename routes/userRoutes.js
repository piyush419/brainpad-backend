const express = require('express')
const verifyToken = require('../middleware/authMiddleware')
const User = require('../modals/User')
const router = express.Router()


router.get('/profile',verifyToken,async(req,res)=>{
     try{
    console.log("hey")
        const id = req.user.id

        const user = await User.findById(id)

        if(!user) return res.status(404).json({message:"User not found"})
        
        return res.status(200).json({user})
     }
     catch(e){
        console.log("error fecthing user ...", e)
        res.status(500).json({message:"internal server error"})
     }
})

module.exports = router