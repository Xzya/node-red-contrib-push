module.exports = function (RED) {
    function APNNode(n) {
        RED.nodes.createNode(this, n);
        var node = this;

        // Retrieve the app node
        this.app = RED.nodes.getNode(n.app);

        this.on('input', function (msg) {

            node.status({ fill: "blue", shape: "dot", text: " " })

            var rawNotification = msg.rawNotification;
            var content = msg.notification;

            if (rawNotification || content) {
                var apn = require("apn");
                var provider = new apn.Provider({
                    token: node.app.token,
                    production: node.app.production
                })

                var notification = new apn.Notification();
                notification.topic = node.app.topic;

                if (rawNotification) {
                    notification.rawPayload = rawNotification;
                } else {
                    if (content.title && content.body) {
                        notification.title = content.title;
                        notification.body = content.body;
                    } else if (content.body) {
                        notification.alert = content.body;
                    }
                    if (content.sound) {
                        notification.sound = content.sound;
                    }
                    if (content.badge != null) {
                        notification.badge = content.badge;
                    }
                    if (content.action) {
                        notification.action = content.action;
                    }
                    if (content.category) {
                        notification.category = content.category;
                    }
                    if (content.contentAvailable) {
                        notification.contentAvailable = 1;
                    }
                    if (content.mutableContent) {
                        notification.mutableContent = 1;
                    }
                    if (content.expiry) {
                        notification.expiry = content.expiry;
                    }
                    if (content.urlArgs) {
                        notification.urlArgs = content.urlArgs;
                    }
                    if (content.priority && (content.alert || content.title || content.body || content.sound || content.badge)) {
                        notification.priority = content.priority;
                    }
                    if (content.payload) {
                        notification.payload = content.payload;
                    }
                }

                var tokens;

                if (msg.tokens && msg.tokens.length > 0) {
                    tokens = msg.tokens;
                } else {
                    var err = new Error("Missing recipient");
                    node.status({ fill: "red", shape: "dot", text: err.message })
                    node.error(err);
                    return;
                }

                provider.send(notification, tokens).then(function (response) {
                    node.status({
                        fill: "green",
                        shape: "dot",
                        text: response.sent.length + " sent, " + response.failed.length + " failed."
                    })
                    msg.result = response;
                    node.send(msg)
                }).catch(function (err) {
                    node.status({ fill: "red", shape: "dot", text: err.message })
                    node.error(err);
                })
            }
        });

        this.on('close', function () {
            node.status({});
        });

    }
    RED.nodes.registerType("apn", APNNode);
}