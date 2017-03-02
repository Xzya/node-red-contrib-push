module.exports = function (RED) {
    function APNAppNode(n) {
        RED.nodes.createNode(this, n);
        this.token = RED.nodes.getNode(n.token);
        this.topic = n.topic;
        this.production = n.production;
    }
    RED.nodes.registerType("apn-app", APNAppNode);
}