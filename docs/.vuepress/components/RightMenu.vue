<template>
  <div class="rightMenu">
    <div class="title">
      Got Stuck?
    </div>
    <div class="urlBox" @click="forumClick">
      <div class="name">Forum for Lovense Developers</div>
      <div class="desc">{{selectItem.desc}}</div>
    </div>
    <div class="support" @click="supportClick">Support</div>
    <div class="docment" @click="feedbackClick">
      Document Feedback
    </div>
  </div>
</template>

<script>
export default {
  name: "rightMenu",
  data(){
    return{
      urlData:{
        '/docs/standard-solutions.html':{
           url:'https://forum.developer.lovense.com/c/standard-solutions/5',
           desc:'Click to explore the release pose for Standard Solutions'
        },
        '/docs/standard-solutions/standard-api.html':{
          url:'https://forum.developer.lovense.com/c/standard-solutions/standard-api/6',
          desc:'Click to explore the release pose for Standard API'
        },
        '/docs/standard-solutions/standard-js-sdk.html':{
          url:'https://forum.developer.lovense.com/c/standard-solutions/basic-js-sdk/8',
          desc:'Click to explore the release pose for Standard JS SDK'
        },
        '/docs/standard-solutions/socket-api.html':{
          url:'https://forum.developer.lovense.com/c/standard-solutions/standard-socket-api/7',
          desc:'Click to explore the release pose for Standard Socket API'
        },
        '/docs/cam-solutions.html':{
          url:'https://forum.developer.lovense.com/c/cam-solutions/9',
          desc:'Click to explore the release pose for Cam Solutions'
        },
        '/docs/cam-solutions/cam-extension-for-chrome.html':{
          url:'https://forum.developer.lovense.com/c/cam-solutions/cam-extension-for-chrome/10',
          desc:'Click to explore the release pose for Cam Extension for Chrome'
        },
        '/docs/cam-solutions/cam-kit-for-web.html':{
          url:'https://forum.developer.lovense.com/c/cam-solutions/cam-kit-for-web/11',
          desc:'Click to explore the release pose for Cam Kit for Web'
        },
        '/docs/cam-solutions/display-panel.html':{
          url:'https://forum.developer.lovense.com/c/cam-solutions/9',
          desc:'Click to explore the release pose for Cam Solutions'
        },
        '/docs/cam-solutions/basic-api.html':{
          url:'https://forum.developer.lovense.com/c/cam-solutions/custom-cam-solution/12',
          desc:'Click to explore the release pose for Custom Cam Solution'
        },
        '/docs/cam-solutions/basic-js-sdk.html':{
          url:'https://forum.developer.lovense.com/c/cam-solutions/custom-cam-solution/12',
          desc:'Click to explore the release pose for Custom Cam Solution'
        },
        '/docs/cam-solutions/socket-api.html':{
          url:'https://forum.developer.lovense.com/c/cam-solutions/custom-cam-solution/12',
          desc:'Click to explore the release pose for Custom Cam Solution'
        },
        '/docs/native-sdks.html':{
          url:'https://forum.developer.lovense.com/c/native-sdks/13',
          desc:'Click to explore the release pose for Native SDKs'
        },
        '/docs/native-sdks/ios-native-sdk.html':{
          url:'https://forum.developer.lovense.com/c/native-sdks/ios-sdk/14',
          desc:'Click to explore the release pose for IOS SDK'
        },
        '/docs/native-sdks/android-native-sdk.html':{
          url:'https://forum.developer.lovense.com/c/native-sdks/android-sdk/15',
          desc:'Click to explore the release pose for Android SDK'
        },
        '/docs/native-sdks/windows-native-sdk.html':{
          url:'https://forum.developer.lovense.com/c/native-sdks/windows-sdk/16',
          desc:'Click to explore the release pose for Windows SDK'
        }
      },
      selectItem:{}
    }
  },
  watch: {
    $route: {
      handler: function (val, oldVal) {
        for (let urlDataKey in this.urlData) {
          if(val.path.indexOf(urlDataKey)!=-1){
            this.selectItem = this.urlData[urlDataKey] || {}
          }
        }
      },
      immediate: true,
    },
  },
  methods: {
    supportClick() {
      this.$router.push({
        path: '/docs/faq.html'
      })
    },
    feedbackClick() {
      let url = process.env.NODE_ENV === "test"
        ? "https://test1.lovense.com/developer-feedback-test/#/give-feedback"
        : "https://developers.lovense.com/front/developer-feedback/#/give-feedback"
      window.open(url)
    },
    forumClick(){
      if(this.selectItem?.url){
        window.open(this.selectItem.url)
      }
    }
  }
}
</script>

<style scoped lang="scss">
@media (max-width: 1500px) {
  .rightMenu{
    position: fixed !important;
    top: 80px !important;
    right: 2% !important;
  }
}
.rightMenu {
  position: fixed;
  top: 80px;
  right: 5%;
  padding: 32px 16px;
  background: radial-gradient(81.9% 81.9% at 73.82% 18.1%, rgba(237, 255, 241, 0.1) 0%, rgba(0, 255, 179, 0) 100%)
    /* warning: gradient uses a rotation that is not supported by CSS and may not behave as expected */
    , linear-gradient(68.17deg, #FFFAFA 48.46%, rgba(252, 240, 255, 0.69) 87.84%);
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.04);
  border-radius: 16px;
  width: 14.38%;
  z-index: 100000;

  .title {
    font-family: 'Open Sans';
    font-style: normal;
    font-weight: 700;
    font-size: 18px;
    line-height: 26px;
    text-align: center;
    color: #121212;
  }

  .urlBox {
    padding: 16px 24px;
    background: #FFFFFF;
    border-radius: 12px;
    margin-top: 16px;
    cursor: pointer;
    font-family: 'Open Sans';
    font-style: normal;
    font-weight: 600;
    font-size: 14px;
    line-height: 19px;

    .desc {
      font-family: 'Open Sans';
      font-style: normal;
      font-weight: 400;
      font-size: 12px;
      line-height: 16px;
      color: #8A8A8A;
      margin-top: 5px;

    }
  }

  .urlBox:hover {
    background: rgba(255, 45, 137, 0.1);
    border-radius: 12px;
  }

  .support {
    padding: 16px 24px;
    background: #FFFFFF;
    border-radius: 12px;
    margin-top: 12px;
    cursor: pointer;
    font-weight: 500;
  }

  .support:hover {
    background: rgba(255, 45, 137, 0.1);
    border-radius: 12px;
  }

  .docment {
    padding: 16px 24px;
    background: #FFFFFF;
    border-radius: 12px;
    margin-top: 12px;
    cursor: pointer;
    font-weight: 500;
  }

  .docment:hover {
    background: rgba(255, 45, 137, 0.1);
    border-radius: 12px;
  }
}
</style>
