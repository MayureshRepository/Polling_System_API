const express = require('express');
const router = express.Router();
const home_Controller = require('../controller/home_controller');



//Add Vote
router.post('/:id/add_vote' , home_Controller.addVote);

//For deleting Options
router.post('/:id/deleteOption' , home_Controller.removeOption);




//Exporting this in main index.js file
module.exports = router;

