const Blynk = require('blynk-library');

module.exports = function(RED) {
  function BlynkController(config) {
    RED.nodes.createNode(this, config);

    this.server = config.server;
    this.port = config.port;
    this.token = config.token;
    this.blynk = new Blynk.Blynk(this.token, {
      connector: new Blynk.TcpClient({addr: this.server, port: this.port})
    });

    this.blynk.on('connect', () => {
      this.log(RED._('Blynk Connected: ') + this.server + ':' + this.port);
      this.emit('connected');
    });
    this.blynk.on('disconnect', () => {
      this.log('Blynk Disconnected');
      this.emit('closed');
    });
  }

  RED.nodes.registerType('blynk-controller', BlynkController);
};