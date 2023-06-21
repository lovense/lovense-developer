<RightMenu></RightMenu>
## Work Flow

<Mermaid :graph="`
sequenceDiagram
  actor U as User(Lovense App)
  participant I as Developer Interface
  participant S as Developer Server
  participant L as Lovense Server
  rect rgb(255, 205, 210)
  S --) L : 1) Application for authorization token
  L -) S : Response authorization token
  S -) I : Forward authorization token
  end
  rect rgb(144, 202, 249)
  I --) L : 2) Validate authorization token
  L -) I : Verification success, response socket connection info
  I --> L : Establishing socket connection
  L -) I : Get QR code information by socket
  U --> I : Start Lovense App, connect toys and scan the QR code
  end
  rect rgb(241, 248, 233)
  U -) L : 3) Report device information periodically
  Note over U,L: Device information contains toy list, domain and port of local http service
  L -) I : Synchronizing Device Information
  I -) U : Show toys and send command
  end
`" />

## Step 1: Application for user authentication token

Use your developer token to apply for an authentication token for your users. You can get the developer token from [developer dashboard](https://www.lovense.com/user/developer/info).

::: warning 
For security reasons, the developer token should always be used on the server side. You should never use it in your JS code from the client side. 
:::

**API URL**: `https://api.lovense-api.com/api/basicApi/getToken`

**Request Protocol**: HTTPS Request

**Method**: POST

**Request Content Type**: application/json

**Parameters**:

| Name   | Description                                                                                                                                                                                        | Required |
| ------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------- |
| token  | Developer Token                                                                                                                                                                                    | yes      |
| uid    | User ID on your application                                                                                                                                                                        | yes      |
| uname  | User nickname on your application                                                                                                                                                                  | no       |
| utoken | User token from your website. This is for your own verification purposes, and we suggest you generate a unique token for each user. This allows you to verify the user and avoid faking the calls. | no       |

**Example**:

<CodeGroup>
  <CodeGroupItem title="java">

```java
String url= "https://api.lovense.com/api/basicApi/getToken";
Map<String, String> requestParameter = new HashMap<String, String>();
//TODO initialize your parameters:
requestParameter.put("token", "{Lovense developer token}");
requestParameter.put("uid", "{user ID on your application}");
requestParameter.put("uname", "{user nickname on your application}");
HttpPost httpPost = new HttpPost(url);
List<NameValuePair> nameValuePairs = new ArrayList<NameValuePair>();
if (requestParameter != null && !requestParameter.isEmpty()) {
  Set<String> keys = requestParameter.keySet();
  for (String key : keys) {
    nameValuePairs.add(new BasicNameValuePair(key, requestParameter.get(key)));
  }
}
httpPost.setEntity(new UrlEncodedFormEntity(nameValuePairs, "utf-8"));
```

  </CodeGroupItem>
  <CodeGroupItem title="NodeJs">

```js
import axios from 'axios'

const result = await axios.post(
  "https://api.lovense.com/api/basicApi/getToken",
  {
    token: "{Lovense developer token}",
    uid: "{user ID on your application}",
    uname: "{user nickname on your application}"
  }
)
```
  </CodeGroupItem>
</CodeGroup>

**Result**:

```json
{
  code: 0
  message: "Success"
  data: {
      "authToken": "{autoToken}"
  }
}
```

## Step 2: Validate authorization

After generating the authToken in the previous step, submit it to Lovense on the client-side to verify authorization. This will return socket connection information.

