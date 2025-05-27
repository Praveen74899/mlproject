const mongoose = require('mongoose');
const { string } = require('yup');

const projectSchema = new mongoose.Schema({

    projectName:{
        type:String,
        require:true,
        uniqued:true
    },
    projectType:{
         type:String,
         required:true
    },
    category:{
        type:String,
        required:true
    },
    hours:{
        type:Number,
        required:true
    },
    dateReceived:{
        type:Date,
        required:true
    },
    dateDelivered:{
        type:Date,
        required:true
    },
    contactPerson:{
        type:String,
        required:true
    },
    endClient:{
        type:String,
        required:true
    }
});
const Project = mongoose.model('Project', projectSchema);

module.exports = Project;

