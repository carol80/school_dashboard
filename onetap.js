const http = require('http');
const express = require('express');
const session = require('express-session');
const bodyParser = require('body-parser');
const mongoose = require('mongoose')
require('mongoose-type-url');
const Saturday = require('./models/saturday.js')
var {PythonShell} = require("python-shell"); 
const accountSid = 'ACadddd9627c452e644c45d12f4ce57b33';
const authToken = '6dbb0e06ae243bc0f7026819af885730';
const client = require('twilio')(accountSid, authToken);
const MessagingResponse = require('twilio').twiml.MessagingResponse;


const app = express();

app.use(bodyParser.urlencoded({ extended: false }));

//CONNECT TO DB
mongoose.connect("mongodb+srv://amurto:tsec@tsec-nie5s.mongodb.net/test?retryWrites=true&w=majority", { useNewUrlParser: true, useUnifiedTopology: true }).then(() => {
  console.log("connected to db");
})

app.use(session({secret: 'anything-you-want-but-keep-secret'}));


//global variable//

var opt = 999                                     
var reg = 999
var registration = 999
var d = new Date();
var day = d.getDay();


app.get('/', async(req, res, next) => {
  let saturdays;
  try {
      saturdays = await Saturday.find({})
      console.log(saturdays)
  } catch (err) {
      const error = new HttpError(
          'Fetching users failed, please try again later.',
          500
      );
      return next(error);
  }
  res.json(saturdays);
})



