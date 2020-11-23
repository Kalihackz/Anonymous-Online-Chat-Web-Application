const io=require("socket.io")(7500);
const users={};

io.on('connection',socket=>
{
  socket.on('new-user-joined',name=>
  {
    users[socket.id]=name;
    io.emit('online-',Object.keys(io.sockets.connected).length)
    socket.broadcast.emit('user-joined',name);
    console.log(`${name}--${socket.id} joined server`);
    console.log(`${Object.keys(io.sockets.connected).length} clients connected`);
  });
  
  socket.on('send',message=>
  {
    console.log(`${users[socket.id]}'s MESSAGE = ${message}`);
    socket.broadcast.emit('receive',{message:message , name:users[socket.id]});
  });  
   
   
  socket.on('disconnect',message=>
  {
    socket.broadcast.emit('left',users[socket.id]);
    console.log(`${users[socket.id]}--${socket.id} left server`);
    io.emit('online-',Object.keys(io.sockets.connected).length)
    delete users[socket.id];
    console.log(`${Object.keys(io.sockets.connected).length} clients connected`);
  }); 
    
});
