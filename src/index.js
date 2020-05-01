const http = require ('http');
const path = require ('path');

const express = require ('express');
const socketio = require ('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketio.listen(server);

//config
app.set('port', process.env.PORT || 3000);

require('./sockets')(io);



//archivos estaticos
app.use(express.static(path.join(__dirname, 'public')));

//iniciando el servidor
server.listen(app.get('port'), () => {
	console.log('server on port', app.get('port'));
});