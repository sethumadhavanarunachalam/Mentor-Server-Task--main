import express from "express"
import { MentorSchema } from "../models/mentor.js";
import { StudentSchema } from "../models/student.js";
const router = express.Router();

router.post("/add",async(req,res)=>{
    try {
        const mentor = await new MentorSchema({
            name:req.body.name,
            email:req.body.email,
        }).save()

        res.status(201).json({message:"Mentor Data Added"})
    } catch (error) {
        res.status(500).json({message:"Internal server error"})
    }
    
})

router.get("/all",async(req,res)=>{
    try {
        const mentorsData = await MentorSchema.find({})

        res.send(mentorsData)
    } catch (error) {
        res.status(500).json({message:"Internal server error"})
    }
})
router.get("/students",async(req,res)=>{ // add a query to find students for particular mentor 
                                        // Without query u can see all mentor's Student array
    try {
        let menteesData;
        if(req.query){
            
             menteesData = await MentorSchema.find({name:req.query.name},{student:1})
        }
        else{ menteesData = await MentorSchema.find({},{name:1,student:1})}
        res.send(menteesData)
    } catch (error) {
        res.status(500).json({message:"Internal server error"})

    }
})

router.put("/addstudent",async(req,res)=>{
    let studentToAdd = req.body.students
    let currentMentor = req.body.mentor
    try {
        for(let i=0;i<studentToAdd.length;i++){

            const studEdit = await StudentSchema.updateOne({name:studentToAdd[i]},{$set:{mentor:currentMentor}})
            const edit = await MentorSchema.updateOne({name:currentMentor},{$push:{student:studentToAdd[i]}})
            
        }
        
        res.status(204).json({"message":"Students added"});
    } catch (error) {
        console.log(error);
        res.status(500).json({message:"Internal server error"})

    }
})


export const mentorRouter = router
