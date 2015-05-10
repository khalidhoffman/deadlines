var mongoose = require('mongoose'),
    http = require("http");

//var fs = require('fs'),
//    index = fs.readFileSync('index.html');

var username = '***REMOVED***';
var password = '***REMOVED***';

mongoose.connect('mongodb://'+username+':'+password+'@***REMOVED***');

var db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));

db.once('open', function (callback) {
    console.log('successfully connected.');
});

var TaskSchema = new mongoose.Schema({
    id : String,
    name: String,
    dueDate: {type: Date, default: Date.now},
    notes: String,
    comments: [
        {
            body: String,
            author: String,
            postTime: {type: Date, default: Date.now}
        }
    ]
});

var Task = mongoose.model('Task', TaskSchema, 'Deadlines');

http.createServer(function(request,response){
    var urlArray  = request.url.split('/'),
        op = urlArray[(urlArray.length-1)];

    //console.log('request: ',request);
    console.log('method:'+request.method);
    //console.log('url:'+ URLParser.parse(request.url));
    //console.log('headers: ', request.headers);
    //request.on('close',function(){
    //    console.log('close.trailers:', request.trailers);
    //});

    request.on('data', function(data) {
        //if (data.name){
        //    console.log(op, data);
        //} else{
        switch(request.method){
            case 'DELETE':
                var deletedTask = JSON.parse(data);
                Task.remove({
                    id : deletedTask.id
                }, function (err) {
                    if (err){
                        console.log('Failed to remove task:', err);
                    } else{
                        console.log('Successfully removed task');
                    }
                    response.end();
                });
                break;
            case 'PUT':
            case 'POST':
                var taskData = JSON.parse(data);
                var newTask = new Task(taskData);
                Task.findOneAndUpdate(
                    { id: taskData.id},
                    {
                        name: taskData.name,
                        dueDate: taskData.dueDate,
                        notes: taskData.notes,
                        comments: taskData.comments
                    },
                    {
                        upsert: true
                    }, function (err) {
                        if (err){
                            console.log('Failed to update task:', err);
                        } else{
                            console.log('Successfully updated task');
                        }
                        response.end();
                    });

                break;
            default:
                console.log('invalid method');
                response.end();
                break;
        }
    });

    response.statusCode = 200;
    //response.setHeader("Content-Type", "text/html");
    response.setHeader('Access-Control-Allow-Origin', '*');
    response.setHeader('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
    response.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With');
    response.setHeader('Cache-Control', 'no-cache');

    switch(request.method){
        case 'GET':
            // send collection json

            response.setHeader('Content-Type', 'application/json');
            Task.find({}, function (err, docs) {
                if (err){
                    console.log(err);
                    return;
                }
                response.end(JSON.stringify(docs));
            });
            break;
        default:

            //console.log(op[(op.length-1)]);
            response.setHeader('Content-Type', 'text/plain');
            response.write('Operation: invalid\n');
            //console.log('Operation: invalid: '+op);
            //console.log('trailers:', request.trailers);
            response.end();
            break;
    }
}).listen(process.env.PORT || 5000);