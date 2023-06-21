

<template>
  <ParentLayout>
    <!--    <template #navbar class="search">-->
    <!--&lt;!&ndash;      <Navbar></Navbar>&ndash;&gt;-->
    <!--    </template>-->
    <template #navbar-after>
      <div class="btn">
        <button class="btnJoin" @click="joinNowClick">Join Now</button>
      </div>
    </template>
    <template #sidebar-bottom v-if="showSiderBtn">
      <div class="bottom-btn" :style="{ width: btnBoxWidth + 'px' }">
        <button class="sidebar-botton" @click="technicalSupport">Contact for technical support</button>
      </div>
    </template>
    <template #page-bottom v-if="showFooter">
      <div class="my-footer">
        <div class="title">
          Explore our Forum or Support to get more inspiration or solve your problems.
          <div class="drop">
            <div class="icon" v-if="showDeveloper" @click="chageDeveloper">
              <img src="../../assets/footer/dropDown.png" alt="">
            </div>
            <div class="icon" v-else @click="chageDeveloper">
              <img src="../../assets/footer/dropUp.png" alt="">
            </div>
          </div>
        </div>
        <div class="Box" v-if="showDeveloper">
          <div class="card" v-for="(item, index) in developerData" :key="index" @click="footerItemClick(item)">
            <div class="left">
              <img :src="item.image" alt="">
            </div>
            <div class="right">
              <div class="name">{{ item.name }}</div>
              <div class="desc">{{ item.desc }}</div>
            </div>
          </div>
        </div>
      </div>
    </template>


  </ParentLayout>
</template>
<script setup>
import ParentLayout from '@vuepress/theme-default/layouts/Layout.vue'
import Forum from '../../assets/footer/Forum.png'
import DiscorrdChannel from '../../assets/footer/DiscorrdChannel.png'
import Support from '../../assets/footer/Support.png'
import { ref, watch, unref, onMounted, nextTick } from 'vue'
import { useRouter, useRoute } from 'vue-router'
const developerData = [
  {
    name: 'Forum',
    desc: 'It is a place for Lovense developers to communicate, where you can find solutions to problems or get inspired for your projects.',
    image: Forum,
    id: 1
  },
  {
    name: 'Discord Channel',
    desc: 'It is an online real-time channel where you can communicate directly with our official administrators or many excellent developers.',
    image: DiscorrdChannel,
    id: 2
  },
  {
    name: 'Support',
    desc: 'Find documents and tutorials that may be helpful to you.',
    image: Support,
    id: 3
  }
]
const showDeveloper = ref(true)
const chageDeveloper = () => {
  showDeveloper.value = !showDeveloper.value
}

const showFooter = ref(true)
const router = useRouter()
const route = useRoute();
const showSiderBtn = ref(false)
const btnBoxWidth = ref(0)
onMounted(() => {
  let path = router.currentRoute.value.path
  if(path=='/docs/faq.html'){
    showSiderBtn.value = true
  }else {
    showSiderBtn.value = false
  }
  let hideFooterPath = ['/docs/faq.html']
  hideFooterPath.forEach(item=>{
    if(path.indexOf(item)!=-1){
      showFooter.value = false
    }
  })
  nextTick(() => {
    btnBoxWidth.value = document.querySelector('.sidebar').clientWidth
  })
})
watch(
  () => unref(router.currentRoute).path,
  (val) => {
    let hideFooterPath = ['/docs/faq.html']
    val.indexOf('docs')!= -1 ? showFooter.value = true : showFooter.value = false
    hideFooterPath.forEach(item=>{
      console.log(val.indexOf(item) != -1);
      if(val.indexOf(item)!=-1){
        showFooter.value = false
      }
    })
    if(val.indexOf('/docs/faq.html')!= -1){
      showSiderBtn.value = true
    }else {
      showSiderBtn.value = false
    }
  },
);
const footerItemClick = (item) => {
  if (item.id == 1) {
    window.location.href = 'https://forum.developer.lovense.com/'
  }
  if (item.id == 2) {
    window.location.href = 'https://discord.com/invite/dW9f54BwqR'
  }
  if (item.id == 3) {
    router.push({
      path: '/docs/faq.html'
    })
  }
}
const technicalSupport = () => {
  window.open('https://developers.lovense.com/front/developer-feedback/#/give-feedback')
}
const joinNowClick = () => {
  window.open('https://www.lovense.com/sextoys/developer/join')
}
</script>
<style lang="scss" scoped>
@media (max-width: 1400px) {
  .my-footer{
    .title{
      font-size: 18px !important;
    }
   .Box .card .right .desc{
     font-size: 12px !important;
    }
    .title .drop{
      position: absolute !important;
      right: -20px !important;
      top: 15px !important;
    }
  }
}
.my-footer {
  padding: 32px 40px;
  background: radial-gradient(81.9% 81.9% at 73.82% 18.1%, rgba(237, 255, 241, 0.1) 0%, rgba(0, 255, 179, 0) 100%)
    /* warning: gradient uses a rotation that is not supported by CSS and may not behave as expected */
    , linear-gradient(68.17deg, #FFFFFF 48.46%, rgba(252, 240, 255, 0.69) 87.84%);
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.04);
  border-radius: 16px;
  margin: 0 30% 0 40px;

  .title {
    font-family: 'Open Sans';
    font-style: normal;
    font-weight: 700;
    font-size: 20px;
    line-height: 26px;
    color: #121212;
    position: relative;
    text-align: center;

    .drop {
      position: absolute;
      right: 0px;
      top: 50%;
      transform: translateY(-50%);
      width: 20px;
      height: 20px;
      cursor: pointer;

      img {
        height: 100%;
        width: 100%;
      }
    }
  }

  .Box {
    display: flex;
    margin-top: 48px;
    .card {
      flex: 1;
      margin-right: 48px;
      cursor: pointer;
      text-align: center;
      .left {
        text-align: center;
        img {
          width: 52px;
          height: 52px;
          min-width: 52px;
          min-height: 52px;
        }
      }
      .right {
        margin-top: 16px;
        .name {
          font-family: 'Open Sans';
          font-style: normal;
          font-weight: 700;
          font-size: 16px;
          line-height: 22px;
          color: #121212;
        }

        .desc {
          font-family: 'Open Sans';
          font-style: normal;
          font-weight: 400;
          font-size: 14px;
          line-height: 20px;
          color: #121212;
          margin-top: 8px;
        }
      }
    }

    .card:nth-child(3n) {
      margin-right: 0px;
    }
  }

}

.bottom-btn {
  width: 310px !important;
  height: 60px;
  position: fixed;
  bottom: 0;
  left: 0;
  background-color: #fff;

  .sidebar-botton {
    border: none;
    height: 44px;
    width: 262px;
    line-height: 44px;
    padding: 0px 32px;
    background: #F7F7F7;
    border-radius: 4px;
    font-family: 'Open Sans';
    font-style: normal;
    font-weight: 600;
    font-size: 14px;
    line-height: 20px;
    color: #4A4A4A;
    position: absolute;
    top: 0%;
    left: 50%;
    transform: translateX(-50%);
    cursor: pointer;
    margin-top: 10px;
  }
}

.btn {
  display: inline-block;
  width: 109px;
  height: 30px;
  vertical-align: middle;
  //margin-right: 100px;
  margin-left: 20px;

  .btnJoin {
    display: inline-block;
    width: 100%;
    height: 100%;
    border: none;
    border-radius: 4px;
    background-color: #FF2D89;
    color: #fff;
    cursor: pointer;
  }
}
</style>
