const fs = require('fs');
const http = require('http');
const os = require('os');



const hostname = '10.1.1.4';
const port = 8000;

const info = "Architecture : "+os.arch()+"<br>Hostname : "+os.hostname()+"<br>Platform : "+os.platform()+"<br>OS Type : "+os.type();

const server = http.createServer((req, res) => 
{    
   const chat=fs.readFileSync('./templates/chat.html');
   const pic=fs.readFileSync('./static/serverImages/user.png');
   const chat_css=fs.readFileSync('./static/css/chat.css');
   
   var ip = (req.headers['x-forwarded-for'] || '').split(',').pop().trim() ||  req.connection.remoteAddress ||   req.socket.remoteAddress || 
         req.connection.socket.remoteAddress
   
   let date_ob = new Date();
   
   let date = ("0" + date_ob.getDate()).slice(-2);
   let month = ("0" + (date_ob.getMonth() + 1)).slice(-2);
   let year = date_ob.getFullYear();
   
   let hours = date_ob.getHours();
   let minutes = date_ob.getMinutes();
   let seconds = date_ob.getSeconds();
   
   let time = "["+year + "-" + month + "-" + date + " " + hours + ":" + minutes + ":" + seconds+"]";


   console.log(time+" | IP : "+ip+" => "+req.method+":"+req.url);
   
   if(req.method == 'GET'){
   if(req.url == '/chat' || req.url == '/chat/' || req.url == '/chat.html')
   {
    res.statusCode = 200;
    res.statusMessage="OK"
    res.setHeader('Server', 'KaliServer');
    res.setHeader('Content-Type', 'text/html');
    res.end(chat);
   }
   else if(req.url == '/' || req.url == '/home' || req.url == '/home/' || req.url == '/home.html')
   {
    res.statusCode = 200;
    res.statusMessage="OK"
    res.setHeader('Server', 'KaliServer');
    res.setHeader('Content-Type', 'text/html');
    res.end("<h1>HOME PAGE OF CHAT API</h1>");
   }
   else if(req.url == '/chat.css')
   {
   res.statusCode = 200;
    res.statusMessage="OK"
    res.setHeader('Server', 'KaliServer');
    res.setHeader('Content-Type', 'text/css');
    res.end(chat_css);
   }
   else if(req.url == '/user.png')
   {
   res.statusCode = 200;
    res.statusMessage="OK"
    res.setHeader('Server', 'KaliServer');
    res.setHeader('Content-Type', 'image/png');
    res.end(pic);
   }
   else
   {
    res.statusCode = 404;
    res.statusMessage="Page Not Found"
    res.setHeader('Server', 'KaliServer');
    res.setHeader('Content-Type', 'text/html');
    res.end(`<h1>No Page Found</h1> <br>${req.url} is not available at www.kalihackz.tech`);
   }
   }
   
});

server.listen(port, hostname, () => 
{
  console.log(`Server running at http://${hostname}:${port}/ \nOS Type : ${os.type()}\nArchitecture : ${os.arch()}`);
});
