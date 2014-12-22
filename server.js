/*Define dependencies.*/

var express = require('express');
var multer = require('multer');
var fs = require('fs');
var app = express();
var done = false;
var error = false;
var filePath;

/*Configure the multer.*/

app.use(multer({ dest: './uploads/', limits: { fileSize: 5000000 },
 rename: function (fieldname, filename) {
    return filename + Date.now();
  },
onFileUploadStart: function (file) {
  if (file.extension != 'jpg') {
    console.log('Error! ' + file.originalname + ' is not a jpg file!')
    error = true;
    return false;
  }
  console.log(file.originalname + ' is starting ...')
},
onFileUploadComplete: function (file) {
  filePath = file.path;
  console.log('File uploaded to: ' + file.path)
  done = true;
},
onFileSizeLimit: function (file) {
  console.log('Upload failed for: ', file.originalname)
  fs.unlink('./' + file.path) // delete the partially written file
  error = true;
  return false;
}
}));

/*Serving our uploaded images*/

app.use('/uploads', express.static(__dirname + '/uploads'));

/*Handling routes.*/

app.get('/',function(req,res){
  res.sendFile(__dirname + '/index.html');
});

app.post('/api/photo',function(req,res){
  if(done == true){
    done = false;
    res.end(filePath);
  }
  else if (error == true){
    error = false;
    res.end('Error');
  }
});

/*Run the server.*/
app.listen(3000,function(){
  console.log("Working on port 3000");
});
