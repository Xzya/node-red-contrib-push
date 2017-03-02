module.exports = function (RED) {
    function GCMNode(n) {
        RED.nodes.createNode(this, n);
        var node = this;

        // Retrieve the config node
        this.gcmConfiguration = RED.nodes.getNode(n.gcmConfiguration);

        this.on('input', function (msg) {

            node.status({ fill: "blue", shape: "dot", text: " " })

            var content = msg.notification;

            var gcm = require('node-gcm');

            var message = new gcm.Message(content);
            var sender = new gcm.Sender(this.gcmConfiguration.apiKey);

            var recipient;

            if (msg.to) {
                recipient = { to: msg.to }
            } else if (msg.topic) {
                recipient = { topic: msg.topic };
            } else if (msg.condition) {
                recipient = { condition: msg.condition }
            } else if (msg.tokens && msg.tokens.length > 0) {
                recipient = { registrationTokens: msg.tokens };
            } else if (msg.registrationTokens && msg.registrationTokens.length > 0) {
                recipient = { registrationTokens: msg.registrationTokens };
            } else {
                var err = new Error("Missing recipient");
                node.status({ fill: "red", shape: "dot", text: err.message })
                node.error(err);
                return;
            }

            sender.sendNoRetry(message, recipient, function (err, response) {
                if (err) {
                    node.status({ fill: "red", shape: "dot", text: err.message })
                    node.error(err);
                    return;
                }

                node.status({
                    fill: "green",
                    shape: "dot",
                    text: response.success + " sent, " + response.failure + " failed."
                })
                msg.result = response;
                node.send(msg)
            });

        });

        this.on('close', function () {
            node.status({});
        });
    }
    RED.nodes.registerType("gcm", GCMNode);
}