<template>
<div class="footerBox">
   <div class="desc1">Copyright ©2009-2023 by HYTTO PTE. LTD.</div>
   <a class="desc2" href="https://www.lovense.com/privacy-policy" target="_blank">Privacy Policy</a>
   <div class="point">·</div>
   <a class="desc2" href="https://www.lovense.com/terms-and-conditions" target="_blank">T&C</a>
   <div class="point">·</div>
   <a class="desc2" href="https://www.lovense.com/end-user-license-agreement" target="_blank">EULA</a>
   <div class="point">·</div>
   <a class="desc2" href="https://www.lovense.com/cookie-policy" target="_blank">Cookie Policy</a>
   <div class="point">·</div>
   <a class="desc2" href="https://www.lovense.com/security" target="_blank">Security</a>
   <div class="point">·</div>
   <a class="desc2" href="https://www.lovense.com/accessibility-statement" target="_blank">Accessibility Statement</a>
</div>
</template>

<script>
export default {
  name: "Footer"
}
</script>

<style class="footer" lang="scss">
  .footerBox{
    margin-top: 160px;
    height: 60px;
    line-height: 60px;
    text-align: center;
    margin-right: 80px;
    div,a{
      display: inline-block;
      text-decoration: none;
    }
    .desc1{
      margin-right: 80px;
      cursor: pointer;
      color:#999999;
    }
    .desc2{
      cursor: pointer;
      color:#999999;
      font-weight: 400;
      text-decoration: none !important;
    }
    .point{
      margin: 0 10px;
      color:#999999;

    }
  }
</style>