app.post('/sms', async (req, res) => {
  const twiml = new MessagingResponse();
  // const smsCount = req.session.counter || 0;
  // let message = 'Hello, thanks for the new message.';
  // if(smsCount > 0) {
  //   message = 'Hello, thanks for message number ' + (smsCount + 1);
  // }
  // req.session.counter = smsCount + 1;
  // const twiml = new MessagingResponse();
  // twiml.message(message);

  
  // const message = twiml.message();
  // message.body('The Robots are coming! Head for the hills!');
  // message.media('https://farm8.staticflickr.com/7090/6941316406_80b4d6d50e_z_d.jpg');


  let counter = req.session.counter || 0
  var message = 'Hello, thanks for the new message.';
  const text = req.body.Body
  const xxx = req.body.From
    
  //  var x = await User.find().distinct('phone')
  //  console.log(typeof xxx);

  //  var registration = 1;
  //  if(x.includes(xxx)){
  //   registration = 0;
  //   }


  // function add_user(text) {
  //   let obj = (text.split('\n'))
  //   let obj1 = []
  //   for(var i=0;i<4;i++){
  //     obj1.push(obj[i].split(':')[1])
  //   }
// 
  //   const user = new User({
  //     name : obj1[0],
  //     email : obj1[1],
  //     password : obj1[2],
  //     phone : req.body.From,
  //     address : obj1[3],
  //     image : req.body.MediaUrl
  //   });
  //   return user;
  // }

    // if (registration == 0){  
    //       if (text == 'Hello' || text == 'Hi' || text == 'Hey' || text == 'Heyy') {
    //         message = `Today is ${day}`;
    //     } else if(text == 'REGISTER'){
    //         reg = counter+1;
    //         message = 'Pleae fill the form below:\n\nName :\nEmail:(optional)\nPassword:\nAddress:\n\nAnd send athe user image to build the profile(Optional)'
    //     } else if (reg == counter ){
    //         // code to add it to the database
    //         reg = 999
    //         let user = add_user(text)

    //         try{
    //             user.save()
    //             registration = 0;
    //             message = 'User sucessfully registered!!';
    //         } catch (err) {
    //         message = 'Failed to Sign up!! Please fill all the details in the form';
    //         }
    //     }
    // } else if(registration == 1 ){

      // if the day is tuesday!! day == 2
          if (text == 'Hello' || text == 'Hi' || text == 'Hey' || text == 'Heyy' || text == 'OPTIONS' || text == "Options")  {
            
            message = 'Type the following text to perform the corresponding operations:\n\nNOTIFY :\nTo notify all the volunteers about any particular urgent message!!\n\nLEAVE :\nTo send all the volunteers the Saturday Register\n\nSCHEDULE :\nTo send all the college representatives the schedule the Saturday Lectures';
          } else if (text == 'Notify' || text == 'NOTIFY') {
            //notification
            opt = counter+1
            message = 'Enter the Urgent Notice:';
          } else if (text == 'LEAVE' || text == 'Leave') {
            
            vol = await Saturday.find().distinct('college_rep')

            for (var i=0; i < vol.length ;i++){
              var result = "https://forms.gle/kuaXkCD2Ve7Nu8wL7";
              client.messages
                .create({
                  from: 'whatsapp:+14155238886',
                  body: `If you are not free for the lecture on coming saturday, then please click on the link below and fill the following leave application\n\nLink: ${result}`,
                  to: 'whatsapp:' + String(vol[i])
                })
                .then(message => console.log(message.sid));
            }
            message = "Saturday Register form with the google-form link sent to all the facilitators!! Type OPTIONS to see the Main-Menu!!";
          } else if (text == 'SCHEDULE' || text == 'Schedule') {
            

            let saturdays;
  
            saturdays = await Saturday.find({})

            for (var i=0; i < saturdays.length ;i++){
              var schools = [];
              schools.push(saturdays[i].college)
              client.messages
                .create({
                  from: 'whatsapp:+14155238886',
                  body: `*Updates for TAP clubs this Saturday*\n\n_CODING_ :\n${saturdays[i].coding_mem[0]} - ${saturdays[i].coding_num[0]}\n${saturdays[i].coding_mem[1]} - ${saturdays[i].coding_num[1]}\n\n_DANCE_ :\n${saturdays[i].dance_mem[0]} - ${saturdays[i].dance_num[0]}\n${saturdays[i].dance_mem[1]} - ${saturdays[i].dance_num[1]}\n\n_DRAMA_ :\n${saturdays[i].drama_mem[0]} - ${saturdays[i].drama_num[0]}\n${saturdays[i].drama_mem[1]} - ${saturdays[i].drama_num[1]}\n\n*Team*, please ensure that you are *in school by 07:55am* so that opening huddle can start at 08:00am.`,
                  to: 'whatsapp:' + String(saturdays[i].college_rep)
                })
                // .then(message => console.log(message.sid));
            }
            message = `Schedules for the schools: ${String(schools)} \nsent to the college representative`;

          } else if (text == 'Bye' || text == 'Tata') {
            
            message = 'Goodbye';
          } else if ( opt == counter) {
            // code to add it to the database
            opt = 999
            
            vol = await Saturday.find().distinct('college_rep')

            for (var i=0; i < vol.length ;i++){
              client.messages
                .create({
                  from: 'whatsapp:+14155238886',
                  body: `Urgent Notice from the TAP:\n\n ${text}`,
                  to: 'whatsapp:' + String(vol[i])
                })
                .then(message => console.log(message.sid));
            }

            message = `All the volunteers are notified with the following message:\n ${text}`;        
          } else {

            // var options = {
            //   mode: 'text',
            //   encoding: 'utf8',
            //   pythonOptions: ['-u'],
            //   scriptPath: './',
            //   args: [text,xxx],
            //   pythonPath: 'C:/Python/Python38/python.exe'
            // };
          
            // PythonShell.run('utils.py', options, function (err, mess) {
            //   if (err) throw err;
            //   // results is an array consisting of messages collected during execution
            //   console.log(mess);            
            // })


            // console.log(message);

            // reply = fetch_reply(msg, phone_no)
            message = "SORRY!! DID'NT GET YOU!!";
          }
    // }

  // req.session.counter = counter + 1;
  // twiml.message(message)

  // res.writeHead(200, {'Content-Type': 'text/xml'});
  // res.end(twiml.toString());
});

http.createServer(app).listen(3000, () => {
  console.log('Express server listening on port 3000');
});
