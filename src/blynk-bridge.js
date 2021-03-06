module.exports = function(RED) {
  function BlynkBridge(config) {
    RED.nodes.createNode(this, config);
    this.server = RED.nodes.getNode(config.server);
    this.token = config.token;
    this.bridgePin = config.bridgePin;
    this.pin = config.pin;
    this.bridge = null;

    if(this.server) {
      this.bridge = new this.server.blynk.WidgetBridge(this.bridgePin);
      this.server.on('connected', () => this.bridge.setAuthToken(this.token));

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
    this.on('input', (msg) => {
      console.log(this.pin);
      if(msg.hasOwnProperty('payload')) {
        this.bridge.virtualWrite(this.pin, msg.payload);
      }
    });
  }

  RED.nodes.registerType('blynk-bridge', BlynkBridge);
};