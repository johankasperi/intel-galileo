var http = require('http'),
  	socketio = require('socket.io');
  	fs = require('fs'),
	mraa = require('mraa');

// Board pins and stuff
var ledPin = new mraa.Gpio(3);
ledPin.dir(mraa.DIR_OUT);
var analogPin = new mraa.Aio(1);

// Server
var server = http.createServer(function (req, res) {
	fs.readFile(__dirname + '/public/start.html', function(err, data) {
		if (err) {
			console.log(err);
			res.writeHead(500);
			return res.end('Error');
		}
		res.writeHead(200);
		res.end(data);
	});
}).listen(1337);

// Socket.io
var io = socketio.listen(server);
io.on('connection', function(socket){
	analogRead();
	socket.on('morse code', function(code){
	  blinkMorse(code, 0);
	});
});

// Functions for morse or analogread
function analogRead() {
	var analogValue = analogPin.read();
	if(analogValue < 500) {
		io.emit('theme note', 'b');
	}
	else {
		io.emit('theme note', 'a');
	}
	setTimeout(analogRead, 100);
}

function blinkMorse(code, i) {
	if(i == code.length) {
		return;
	}

  	var c = code.charAt(i);
	if(c === ".") {
		ledPin.write(1);
		setTimeout(function() {
			ledPin.write(0);
			setTimeout(function() {
				blinkMorse(code, i+1);
			}, 250);
		}, 250);
	}
	else if(c === "-") {
		ledPin.write(1);
		setTimeout(function() {
			ledPin.write(0);
			setTimeout(function() {
				blinkMorse(code, i+1);
			}, 250);
		}, 750);
	}
	else {
		blinkMorse(code, i+1);
	}
}

