module.exports = function(RED) {
  function BlynkSync(config) {
    RED.nodes.createNode(this, config);
    this.server = RED.nodes.getNode(config.server);
    this.pin = null;
    this.last = null;

    if(this.server) {
      this.server.on('connected', () => this.status({
        fill: 'green',
        shape: 'dot',
        text: 'connected'
      }));
      this.server.on('disconnected', () => this.status({
        fill: 'red',
        shape: 'ring',
        text: 'disconnected'
      }));
    } else {

    }
    this.on('input', (msg) => {
      if(msg.hasOwnProperty('payload')) {
        var pin = parseInt(msg.payload);
        this.server.blynk.syncVirtual(pin);
      } else {
        this.server.blynk.syncAll();
      }
    });
  }

  RED.nodes.registerType('blynk-sync', BlynkSync);
};