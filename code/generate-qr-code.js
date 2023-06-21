const result = async axios.post('https://api.lovense-api.com/api/lan/v2/qrcode',
  {
    token: 'your developer token',  // Lovense developer token
    uid: '11111',  // user ID on your website
    uname: 'user name', // user nickname on your website
    utoken: md5(uid + 'salt'),  // This is for your own verification purposes. We suggest you to generate a unique token/secret for each user. This allows you to verify the user and avoid others faking the calls.
    v: 2
  }
)