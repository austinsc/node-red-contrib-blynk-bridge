module.exports = function(RED) {
  function BlynkReader(config) {
    RED.nodes.createNode(this, config);
    this.server = RED.nodes.getNode(config.server);
    this.pin = null;

    if(this.server) {
      this.pin = new this.server.blynk.VirtualPin(config.pin);
      this.pin.on('write', x => this.send({payload: x, pin: config.pin}));

      this.server.on('connected', () => this.status({
        fill: 'green',
        shape: 'dot',
        text: 'connected to pin V' + config.pin
      }));
      this.server.on('disconnected', () => this.status({
        fill: 'red',
        shape: 'ring',
        text: 'disconnected'
      }));

    } else {
      // No config node configured
    }
  }

  RED.nodes.registerType('blynk-reader', BlynkReader);
};