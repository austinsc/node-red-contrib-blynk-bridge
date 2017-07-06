module.exports = function(RED) {
  function BlynkReader(config) {
    RED.nodes.createNode(this, config);

    this.server = RED.nodes.getNode(config.server);

    if(this.server) {
      // Do something with:
      //  this.server.host
      //  this.server.post
    } else {
      // No config node configured
    }
  }

  RED.nodes.registerType('blynk-reader', BlynkReader);
};