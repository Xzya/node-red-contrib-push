module.exports = function (RED) {
    function APNNotificationNode(n) {
        RED.nodes.createNode(this, n);

        this.content = n;

        var node = this;

        this.on('input', function (msg) {
            var payload = {};

            node.status({});

            try {

                if (node.content.title) {
                    payload.title = node.content.title;
                }

                if (node.content.body) {
                    payload.body = node.content.body;
                }

                if (node.content.sound) {
                    payload.sound = node.content.sound;
                }

                if (node.content.badge) {
                    payload.badge = Number(node.content.badge);
                }

                if (node.content.action) {
                    payload.action = node.content.action;
                }

                if (node.content.category) {
                    payload.category = node.content.category;
                }

                if (node.content.contentAvailable) {
                    payload.contentAvailable = 1;
                }

                if (node.content.mutableContent) {
                    payload.mutableContent = 1;
                }

                if (node.content.payload) {
                    var data = {};
                    var keyValArray = JSON.parse(node.content.payload)
                    for (var i = 0; i < keyValArray.length; i++) {
                        switch (keyValArray[i].type) {
                            case "str":
                                var value = String(keyValArray[i].value)
                                data[keyValArray[i].key] = value
                                break
                            case "num":
                                var value = parseFloat(keyValArray[i].value)
                                if (!Number.isNaN(value)) {
                                    data[keyValArray[i].key] = value
                                } else {
                                    throw new Error("Could not parse " + keyValArray[i].value + " into a number.")
                                }
                                break
                            case "bool":
                                var value = keyValArray[i].value == true
                                data[keyValArray[i].key] = value
                                break
                            case "json":
                                var value = JSON.parse(keyValArray[i].value)
                                data[keyValArray[i].key] = value
                                break
                        }
                    }
                    payload.payload = data;
                }

                if (node.content.expiry) {
                    var units = node.content.expiry.split(" ").map(function (unit) {
                        return Number(unit)
                    })
                    var minutes = units[0] || 0;
                    var hours = units[1] || 0;
                    var days = units[2] || 0;
                    var weeks = units[3] || 0;

                    payload.expiry = Math.floor(Date.now() / 1000)
                        + (60 * minutes)
                        + (60 * 60 * hours)
                        + (60 * 60 * 24 * days)
                        + (60 * 60 * 24 * 7 * weeks)
                }

                if (node.content.urlArgs) {
                    var urlArgs = JSON.parse(node.content.urlArgs);

                    if (urlArgs.length > 0) {
                        payload.urlArgs = urlArgs;
                    }
                }

                if (node.content.priority) {
                    payload.priority = node.content.priority;
                }

                msg.notification = payload;

                node.send(msg);

            } catch (err) {
                node.status({ fill: "red", shape: "dot", text: err.message })
            }
        });

        this.on('close', function () {
            node.status({});
        });
    }
    RED.nodes.registerType("apn-notification", APNNotificationNode);
}