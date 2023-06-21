---
head:
  - [meta, { name: description , content: 'Lovense Developer: Standard solutions available on Google Play and the App Store to integrate Lovense Remote' }]

pageClass: docment-class-page
prev: false
next: false
---
<RightMenu></RightMenu>
# Introduction

Our Standard Solutions enable sending commands to Lovense toys by HTTPS or WebSocket. This is most commonly used by developers of games and other apps.

#### Standard API

A simple method to send commands to Lovense toys.

<div class="standard-model">
  <div class="title">For integrating with</div>
  <div class="apply">  
    <div class="model-list">
      <div class="item">PC Games</div>
      <div class="item">PC Applications</div>
    </div>
    <div class="model-list model2">
      <div class="item">Web Games</div>
      <div class="item">Web Applications</div>
    </div>
  </div>
</div>

[See the Documentation](./standard-solutions/standard-api.md)

#### Standard Socket API

If you are familiar with WebSocket, we recommend using a socket connection based solution.

[See the Documentation](./standard-solutions/socket-api.md)

#### Standard JS SDK

For a web	application, we recommend using the	[Standard JS SDK](./standard-solutions/standard-js-sdk.md).

[See the Documentation](./standard-solutions/standard-js-sdk.md)






<!-- These solutions allow you to control users' Lovense toys by simple HTTPS request. -->

<!-- If you want to integrate with your website or web app, we suggest you use our [Standard JS API](#standard-js-api). -->

If you integrate a Standard Solution, your users must use Lovense Remote to pair their toys. Lovense Remote is available on Google Play and the App Store.

![Lovense Remote App](https://cdn.lovense-api.com/front/web/static/img/pic5.png)

We offer two different ways of data forwarding solution

- [Standard API](./standard-solutions/standard-api.md): based on http callbackUrl
- [Standard Socket API](./standard-solutions/socket-api.md): based on socket communication

If you are a web application developer, We recommend that you use the [Standard JDK](./standard-solutions/standard-js-sdk.md) directly, it is a javascript implementation of the [Standard Socket API](./standard-solutions/socket-api.md) solution.


