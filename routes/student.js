import express from "express";
import { MentorSchema } from "../models/mentor.js";
import { StudentSchema } from "../models/student.js";

const router = express.Router();

router.post("/add",async(req,res)=>{
    try {
        const student = await new StudentSchema({
            name:req.body.name,
            email:req.body.email,
        }).save()

        res.status(201).json({message:"Student Data Added"})
    } catch (error) {
        console.log(error)
        res.status(500).json({message:"Internal server error <or> E-mail may already exist"})
    }
    
})
router.get("/all",async(req,res)=>{
    try {
        const studentsData = await StudentSchema.find({})

        res.send(studentsData)
    } catch (error) {
        res.status(500).json({message:"Internal server error"})
    }
})

router.get("/mentorless",async(req,res)=>{
    try {
        const studentsData = await StudentSchema.find({mentor:""})

        res.send(studentsData)
    } catch (error) {
        res.status(500).json({message:"Internal server error"})
    }
})

router.put("/mentor",async(req,res)=>{
    try {
        const assigntoMentor = await MentorSchema.updateOne({name:req.body.mentor},{$push:{student:req.body.student}})
        const assignOrEditMentor = await StudentSchema.updateOne({name:req.body.student},{$set:{mentor:req.body.mentor}})

        res.status(204).json({message:"Successfuly assigned a mentor"})
    } catch (error) {
        console.log(error)
        res.status(500).json({message:"Internal server error"})
    }
})

export const studentRouter = router;