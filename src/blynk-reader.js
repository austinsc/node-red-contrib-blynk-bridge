module.exports = function(RED) {
  function BlynkReader(config) {
    RED.nodes.createNode(this, config);
    this.server = RED.nodes.getNode(config.server);
    this.pin = null;

    if(this.server) {
      this.pin = new this.server.blynk.VirtualPin(config.pin);
      this.pin.on('write', x => console.log('Received: ' + x));
    } else {
      // No config node configured
    }
  }

  RED.nodes.registerType('blynk-reader', BlynkReader);
};