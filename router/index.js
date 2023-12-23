const express = require('express');
const router = express.Router();
const home_Controller = require('../controller/home_controller');

router.post('/postQuestion',home_Controller.postQuestion);

router.get('/:id' ,home_Controller.findQuestionById);

router.post('/delete/:id' , home_Controller.deleteQuestion);

//View questions and options as well 
router.get('/questions/:id' , home_Controller.viewQuestion);



//For Adding Options

router.post('/:id/createOption' , home_Controller.addOption);


//Route to options page
router.use('/options' , require('./options'));

// //Add Vote
// router.post('/options/:id/add_vote' , home_Controller.addVote);

// //For deleting Options
// router.post('/options/:id/deleteOption' , home_Controller.removeOption);



//Exporting this in main index.js file
module.exports = router;

