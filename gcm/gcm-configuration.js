module.exports = function (RED) {
    function GCMConfigurationNode(config) {
        RED.nodes.createNode(this, config);
        this.apiKey = config.apiKey;
    }
    RED.nodes.registerType("gcm-configuration", GCMConfigurationNode);
}