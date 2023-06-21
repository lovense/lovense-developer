String url= "https://api.lovense-api.com/api/lan/v2/qrcode";
Map<String, String> requestParameter = new HashMap<String, String>();
//TODO initialize your parameters:
requestParameter.put("token", "{Lovense developer token}");
requestParameter.put("uid", "{user ID on your website}");
requestParameter.put("uname", "{user nickname on your website}");
requestParameter.put("utoken", "{Encrypted user token on your application. This is a security consideration, to avoid others stealing control of the toy.}");
requestParameter.put("v", 2);
HttpPost httpPost = new HttpPost(url);
List<NameValuePair> nameValuePairs = new ArrayList<NameValuePair>();
if (requestParameter != null && !requestParameter.isEmpty()) {
  Set<String> keys = requestParameter.keySet();
  for (String key : keys) {
    nameValuePairs.add(new BasicNameValuePair(key, requestParameter.get(key)));
  }
}
httpPost.setEntity(new UrlEncodedFormEntity(nameValuePairs, "utf-8"));