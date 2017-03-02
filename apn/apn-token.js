module.exports = function (RED) {
    function APNTokenNode(config) {
        RED.nodes.createNode(this, config);
        this.key = config.key;
        this.keyId = config.keyId;
        this.teamId = config.teamId;
    }
    RED.nodes.registerType("apn-token", APNTokenNode);
}