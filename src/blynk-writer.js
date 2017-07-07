module.exports = function(RED) {
  function BlynkWriter(config) {
    RED.nodes.createNode(this, config);
    this.server = RED.nodes.getNode(config.server);
    this.pin = null;
    this.last = null;

    if(this.server) {
      this.pin = new this.server.blynk.VirtualPin(config.pin);
      this.pin.on('read', () => this.pin.write(this.last));

      this.server.blynk.on('connected', function(n) {
        this.status({
          fill: 'green',
          shape: 'dot',
          text: 'connected to pin V' + node.pin
        });
      });
      this.server.blynk.on('closed', function() {
        this.status({
          fill: 'red',
          shape: 'ring',
          text: 'disconnected'
        });
      });
    } else {
      // No config node configured
    }
    this.on('input', (msg) => {
      console.dir(msg);
      if(msg.hasOwnProperty('payload')) {
        this.last = msg.payload;
        this.pin.write(msg.payload);
      }
    });
  }

  RED.nodes.registerType('blynk-writer', BlynkWriter);
};