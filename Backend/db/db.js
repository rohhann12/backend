const mongoose=require("mongoose")
mongoose.connect('mongodb+srv://rohann:rohan@cluster0.xvl6xp0.mongodb.net/')

const UserSchema = new mongoose.Schema({
    name:String,
    username: String,
    password:String,
    token: String,
});


const BmiSchema = new mongoose.Schema({
    Time:Date,
    weight:Number,
    height:Number,
    bmiValue:Number
});
const StepCountSchema = new mongoose.Schema({
    userId: String ,
    stepCount:  Number, 
    recordedAt: Date,  
  })

const StepCount = mongoose.model("StepCount", StepCountSchema);
const BMI = mongoose.model('BMI', BmiSchema);
const User = mongoose.model('User', UserSchema);

module.exports = {
    User,
    BMI,
    StepCount
}
