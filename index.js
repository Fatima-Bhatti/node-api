const Joi = require('joi');
const express = require('express');
const app=express();
//const bodyParser= require('body-parser');

app.use(express.json()); //use that piece of middleware during process 



const courses = [
    { id:1 , name:'Course1'},
    { id:2 , name:'Course2'},
    { id:3 , name:'Course3'}
];

//show response
app.get('/', (req,res)=>{
    res.send("Hello World")
});

//Data on web
 app.get('/api/courses', (req,res)=>{
    res.send(courses)
//res.send(["Database", "OOP", "Automation"])
});

//Fetch data for 1 id
app.get('/api/courses/:id', (req,res)=>{
 const course = courses.find(c => c.id === parseInt(req.params.id));
 if(!course) res.status(404).send('The course with given id is not available');
 res.send(course);    
 });

//Use Post

/**
 * # Post
 * Apply schema and Joi package for validation on name
 */
 app.post('/api/courses', (req, res)=>{
    const {error} = validateCourse(req.body);
    
    if(error) return res.status(400).send(result.error.details[0].message);
        
    const course={
    id : courses.length+1,
    name : req.body.name
    }
   courses.push(course);// new courses push in the array
   res.send(course);
   });

/**
 * #PUT - for Update course
 */
 
 app.put('/api/courses/:id', (req,res)=>{
    //Look up for the Course
    //If not available, return 404
    const course = courses.find(c => c.id === parseInt(req.params.id));
    if(!course) res.status(404).send('The course with given id is not available');
   
    //Validate
    //If invalid, return 400-bad request

    const {error} = validateCourse(req.body);
    if(error) return res.status(400).send(error.details[0].message);
 
    course.name=req.body.name;
    res.send(course);
});

/**
 * 
 * # DELETE - to delete specific data 
 */

app.delete('/api/courses/:id', (req,res)=>{
//Look up for the Course
//If not available, return 404
    const course = courses.find(c => c.id === parseInt(req.params.id));
    if(!course) res.status(404).send('The course with given id is not available');  
 
    //DELETE
    const index = courses.indexOf(course);
    courses.splice(index, 1);

    res.send(course);
})

/**
 * 
 * Function
 */
  function validateCourse(course){
    const schema = Joi.object ({  
        name : Joi.string().min(3).required()
    });
 
    return schema.validate(course);
}
 
//Multiple Parameters
app.get('/api/posts/:year/:month', (req,res)=>{
    res.send(req.params)
});

//Query string Parameters
app.get('/api/posts/:year/:month', (req,res)=>{
    res.send(req.query)
});

//Environment Variable
const port = process.env.PORT || 3000;

app.listen(port, ()=>{
    console.log(`Listening done on port ${port}`)
})