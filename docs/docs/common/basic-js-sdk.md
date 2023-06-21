
<RightMenu></RightMenu>
## Import the Javascript file

Import the Javascript file to your web page. This Javascript will declare a global variable `LovenseBasicSdk` on the page.

```html
<script src="https://api.lovense-api.com/basic-sdk/core.min.js"></script>
```

::: tip
Please add the following domains to your CSP whitelist.

`*.lovense.com *.lovense-api.com *.lovense.club:*`
:::

## Initialize

Declare an instance object using the `LovenseBasicSdk` constructor. The `ready` event is triggered after successful declaration.

Please refer [here](#step-1-application-for-user-authentication-token) to see how to request `authToken` for your users.

```javascript
/**
 * @param {object} option
 * @param {string} option.uid user ID on your application
 * @param {string} option.platform this is the Website Name shown in the developer dashboard
 * @param {string} option.authToken authorization token
 * @param {boolean} option.debug optional, whether to print debug messages on the console
 * @returns {object} instance object
 */
LovenseBasicSdk(option)
```

**Example**:

```js
const basicSdkInstance = new LovenseBasicSdk({
  platform: '{platform}',
  authToken: '{authToken}',
  uid: '{uid}',
  debug: true
})
basicSdkInstance.on('ready', instance => {
  console.log('ready')
})
```

## Methods

### getQrcode

Get the QR code to display on the interface. This is an asynchronous method.

**Example**:

```javascript
const basicSdkInstance = new LovenseBasicSdk({
  platform: '{platform}',
  authToken: '{authToken}',
  uid: '{uid}',
  debug: true
})
basicSdkInstance.on('ready', async instance => {
  try {
    const codeRes = await instance.getQrcode()
    console.log(codeRes)
    // return:
    // {
    //   "qrcodeUrl": "https://apps.lovense-api.com/UploadFiles/qr/20220725/9b03dfb900af4328b2eb0573a39ec5e0.jpg",
    //   "qrcode": "{\"type\":5,\"data\":\"2Td5iU0YoWSpsE4fx5WSMUbt+khTj0d/GggSrRTVs8Sz4EOOpoISvcRUO3P6/WFxA/FHwfEgLkuCG4kP2m1X2Q==\"}"
    // }
  } catch (e) {
    console.error(e.message)
  }
})
```

### getAppStatus

Returns the app connection status.

**Example**:

```javascript
basicSdkInstance.getAppStatus()
// return: true | false
```

### getOnlineToys

Get connected toy(s) information.

```javascript
basicSdkInstance.getOnlineToys()

// return:
[{
  "id": "xxxxxxxx",
  "name": "Lush 3",
  "toyType": "lush",
  "nickname": "My Lush",
  "hVersion": "3",
  "fVersion": 300,
  "battery": 100,
  "connected": true
}]
```

### getToys

Get toy(s) information.

**Example**:

```javascript
basicSdkInstance.getToys()

// return:
[{
  "id": "xxxxxxxx",
  "name": "Lush 3",
  "toyType": "lush",
  "nickname": "My Lush",
  "hVersion": "3",
  "fVersion": 300,
  "battery": 100,
  "connected": true
}]
```

### checkToyOnline

Check if any toys have been connected.

**Example**:

```javascript
basicSdkInstance.checkToyOnline()
// return: true | false
```

### getDeviceInfo

Get device Information.

```javascript
basicSdkInstance.getDeviceInfo()

// return:
{
  "deviceCode": "xxxxxx",
  "domain": "192.168.1.xx.lovense.club",
  "httpsPort": 30010,
  "appVersion": "1.3.7",
  "platform": "android",
  "appType": "remote"
}
```

### sendToyCommand

Send commands to toys.

**Parameters**:

| Name      | Type     | Description                                                                                                  | Required                                                                                                                                                                                      |
| --------- | -------- | ------------------------------------------------------------------------------------------------------------ | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| vibrate   | Number   | Vibration strength, range 0-20                                                                               | no                                                                                                                                                                                            |
| rotate    | Number   | Rotation strength, range 0-20. Supported by Nora.                                                            | no                                                                                                                                                                                            |
| pump      | Number   | Pump strength, range 0-3. Supported by Max/Max 2.                                                            | no                                                                                                                                                                                            |
| thrusting | Number   | Thrusting strength, range 0-20. Supported by the Lovense Sex Machine and Gravity.                            | no                                                                                                                                                                                            |
| fingering | Number   | Fingering strength, range 0-20. Supported by Flexer.                                                         | no                                                                                                                                                                                            |
| suction   | Number   | Suction strength, range 0-20. Supported by Tenera.                                                           | no                                                                                                                                                                                            |
| time      | Number   | Total running time, 0 = indefinite length. Otherwise, the running time should be greater than 1, default `0` | no                                                                                                                                                                                            |
| toyId     | String   | Toy ID. If you don’t include this, it will be applied to all toys                                            | no                                                                                                                                                                                            |
| <!--      | byServer | Boolean                                                                                                      | Whether to send commands by server. By default, the best way is to match the user's network environment automatically. If you want to choose the server mode manually, set `byServer` to true | no | --> |

**Example**:

```javascript
// vibrate at 5th strength for all connected toys
basicSdkInstance.sendToyCommand({
  vibrate: 5
})

// vibrate 60 seconds at 5th strength for all connected toys
basicSdkInstance.sendToyCommand({
  vibrate: 5,
  time: 60
})

// vibrate 60 seconds at 5th strength for toys 234s25rsga3ts
// rotate 60 seconds at 10th strength for toys 234s25rsga3ts
basicSdkInstance.sendToyCommand({
  vibrate: 5,
  rotate: 10,
  time: 60,
  toyId: '234s25rsga3ts'
})
```

### sendPatternCommand

Send pattern command.

**Parameters**:

| Name      | Type     | Description                                                                                                                             | Required                                                                                                                                                                                      |
| --------- | -------- | --------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| strength  | String   | Strength pattern. Use 0-20 to form a string of numbers, separated by a semicolon. Supports up to 50 numbers, for example: 20;20;5;20;10 | yes                                                                                                                                                                                           |
| time      | Number   | Total running time, 0 = indefinite length. Otherwise, running time should be greater than 1, default `0`                                | no                                                                                                                                                                                            |
| interval  | Number   | Vibration intervals in milliseconds. Should be greater than 100，default 150                                                            | no                                                                                                                                                                                            |
| vibrate   | Boolean  | Whether to enable vibration, default true                                                                                               | no                                                                                                                                                                                            |
| rotate    | Boolean  | Whether to enable rotation. Supported by Nora.                                                                                          | no                                                                                                                                                                                            |
| pump      | Boolean  | Whether to enable pump. Supported by Max/Max 2.                                                                                         | no                                                                                                                                                                                            |
| thrusting | Boolean  | Whether to enable thrusting. Supported by the Lovense Sex Machine and Gravity.                                                          | no                                                                                                                                                                                            |
| fingering | Boolean  | Whether to enable fingering. Supported by Flexer.                                                                                       | no                                                                                                                                                                                            |
| suction   | Boolean  | Whether to enable suction. Supported by Tenera.                                                                                         | no                                                                                                                                                                                            |
| toyId     | String   | Toy ID. If you don’t include this, it will be applied to all toys                                                                       | no                                                                                                                                                                                            |
| <!--      | byServer | Boolean                                                                                                                                 | Whether to send commands by server. By default, the best way is to match the user's network environment automatically. If you want to choose the server mode manually, set `byServer` to true | no | --> |

**Example**:

```javascript
basicSdkInstance.sendPatternCommand({
  strength: "6;8;10;12;14;20;20;20;16;14;12;10;8;6;6",
  time: 60
})
```

#### sendPresetCommand

Send a command from Lovense preset patterns.

| Name  | Type     | Description                                                                                              | Required                                                                                                                                                                                      |
| ----- | -------- | -------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| name  | String   | Preset pattern name. Supports "pulse", "wave", "fireworks", "earthquake"                                 | yes                                                                                                                                                                                           |
| time  | Number   | Total running time, 0 = indefinite length. Otherwise, running time should be greater than 1, default `0` | no                                                                                                                                                                                            |
| toyId | String   | Toy ID. If you don’t include this, it will be applied to all toys                                        | no                                                                                                                                                                                            |
| <!--  | byServer | Boolean                                                                                                  | Whether to send commands by server. By default, the best way is to match the user's network environment automatically. If you want to choose the server mode manually, set `byServer` to true | no | --> |

**Example**:

```javascript
basicSdkInstance.sendPresetCommand({
  name: "pulse",
  time: 60
})
```

### stopToyAction

Stop toy’s response.

**Parameters**:

| Name  | Type     | Description                                                       | Required                                                                                                                                                                                      |
| ----- | -------- | ----------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| toyId | String   | Toy ID. If you don’t include this, it will be applied to all toys | no                                                                                                                                                                                            |
| <!--  | byServer | Boolean                                                           | Whether to send commands by server. By default, the best way is to match the user's network environment automatically. If you want to choose the server mode manually, set `byServer` to true | no | --> |

**Example**:

```javascript
basicSdkInstance.stopToyAction()
```

### destroy

Destroy the instance.

**Example**:

```js
basicSdkInstance.destroy()
```

## Event

### ready

Listen for the ready event, which will be called after successful initialization. You can use the instance normally after this event is triggered.

**Example**:

```js
const basicSdkInstance = new LovenseBasicSdk({
  platform: '{platform}',
  authToken: '{authToken}',
  uid: '{uid}',
  debug: true
})
basicSdkInstance.on('ready', instance => {
  console.log('ready')
})
```

### appStatusChange

Triggered when the app connection state changes. For example, users scan the QR code and establish a connection successfully.

**Example**:

```javascript
basicSdkInstance.on('appStatusChange', status => {
  // the app connection status
  // status = true | false
})
```

### toyInfoChange

Triggered when toy information changes.

**Example**:

```javascript
basicSdkInstance.on('toyInfoChange', toyInfo => {
  // toyInfo:
  [{
    "id": "xxxxxxxx",
    "name": "Lush 3",
    "toyType": "lush",
    "nickname": "My Lush",
    "hVersion": "3",
    "fVersion": 300,
    "battery": 100,
    "connected": true
  }]
})
```

### toyOnlineChange

Triggered when the toy connection state changes.

**Example**:

```javascript
basicSdkInstance.on('toyOnlineChange', status => {
  // have any toys been connected
  // status = true | false
})
```

### deviceInfoChange

Triggered when the device information changes.

**Example**:

```javascript
basicSdkInstance.on('deviceInfoChange', deviceInfo => {
  // deviceInfo:
  {
    "deviceCode": "xxxxxx",
    "domain": "192.168.1.xx.lovense.club",
    "httpsPort": 30010,
    "appVersion": "1.3.7",
    "platform": "android",
    "appType": "connect"
  }
})
```
