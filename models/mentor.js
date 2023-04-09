import mongoose from "mongoose";

const mentorSchema = new mongoose.Schema(
    {
        name:{
            type:String,
            required:true,
            maxlength:32,
            trim:true
        },
        email:{
            type:String,
            required:true,
            unique:true,
            trim:true
        },
        student:{
            type:Array,
            default:[]
        }
    }
)

const MentorSchema = mongoose.model("mentor",mentorSchema)
export {MentorSchema}