const mongoose=require('mongoose')
const uri = "mongodb+srv://adnankhanskipq:adnankskipq@cluster0.gkf26ri.mongodb.net/?retryWrites=true&w=majority";

const coonectToMongo=()=>{
    mongoose.connect(uri,console.log('connected'))
}

module.exports=coonectToMongo