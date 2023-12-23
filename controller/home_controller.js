const Question = require('../model/question');
const Option = require('../model/options');
const { json } = require('express');

module.exports.home = function(req,res){

    res.render('home' , {title:'Home Page'});

}



//Add Question

module.exports.postQuestion= function(req,res){

 try {

    const addQuestion = Question.create(req.body);
    return  res.json({addQuestion, data:{"message": "Question Created Sucessfully!" }});
    
 } catch (error) {

    console.log(`THERE IS AN ${error}`);
    
 }

}


//Find Question
module.exports.findQuestionById = async function(req,res){
    try {
        const findById =await Question.findById(req.params.id);
       return res.json(findById.question );
        
    } catch (error) {
        console.log(`THERE IS AN ${error}`);
    }
}

//Delete Question

module.exports.deleteQuestion = async function(req,res){
    try {
       
       const question_id = req.params._id;

       const findOptions = await Option.find(question_id);
       console.log("findOptions " , findOptions);

       await Option.deleteMany(question_id);

        const deleteQuestion = await Question.findByIdAndDelete(req.params.id);
      
       
        deleteQuestion.save();
        return res.json("Question Deleted");
    } catch (error) {
        console.log(`THERE IS AN ${error}`);
    }
}

//Add A Option

module.exports.addOption = async function(req,res){

    try {

        const findQuestion= await Question.findById(req.params.id);

        console.log("findQuestion ",findQuestion);

        if(findQuestion){
            const addOption = await Option.create({
                options:req.body.options,
                votes:req.body.votes,
                question:req.params.id
            });


            //To add link_to_vote in addOption
            addOption.link_to_Vote = "http://localhost:8000/options/"+addOption.id+"/add_vote";
            addOption.save();
        
            //to Add option in the questions model's options array;
            findQuestion.options.push(addOption);
            findQuestion.save();

            console.log("Option added",addOption);

            res.json({addOption , data:{"Message" : "Options Added "}});
        }
        
    } catch (error) {
        console.log(`THERE IS AN ${error}`);
    }

}

//To view a questions and options

module.exports.viewQuestion = async function(req,res){

    try {

        const findQuestion = await Question.findById(req.params.id).populate('options');


        if(findQuestion){

            let data  ={
                'question' : findQuestion.question ,
               // 'options' : findQuestion.options.map(option => option.options)
               'options' : findQuestion.options

            }
                 res.json({"Message":"Question Found" , data });
        }
        else{
            res.json("No Question Found");
        }
        
    } catch (error) {
        console.log(`THERE IS AN ${error}`);
    }

}

//Add  Vote

module.exports.addVote= async function(req,res){
    try {
        const Vote = await Option.findByIdAndUpdate(req.params.id ,{$inc:{votes:1}},{new:true});

        if(Vote){
            // Option.save();
            res.json({Vote , "Message":"Vote Added !"})
        }

        
    } catch (error) {
        console.log(`THERE IS AN ${error}`);
    
    }
}

//Remove Option

module.exports.removeOption =async function(req,res){
    try {

        const findOption = await  Option.findById(req.params.id);

        if(!findOption){
            res.json("Option not Found");
           
        }
        else{
            const question_id = findOption.question ;

             await Option.findByIdAndDelete(req.params.id);
            // removeOpt.save();


            const findOptionfromQues = await Question.findById(question_id);
            console.log("findOptionfromQues ", findOptionfromQues);
        
          // Use pull instead of remove to remove the specific option from the array
               findOptionfromQues.options.pull(req.params.id);
               await findOptionfromQues.save();


               res.json(`Option deleted`);
           
        }
        
    } catch (error) {
        console.log(`THERE IS AN ${error}`);
    }
}