# intel-galileo
Some demos of the Intel Galileo for the course INFO490 at UIUC.

# Board connections
The board connections used in this demo are a combination of the connections below.

Blink LED: https://communities.intel.com/docs/DOC-22427 (connect to pin 3)

Photo resistor: https://communities.intel.com/docs/DOC-22438 (connect to analog input 1, AI 1)

# Dependencies
Node.js, socket.io, mraa

# Install
1. Clone the repo
```bash
git clone https://github.com/johankasperi/intel-galileo.git
```

2. Get dependencies
```bash
npm install
```

3. Run
```bash
node app.js
```

Go to 192.168.10.104:1337 (change the IP to your boards no).