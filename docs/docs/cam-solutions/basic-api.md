---
prev: false
next: false
pageClass: docment-class-page
---
<RightMenu></RightMenu>
# Basic API

This API allows developers to access Lovense toys through simple HTTPS request. Configure your settings on our developer dashboard before getting started.

Here is a sample [demo](/lovense-basic-api-demo.zip) for your reference.

## Step 1: Configure the developer dashboard

Go to the [developer dashboard](https://www.lovense.com/user/developer/info), select "Standard API" tab, enter your application info.

- **Website Name**: The name that will be displayed in Lovense Connect. Contact us if you want to change it.

- **Callback URL**: This is the URL from your server where our app sends callback information.

- **Heartbeat**: The callback interval for our app to update your server with the latest status.

## Step 2: Connect to Lovense toy(s)

We offer 2 ways to connect to our toys.

## By Lovense Connect APP (iOS or Android)

  Users need to install Lovense Connect mobile app on their iOS/Android devices.

  - [Download for Android](https://play.google.com/store/apps/details?id=com.lovense.connect)
  - [Download for iOS](https://itunes.apple.com/us/app/lovense-connect/id1273067916)

  1.  The user pairs their Lovense toy to the Lovense Connect app.
  2.  Get the QR code to connect to Lovense Connect.

      Call Lovense Server API from your server

      **API URL**: `https://api.lovense-api.com/api/lan/getQrCode`

      > Notice: For security reasons, the developer token should be always used on the server side. You should never use it in your JS code from the client side.

      **Request Protocol**: HTTPS Request

      **Method**: POST

      **Content Type**: application/json

      **Parameters**:
      | Name   | Description                                                                                                                                                                                           | Required |
      | ------ | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------- |
      | token  | Developer Token                                                                                                                                                                                       | yes      |
      | uid    | User ID on your application                                                                                                                                                                           | yes      |
      | uname  | User ID on your application                                                                                                                                                                           | no       |
      | utoken | User token from your website. This is for your own verification purposes. We suggest you generate a unique token for each user. This allows you to verify the user and avoid others faking the calls. | no       |
      | v      | version                                                                                                                                                                                               | yes      |

      **Request Example**:

      ```json
      {
        "token": "FE1TxWpTciAl4E2QfYEfPLvo2jf8V6WJWkLJtzLqv/nB2AMos9XuWzgQNrbXSi6n",
        "uid": "42425232242",
        "v": 2
      }
      ```

      **Return**:

      ```json
      {
        code: 0
        result: true
        message: "Success"
        data: {
            "qr": "https://test2.lovense.com/UploadFiles/qr/20220106/xxxx.jpg", // qrcode picture
            "code": "xxxx"
        }
      }
      ```

      The API will return a JSON object that contains the QR code image URL. You will get:

      | Name    | Description                         |
      | ------- | ----------------------------------- |
      | code    | Error code                          |
      | message | result                              |
      | result  | true if successful, false if failed |
      | data    | QR code image/code                  |

      Display the QR code to your user.

  3.  Users scan the QR code using Lovense Connect.

  Once the user scans the QR code with the Lovense Connect app, the app will invoke the callback URL you provided on the developer dashboard.

  The Lovense Connect app will send the following POST to your server:

  ```json
  {
    uid: User ID
    utoken: xxx, // User token on your application
    domain: 192-168-0-11.lovense.club, // the domain name of the Lovense Connect app
    httpPort: 34567, // HTTP server port
    wsPort: 34567, // HTTP server port
    httpsPort: 34568, //HTTPS server port
    wssPort: 34568, // HTTPS server port
    platform: 'ios', // the Lovense Connect platform e.g. Android/iOS
    appVersion: '2.3.6', //the Lovense Connect version
    version: 101, // the protocol version e.g. 101
    toys:{
        toyId:{
          id: xxxxxx, // Toy's ID
          name:"lush", // toy's name
          nickName: "nickName"
          status: 1 // e.g. 1/0
        }
      }
  }
  ```

  The domain and httpPort used to connect to Lovense Connect (iOS & Android) are returned.

## By Lovense Connect PC (Window or Mac)

- [Download for Windows](https://www.lovense.com/files/apps/connect/Lovense_Connect.exe)
- [Download for Mac](https://www.lovense.com/files/apps/connect/Lovense_Connect.dmg)

Windows computers - Users need the Lovense USB Bluetooth Adapter.

Mac - Users can connect our toys directly to their Mac via Bluetooth.

The user pairs their Lovense toy to Lovense Connect for PC/Mac.

## Step 3: Command the toy(s)

Once everything is set up, you can command our toys:

- **Local APIs**: These APIs are exposed by Lovense Connect app through HTTPS. The connections are in the same LAN or the same computer.
- **Server APIs**: If your application can’t establish a LAN connection to the user’s Lovense Connect, you can use the Server API to connect the user’s toy.

## By local application

> ⚠️ Requires Lovense Connect for iOS v2.6.4 or later, Android v2.7.7 or later, or PC v.1.5.4 or later.

If the user's device is in the same LAN environment, a POST request to Lovense Connect can be used to trigger a toy response. In this case, both your server and Lovense's server are not required.

If the user has Lovense Connect mobile, the `domain` and `httpsPort` are accessed from the callback information. If the user has Lovense Connect for PC/Mac, the `domain` is `127-0-0-1.lovense.club`, and the `httpsPort` is `30010`.

With the same command line, different parameters will lead to different results as below.

- GetToys Request

  Get the user's toy(s) information.

  **API URL**: `https://{domain}:{httpsPort}/command`

  **Request Protocol**: HTTPS Request

  **Method**: POST

  **Request Content Type**: application/json

  **Response Format**: JSON

  **Parameters**:

  | Name    | Description     | Type   | Note | Required |
  | ------- | --------------- | ------ | ---- | -------- |
  | command | Type of request | String | /    | yes      |

  **Request Example**:

  ```json
  {
    "command": "GetToys"
  }
  ```

  **Response Example**:

  ```json
  {
    "code": 200,
    "data": {
      "toys": "{  \"fc9f37e96593\" : {    \"id\" : \"fc9f37e96593\",    \"status\" : \"1\",    \"version\" : \"\",    \"name\" : \"nora\",    \"battery\" : 100,    \"nickName\" : \"\"  }}",
      "platform": "ios",
      "appType": "connect"
    },
    "type": "OK"
  }
  ```

- GetToyName Request

  Get the user's toy(s) name.

  **API URL**: `https://{domain}:{httpsPort}/command`

  **Request Protocol**: HTTPS Request

  **Method**: POST

  **Request Content Type**: application/json

  **Response Format**: JSON

  **Parameters**:

  | Name    | Description     | Type   | Note | Required |
  | ------- | --------------- | ------ | ---- | -------- |
  | command | Type of request | String | /    | yes      |

  **Request Example**:

  ```json
  {
    "command": "GetToyName"
  }
  ```

  **Response Example**:

  ```json
  {
    "code": 200,
    "data": [
      "Domi",
      "Nora"
    ],
    "type": "OK"
  }
  ```

- Function Request

  **API URL**: `https://{domain}:{httpsPort}/command`

  **Request Protocol**: HTTPS Request

  **Method**: POST

  **Request Content Type**: application/json

  **Response Format**: JSON

  **Parameters**:

  | Name           | Description                                             | Type   | Note                                                                                                                                                                                                                                                                                                                                       | Required |
  | -------------- | ------------------------------------------------------- | ------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | -------- |
  | command        | Type of request                                         | String | /                                                                                                                                                                                                                                                                                                                                          | yes      |
  | action         | Control the function and strength of the toy            | string | Actions can be Vibrate, Rotate, Pump, Thrusting, Fingering, Suction or Stop. Use All to make all functions respond. Use Stop to stop the toy’s response. <br> Range: <br> `Vibrate`:`0` ~ `20` <br> `Rotate`: `0`~`20` <br> `Pump`:`0`~`3` <br> `Thrusting`:`0`~`20` <br> `Fingering`:`0`~`20` <br> `Suction`:`0`~`20` <br> `All`:`0`~`20` | yes      |
  | timeSec        | Total running time                                      | double | 0 = indefinite length <br/> Otherwise, running time should be greater than `1`.                                                                                                                                                                                                                                                            | yes      |
  | loopRunningSec | Running time                                            | double | Should be greater than `1`.                                                                                                                                                                                                                                                                                                                | no       |
  | loopPauseSec   | Suspend time                                            | double | Should be greater than `1`.                                                                                                                                                                                                                                                                                                                | no       |
  | toy            | Toy ID                                                  | string | If you don’t include this, it will be applied to all toys                                                                                                                                                                                                                                                                                  | no       |
  | stopPrevious   | Stop all previous commands and execute current commands | int    | Default: `1`, If set to `0` , it will not stop the previous command.                                                                                                                                                                                                                                                                       | no       |
  | apiVer         | The version of the request                              | int    | Always use `1`                                                                                                                                                                                                                                                                                                                             | yes      |

  > The `stopPrevious` parameter is available in the following versions: Android Connect 2.7.6, iOS Connect 2.7.2, PC Connect 1.5.9.

  **Request Example**:

  ```json
  // Vibrate toy ff922f7fd345 at 16th strength, run 9 seconds then suspend 4 seconds. It will be looped. Total running time is 20 seconds.
  {
    "command": "Function",
    "action": "Vibrate:16",
    "timeSec": 20,
    "loopRunningSec": 9,
    "loopPauseSec": 4,
    "toy": "ff922f7fd345",
    "apiVer": 1
  }
  ```

  ```json
  // Vibrate 9 seconds at 2nd strength
  // Rotate toys 9 seconds at 3rd strength
  // Pump all toys 9 seconds at 4th strength
  // For all toys, it will run 9 seconds then suspend 4 seconds. It will be looped. Total running time is 20 seconds.
  {
    "command": "Function",
    "action": "Vibrate:2,Rotate:3,Pump:3",
    "timeSec": 20,
    "loopRunningSec": 9,
    "loopPauseSec": 4,
    "apiVer": 1
  }
  ```

  ```json
  // Vibrate 9 seconds at 2nd strength
  // The rest of the functions respond to 10th strength 9 seconds
  {
    "command": "Function",
    "action": "Vibrate:2,All:10",
    "timeSec": 20,
    "loopRunningSec": 9,
    "loopPauseSec": 4,
    "apiVer": 1
  }
  ```

  ```json
  // Stop all toys
  {
    "command": "Function",
    "action": "Stop",
    "timeSec": 0,
    "apiVer": 1
  }
  ```

- Pattern Request

  If you want to change the way the toy responds very frequently you can use a pattern request. To avoid network pressure and obtain a stable response, use the commands below to send your predefined patterns at once.

  **API URL**: `https://{domain}:{httpsPort}/command`

  **Request protocol**: HTTPS Request

  **Method**: POST

  **Request Content Type**: application/json

  **Response Format**: JSON

  **Parameters**:

  | Name     | Description                                                                                                                                                                                                                                                                                                                                     | Type   | Note                                                                          | Required |
  | -------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------ | ----------------------------------------------------------------------------- | -------- |
  | command  | Type of request                                                                                                                                                                                                                                                                                                                                 | String | /                                                                             | yes      |
  | rule     | "V:1;F:v,r,p,t,f,s;S:1000#"<br/>V:1; Protocol version, this is static;<br/>F:v,r,p,t,f,s; Features: v is vibrate, r is rotate, p is pump, t is thrusting, f is fingering, s is suction, this should match the strength below. F:; Leave blank to make all functions respond;<br/>S:1000; Intervals in Milliseconds, should be greater than 100. | string | The strength of r and p will automatically correspond to v.                   | yes      |
  | strength | The pattern<br/>For example: 20;20;5;20;10                                                                                                                                                                                                                                                                                                      | string | No more than 50 parameters. Use semicolon `;` to separate each strength.      | yes      |
  | timeSec  | Total running time                                                                                                                                                                                                                                                                                                                              | double | 0 = indefinite length <br/> Otherwise, running time should be greater than 1. | yes      |
  | toy      | Toy ID                                                                                                                                                                                                                                                                                                                                          | string | If you don’t include this, it will apply to all toys                          | no       |
  | apiVer   | The version of the request                                                                                                                                                                                                                                                                                                                      | int    | Always use 2                                                                  | yes      |

  **Request Example**:

  ```json
  // Vibrate the toy as defined. The interval between changes is 1 second. Total running time is 9 seconds.
  {
    "command": "Pattern",
    "rule": "V:1;F:v;S:1000#",
    "strength": "20;20;5;20;10",
    "timeSec": 9,
    "toy": "ff922f7fd345",
    "apiVer": 2
  }
  ```

  ```json
  // Vibrate the toys as defined. The interval between changes is 0.1 second. Total running time is 9 seconds.
  // If the toys include Nora or Max, they will automatically rotate or pump, you don't need to define it.
  {
    "command": "Pattern",
    "rule": "V:1;F:v,r,p;S:100#",
    "strength": "20;20;5;20;10",
    "timeSec": 9,
    "apiVer": 2
  }
  ```

- Preset Request

  **API URL**: https://{domain}:{httpsPort}/command

  **Request protocol**: HTTPS Request

  **Method**: POST

  **Request Content Type**: application/json

  **Response Format**: JSON

  **Parameters**:

  | Name    | Description                | Type   | Note                                                                                           | Required |
  | ------- | -------------------------- | ------ | ---------------------------------------------------------------------------------------------- | -------- |
  | command | Type of request            | String | /                                                                                              | yes      |
  | name    | Preset pattern name        | string | We provide four preset patterns in the Lovense Connect app: pulse, wave, fireworks, earthquake | yes      |
  | timeSec | Total running time         | double | 0 = indefinite length <br/> Otherwise, running time should be greater than 1.                  | yes      |
  | toy     | Toy ID                     | string | If you don’t include this, it will be applied to all toys                                      | no       |
  | apiVer  | The version of the request | int    | Always use 1                                                                                   | yes      |

  **Request Example**:

  ```json
  // Vibrate the toy with pulse pattern, the running time is 9 seconds.
  {
    "command": "Preset",
    "name": "pulse",
    "timeSec": 9,
    "toy": "ff922f7fd345",
    "apiVer": 1
  }
  ```

**Response Example**:

```json
{
  "code": 200,
  "type": "ok"
}
```

**Error Codes**:

| Code | Message                                |
| ---- | -------------------------------------- |
| 500  | HTTP server not started or disabled    |
| 400  | Invalid Command                        |
| 401  | Toy Not Found                          |
| 402  | Toy Not Connected                      |
| 403  | Toy Doesn't Support This Command       |
| 404  | Invalid Parameter                      |
| 506  | Server Error. Restart Lovense Connect. |

## By server

If your application can’t establish a LAN connection to the user’s Lovense Connect, you can use the Server API to connect the user’s toy.

> ⚠️ Coming soon to PC Connect.

- Function Request

  **API URL**: `https://api.lovense-api.com/api/lan/v2/command`

  **Request Protocol**: HTTPS Request

  **Method**: POST

  **Request Content Type**: application/json

  **Request Format**: JSON

  **Parameters**:

  | Name           | Description                                             | Type   | Note                                                                                                                                                                                                                                                                               | Required |
  | -------------- | ------------------------------------------------------- | ------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------- |
  | token          | Your developer token                                    | string |                                                                                                                                                                                                                                                                                    | yes      |
  | uid            | Your user’s ID                                          | string | To send commands to multiple users at the same time, add all the user IDs separated by commas. The toy parameter below will be ignored and the commands will go to all user toys by default.                                                                                       | yes      |
  | command        | Type of request                                         | String | /                                                                                                                                                                                                                                                                                  | yes      |
  | action         | Control the function and strength of the toy            | string | Actions can be Vibrate, Rotate, Pump, Thrusting, Fingering, Suction, or Stop. Use Stop to stop the toy’s response. <br> Range: <br> `Vibrate`:`0` ~ `20` <br> `Rotate`: `0`~`20` <br> `Pump`:`0`~`3`  <br> `Thrusting`:`0`~`20` <br> `Fingering`:`0`~`20`  <br> `Suction`:`0`~`20` | yes      |
  | timeSec        | Total running time                                      | double | 0 = indefinite length <br/> Otherwise, running time should be greater than 1.                                                                                                                                                                                                      | yes      |
  | loopRunningSec | Running time                                            | double | Should be greater than 1                                                                                                                                                                                                                                                           | no       |
  | loopPauseSec   | Suspend time                                            | double | Should be greater than 1                                                                                                                                                                                                                                                           | no       |
  | toy            | Toy ID                                                  | string | If you don’t include this, it will be applied to all toys                                                                                                                                                                                                                          | no       |
  | stopPrevious   | Stop all previous commands and execute current commands | int    | Default: `1`, If set to `0` , it will not stop the previous command.                                                                                                                                                                                                               | no       |
  | apiVer         | The version of the request                              | int    | Always use 1                                                                                                                                                                                                                                                                       | yes      |

  > The `stopPrevious` parameter is available in the following versions: Android Connect 2.7.6, iOS Connect 2.7.2, PC Connect 1.5.9.

  **Request Example**:

  ```json
  // Vibrate toy ff922f7fd345 at 16th strength, run 9 seconds then suspend 4 seconds. It will be looped. Total running time is 20 seconds.
  {
    "token": "FE1TxWpTciAl4E2QfYEfPLvo2jf8V6WJWkLJtzLqv/nB2AMos9XuWzgQNrbXSi6n",
    "uid": "1132fsdfsd",
    "command": "Function",
    "action": "Vibrate:16",
    "timeSec": 20,
    "loopRunningSec": 9,
    "loopPauseSec": 4,
    "apiVer": 1
  }
  ```

  ```json
  // Vibrate 9 seconds at 2nd strength
  // Rotate toys 9 seconds at 3rd strength
  // Pump all toys 9 seconds at 4th strength
  // For all toys, it will run 9 seconds then suspend 4 seconds. It will be looped. Total running time is 20 seconds.
  {
    "token": "FE1TxWpTciAl4E2QfYEfPLvo2jf8V6WJWkLJtzLqv/nB2AMos9XuWzgQNrbXSi6n",
    "uid": "1132fsdfsd",
    "command": "Function",
    "action": "Vibrate:2,Rotate:3,Pump:3",
    "timeSec": 20,
    "loopRunningSec": 9,
    "loopPauseSec": 4,
    "apiVer": 1
  }
  ```

  ```json
  // Stop all toys
  {
    "command": "Function",
    "action": "Stop",
    "timeSec": 0,
    "apiVer": 1
  }
  ```

- Pattern Request

  If you want to change the way the toy responds very frequently you can use a pattern request. To avoid network pressure and obtain a stable response, use the commands below to send your predefined patterns at once.

  **API URL**: `https://api.lovense-api.com/api/lan/v2/command`

  **Request protocol**: HTTPS Request

  **Method**: POST

  **Request Content Type**: application/json

  **Response Format**: JSON

  **Parameters**:

  | Name     | Description                                                                                                                                                                                                                                                                                      | Type   | Note                                                                                                                                                                                         | Required |
  | -------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------- |
  | token    | Your developer token                                                                                                                                                                                                                                                                             | string |                                                                                                                                                                                              | yes      |
  | uid      | Your user’s ID                                                                                                                                                                                                                                                                                   | string | To send commands to multiple users at the same time, add all the user IDs separated by commas. The toy parameter below will be ignored and the commands will go to all user toys by default. | yes      |
  | command  | Type of request                                                                                                                                                                                                                                                                                  | String | /                                                                                                                                                                                            | yes      |
  | rule     | "V:1;F:v,r,p,t,f,s;S:1000#"<br/>V:1; Protocol version, this is static;<br/>F:v,r,p,t,f,s; Features: v is vibrate, r is rotate, p is pump, t is thrusting, f is fingering, s is suction, this should match the strength below;<br/>S:1000; Intervals in Milliseconds, should be greater than 100. | string | The strength of r and p will automatically correspond to v.                                                                                                                                  | yes      |
  | strength | The pattern<br/>For example: 20;20;5;20;10                                                                                                                                                                                                                                                       | string | No more than 50 parameters. Use semicolon `;` to separate every strength.                                                                                                                    | yes      |
  | timeSec  | Total running time                                                                                                                                                                                                                                                                               | double | 0 = indefinite length <br/> Otherwise, running time should be greater than 1.                                                                                                                | yes      |
  | toy      | Toy ID                                                                                                                                                                                                                                                                                           | string | If you don’t include this, it will apply to all toys                                                                                                                                         | no       |
  | apiVer   | The version of the request                                                                                                                                                                                                                                                                       | int    | Always use 2                                                                                                                                                                                 | yes      |

  **Request Example**:

  ```json
  // Vibrate the toy as defined. The interval between changes is 1 second. Total running time is 9 seconds.
  {
    "token": "FE1TxWpTciAl4E2QfYEfPLvo2jf8V6WJWkLJtzLqv/nB2AMos9XuWzgQNrbXSi6n",
    "uid": "1ads22adsf",
    "command": "Pattern",
    "rule": "V:1;F:v;S:1000#",
    "strength": "20;20;5;20;10",
    "timeSec": 9,
    "apiVer": 2
  }
  ```

  ```json
  // Vibrate the toys as defined. The interval between changes is 0.1 second. Total running time is 9 seconds.
  // If the toys include Nora or Max, they will automatically rotate or pump, you don't need to define it.
  {
    "token": "FE1TxWpTciAl4E2QfYEfPLvo2jf8V6WJWkLJtzLqv/nB2AMos9XuWzgQNrbXSi6n",
    "uid": "1ads22adsf",
    "command": "Pattern",
    "rule": "V:1;F:v,r,p;S:100#",
    "strength": "20;20;5;20;10",
    "timeSec": 9,
    "apiVer": 2
  }
  ```

- Preset Request

  **API URL**: `https://api.lovense-api.com/api/lan/v2/command`

  **Request protocol**: HTTPS Request

  **Method**: POST

  **Request Content Type**: application/json

  **Request Format**: JSON

  **Parameters**:

  | Name    | Description                | Type   | Note                                                                                                                                                                                         | Required |
  | ------- | -------------------------- | ------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------- |
  | token   | Your developer token       | string |                                                                                                                                                                                              | yes      |
  | uid     | Your user’s ID             | string | To send commands to multiple users at the same time, add all the user IDs separated by commas. The toy parameter below will be ignored and the commands will go to all user toys by default. | yes      |
  | command | Type of request            | String | /                                                                                                                                                                                            | yes      |
  | name    | Preset pattern name        | string | We provide four preset patterns in the Lovense Remote app: pulse, wave, fireworks, earthquake                                                                                                | yes      |
  | timeSec | Total running time         | double | 0 = indefinite length <br/> Otherwise, running time should be greater than 1.                                                                                                                | yes      |
  | toy     | Toy ID                     | string | If you don’t include this, it will be applied to all toys                                                                                                                                    | no       |
  | apiVer  | The version of the request | int    | Always use 1                                                                                                                                                                                 | yes      |

  **Request Example**:

  ```json
  // Vibrate the toy with pulse pattern, the running time is 9 seconds.
  {
    "token": "FE1TxWpTciAl4E2QfYEfPLvo2jf8V6WJWkLJtzLqv/nB2AMos9XuWzgQNrbXSi6n",
    "uid": "1adsf2323",
    "command": "Preset",
    "name": "pulse",
    "timeSec": 9,
    "apiVer": 1
  }
  ```

**Response Example**:

```json
{
  "result": true,
  "code": 200,
  "message": "Success"
}
```

**Server Error Codes**:

| Code | Message                                    |
| ---- | ------------------------------------------ |
| 200  | Success                                    |
| 400  | Invalid command                            |
| 404  | Invalid Parameter                          |
| 501  | Invalid token                              |
| 502  | You do not have permission to use this API |
| 503  | Invalid User ID                            |
| 507  | Lovense APP is offline                     |
