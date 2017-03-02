Node-RED Push Notification nodes
====================================


`node-red-contrib-push` is a [Node-RED](http://nodered.org/docs/creating-nodes/packaging.html) package that allows you to send APN, GCM and Web push notifications.

It uses the [node-apn](https://github.com/node-apn/node-apn) library for APN notifications, [node-gcm](https://github.com/ToothlessGear/node-gcm) for GCM notifications and [web-push](https://github.com/web-push-libs/web-push) for Web notifications.

## Table of Contents
- [APN](#apn)
- [GCM](#gcm)
- [Web](#web)
- [Additional information](#additional)
- [Example flow](#example)
- [Screenshots](#screenshots)
- [License](#license)

## APN     <a name="apn"></a>

You can use the ```apn``` node to send notifications to iOS and Safari devices. You will need to configure a [Provider Authentication Token](https://developer.apple.com/library/content/documentation/NetworkingInternet/Conceptual/RemoteNotificationsPG/CommunicatingwithAPNs.html) and then create an ```app``` configuration, which will contain the token, as well as the topic (bundle-id) of your app and wheather it's using a production or sandbox environment. Assign the ```app``` configuration to the ```apn``` node and you are ready to send notifications.

You can use the ```apn-notification``` node to set the properties of a notification, or you can send the values in the ```msg.notification``` object. You can also set the raw payload which will be sent to Apple in the ```msg.rawNotification``` object. More information available in the ```apn``` node info tab.

The tokens must be provided in the ```msg.tokens``` object as an array.

## GCM     <a name="gcm"></a>

The ```gcm``` node is used to send notifications to Android and iOS (if it's configured in Firebase) devices. For Chrome notifications, check out the ```web``` node. You will need to configure your GCM Api Key and assign it to the node.

You can use the ```gcm-notification``` node to set the properties of a notification, or you can send the values in the ```msg.notification``` object.

The recipient of the notification can be specified by setting one of the following keys: ```to```, ```topic```, ```condition```, ```registrationTokens``` or ```tokens```.

More information available in the ```gcm``` node info tab.

## Web     <a name="web"></a>

The ```web``` node is used to send notifications to Chrome, Firefox, Opera, and Samsung Internet browsers. For a list of supported versions of those browsers, check the [web-push](https://github.com/web-push-libs/web-push) page.

Some browsers (Chrome and Opera) requires a GCM Api Key to send notifications, so you will need to configure it in the node.

You can use the ```web-notification``` node to set the properties of a notification, or you can send the values in the ```msg.notification``` object.

The device tokens must be provided in the ```msg.tokens``` object and they must contain the ```endpoint```, as well as the ```p256dh``` and the ```auth``` keys.

More information available in the ```web``` node info tab.

## Additional information     <a name="additional"></a>

The ```apn```, ```gcm``` and ```web``` nodes will return the result in the ```msg.result``` key.

## Example flow     <a name="example"></a>

You can find an example flow in ```exampleFlow.json```.

## Screenshots     <a name="screenshots"></a>

![Screenshot 1](/screenshot1.PNG?raw=true "Screenshot 1")

## License     <a name="license"></a>

Copyright 2017 Mihail Cristian Dumitru

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

[http://www.apache.org/licenses/LICENSE-2.0](http://www.apache.org/licenses/LICENSE-2.0)

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.