::: warning 
Please use [Socket.IO for client 2.x](https://socket.io/docs/v2/client-api/) when connecting to the socket service on the client side
:::

**API URL**: `https://api.lovense-api.com/api/basicApi/getSocketUrl`

**Method**: POST

**Content Type**: application/json

**Parameters**:

| Name      | Description                                          | Required |
| --------- | ---------------------------------------------------- | -------- |
| platform  | Your Website Name (shown in the Developer Dashboard) | yes      |
| authToken | Authorization token                                  | yes      |

**Return**:

| Name              | Description                               | Type   |
| ----------------- | ----------------------------------------- | ------ |
| code              | return code, `0` for success              | int    |
| message           | reason for failure when the request fails | string |
| data              | result data                               | object |
| data.socketIoPath | socket.io path                            | string |
| data.socketIoUrl  | socket.io url                             | string |


**Example**:

<CodeGroup>
  <CodeGroupItem title="java">

```java
String url= "https://api.lovense.com/api/basicApi/getSocketUrl";
Map<String, String> requestParameter = new HashMap<String, String>();
//TODO initialize your parameters:
requestParameter.put("platform", "{platform}");
requestParameter.put("authToken", "{authToken}");
HttpPost httpPost = new HttpPost(url);
List<NameValuePair> nameValuePairs = new ArrayList<NameValuePair>();
if (requestParameter != null && !requestParameter.isEmpty()) {
  Set<String> keys = requestParameter.keySet();
  for (String key : keys) {
    nameValuePairs.add(new BasicNameValuePair(key, requestParameter.get(key)));
  }
}
httpPost.setEntity(new UrlEncodedFormEntity(nameValuePairs, "utf-8"));
```

  </CodeGroupItem>
  <CodeGroupItem title="javascript">

```js
import axios from 'axios'

const result = await axios.post(
  "https://api.lovense.com/api/basicApi/getSocketUrl",
  {
    platform: "{platform}",
    authToken: "{authToken}"
  }
)
```
  </CodeGroupItem>
</CodeGroup>

**Result**:

```json
{
  code: 0
  message: "Success"
  data: {
      "socketIoPath": "/xxx",
      "socketIoUrl": "xxx"
  }
}
```

## Step 3: Get QR code

After connecting the socket, obtain the user's QR code information by sending the `basicapi_get_qrcode_ts` event, which is used for interface display. The response data is returned with the event `basicapi_get_qrcode_tc`

**Emit Event**: `basicapi_get_qrcode_ts`

**Listen Event**: `basicapi_get_qrcode_tc`

**Return**:

| Name           | Description                                                                             | Type   |
| -------------- | --------------------------------------------------------------------------------------- | ------ |
| code           | Return code, `0` for success                                                            | int    |
| message        | Reason for failure when the request fails                                               | string |
| data           | Result data                                                                             | object |
| data.qrcode    | QR code raw data. You can use it to generate a QR code                                  | string |
| data.qrcodeUrl | QR code picture url                                                                     | string |
| data.ackId     | If you pass a `ackId` when sending an event, a consistent `ackId` will be returned here | string |


**Example**:

<CodeGroup>
  <CodeGroupItem title="Javascript">

```js
import io from 'socket.io-client'

const socket = io('socketIoUrl', { path: 'socketIoPath', transports: ['websocket'] })
const ackId = '24fsf2536fs7324hj647f5'

socket.emit('basicapi_get_qrcode_ts', {
  ackId: ackId
})

socket.on('basicapi_get_qrcode_tc', res => {
  let resData = res ? JSON.parse(res) : {}
  if (resData.data && resData.data.ackId === ackId) {
    console.log(resData)
  }
})
```

  </CodeGroupItem>
</CodeGroup>

**Result**:

```json
{
  code: 0
  message: "Success"
  data: {
    "qrcodeUrl": "{qrcodeUrl}",
    "qrcode": "{qrcode}"
    "ackId": "24fsf2536fs7324hj647f5"
  }
}
```

## Step 4: Get device information

The toy and device information can be obtained with the event `basicapi_update_device_info_tc`

**Listen Event**: `basicapi_update_device_info_tc`

**Example**:

<CodeGroup>
  <CodeGroupItem title="Javascript">

```js
import io from 'socket.io-client'

const socket = io('socketIoUrl', { path: 'socketIoPath', transports: ['websocket'] })

socket.on('basicapi_update_device_info_tc', res => {
  let resData = res ? JSON.parse(res) : {}
  console.log(resData)
})
```

  </CodeGroupItem>
</CodeGroup>

**Result**:

```json
{
  "deviceCode": "xxxxxx",
  "online": true,
  "domain": "192.168.1.xx.lovense.club",
  "httpsPort": 30010,
  "wssPort": 30110,
  "appVersion": "1.3.7",
  "platform": "android",
  "appType": "remote",
  "toyList": [
    {
      "id": "xxxxxxxx",
      "name": "Lush 3",
      "toyType": "lush",
      "nickname": "My Lush",
      "hVersion": "3",
      "fVersion": 300,
      "battery": 100,
      "connected": true
    }
  ]
}
```

## Step 5: Command the toy(s)

We provide two ways to send toy commands.

### By local

If the user's app and your application are on the same LAN, you can use the obtained device information to send toy command. Please refer to the [documentation](#by-local-application) for specific parameters.

### By server

You can also send commands remotely with the latest `basicapi_send_toy_command_ts` event. The parameters are the same as those sent [by local application](#by-local-application).

<CodeGroup>
  <CodeGroupItem title="Javascript">

```js
import io from 'socket.io-client'

const socket = io('socketIoUrl', { path: 'socketIoPath', transports: ['websocket'] })

socket.emit('basicapi_send_toy_command_ts', {
  command: "Function",
  action: "Vibrate:16",
  timeSec: 20,
  apiVer: 1
})
```

  </CodeGroupItem>
</CodeGroup>

## Socket Event List

### Listen

| Name                           | Description                       | Trigger                                                 |
| ------------------------------ | --------------------------------- | ------------------------------------------------------- |
| basicapi_get_qrcode_tc         | Returns QR code information       | when 'basicapi_get_qrcode_ts' event is sent             |
| basicapi_update_device_info_tc | Returns device information        | device information update                               |
| basicapi_update_app_status_tc  | Returns the app connection status | user scans the code to establish a connection           |
| basicapi_update_app_online_tc  | Returns the app network status    | the connection status of Lovense APP and Lovense server |

### Emit

| Name                         | Description                 |
| ---------------------------- | --------------------------- |
| basicapi_get_qrcode_ts       | get QR code information     |
| basicapi_send_toy_command_ts | send toy commands by server |
