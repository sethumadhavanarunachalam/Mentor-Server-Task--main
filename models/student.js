import mongoose from "mongoose";

const studentSchema = new mongoose.Schema(
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
        mentor:{
            type:String,
            default:""
        }
    }
)

const StudentSchema = mongoose.model("student",studentSchema)
export {StudentSchema}