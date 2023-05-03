const mongoose=require('mongoose')


const coonectToMongo=()=>{
    mongoose.connect(uri,console.log('connected'))
}

module.exports=coonectToMongo