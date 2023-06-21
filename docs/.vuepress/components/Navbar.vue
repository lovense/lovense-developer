<template>
  <div class="navBar">
    <div class="search">
      <img src="../../assets/navbar/logo.png" class="logo" @click="logoClick">
      <div class="title">Developer</div>
      <div class="navItem">
        <div v-for="(item, index) in navData" :key="index" class="selectItem" @click="navItemClick(index, item)"
          :class="{ 'activeItem': currendIndex === index }" @mouseenter="handleDrop(item, index)">
          {{ item.label }}
          <div class="dropDown" v-if="item.data && item.showDrop" @mouseleave="handleLeave(item)">
            <!--            <div v-for="j in item.data" class="dropItem" @click.stop="goDocument(j)">{{j.label}}</div>-->
            <div v-for="(j, i) in item.data" class="dropItem" :key="i">
              <router-link :to="j.link" @click="goDocument(j)" style="color: #000;">{{ j.label }}</router-link>
              <div class="coming" v-if="j.link == '/'">(coming soon)</div>
            </div>

          </div>
          <div :class="{ 'line': currendIndex === index }"></div>
        </div>
      </div>
      <div class="searchDocm">
        <!--        <Docsearch />-->
        <SearchBox />
      </div>
      <div class="btn">
        <button class="btnJoin" @click="joinNowClick">Join Now</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "navbar",
  data() {
    return {
      navData: [
        {
          label: 'Documentation',
          path: '/docs',
          id: 1,
          showDrop: false,
          data: [
            {
              label: 'Standard Solutions',
              link: '/docs/standard-solutions.html',
              key: 1
            },
            {
              label: 'Cam Solutions',
              link: '/docs/cam-solutions.html',
              key: 2
            },
            {
              label: 'Native SDKs',
              link: '/docs/native-sdkhtml',
              key: 3
            },
            // {
            //   label:'Game Engine Plugins',
            //   link:'/',
            //   key:4
            // }
          ]
        },
        {
          label: 'Forum',
          path: '/forum',
          showDrop: false,
          id: 2
        },
        {
          label: 'Projects Library',
          path: '/projectsLibrary',
          showDrop: false,
          id: 3
        },
        {
          label: 'Support',
          path: '/docs/faq.html',
          showDrop: false,
          id: 4
        },
      ],
      flagIndex: -1,
      showDrop: false,
      base: ''
    }
  },
  computed: {
    currendIndex() {
      return this.flagIndex
    },

  },
  watch: {
    $route: {
      handler: function (val, oldVal) {
        // this.navData.forEach((item,index)=>{
        //   if(item.path == val.path || item.path == val.fullPath){
        //     this.navItemClick(index,item)
        //   }
        // })
        // 临时逻辑，如果是/docs/#进来的默认击中第一个
        let arr = ['/docs/standard-solutions.html', '/docs/cam-solutions.html', '/docs/native-sdkhtml']
        if (arr.includes(val.fullPath)) {
          this.flagIndex = 0
        }
      },
      immediate: true,
    },
  },
  created() {
    // console.log(this.$router.currentRoute);
    if (this.$router.currentRoute.value.path) {
      this.navData.forEach((item, index) => {
        if (item.path == this.$router.currentRoute.value.path) {
          this.navItemClick(index, item)
        }
      })
    } else {
      this.flagIndex = -1
    }
    // console.log(this.$router);
  },
  methods: {
    logoClick() {
      this.$router.push({
        path: '/'
      })
      this.flagIndex = -1
    },
    navItemClick(index, item) {
      if (item.id == 1) return
      item.showDrop = false
      // window.localStorage.setItem('flagIndex',index)
      if (item.id == 2) {
        window.open('https://forum.developer.lovense.com/')
      }
      if (item.id == 3) {
        this.$router.push({
          path: '/projectsLibrary'
        })
      }
      if (item.id == 4) {
        this.$router.push({
          path: '/docs/faq.html'
        })
      }
      this.flagIndex = index
      console.log('index', this.flagIndex);
    },
    joinNowClick() {
      window.open('https://www.lovense.com/sextoys/developer/join')
    },
    goDocument(item) {
      // window.location.href = item.link
      if (item.key == 4) return
      this.flagIndex = 0
    },
    handleDrop(item, index) {
      if (item.data) {
        item.showDrop = true
      } else {
        this.navData.forEach(res => {
          if (res.id == item.id) {
            res.showDrop = true
          } else {
            res.showDrop = false
          }
        })
      }
      // this.flagIndex = index;
    },
    handleLeave(item) {

      this.flagIndex = -1
      if (item.id == 1) {
        item.showDrop = false
        this.flagIndex = 0
      }

    }
  }
}
</script>

<style scoped lang="scss">
.navBar {
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  z-index: 10;
  padding: 10px 50px;
  background-color: #fff;
  min-width: 1200px;
}

.main-width {
  margin: 0 auto;
  max-width: 1500px;
  min-width: 1200px;
  width: 62.5%;
}

.search {
  background-color: #fff;
  display: flex;
  align-items: center;

  .logo {
    vertical-align: middle;
    cursor: pointer;
    height: 16px;
  }

  .title {
    vertical-align: middle;
    display: inline-block;
    font-size: 14px;
    margin-left: 10px;
    font-weight: 500;
  }

  .navItem {
    display: inline-block;
    text-align: right;
    flex: 1;

    .selectItem {
      display: inline-block;
      margin-right: 50px;
      cursor: pointer;
      font-family: 'Open Sans';
      font-style: normal;
      font-weight: 400;
      font-size: 14px;
      color: #4A4A4A;
      position: relative;

      &.activeItem {
        color: #121212;
        font-weight: 600;
      }

      .dropDown {
        width: 202px;
        position: absolute;
        left: 0px;
        top: 40px;
        padding: 24px 32px;
        background: #FFFFFF;
        border-radius: 12px;
        font-weight: 400;
        box-shadow: 2px 2px 5px #ccc;
        padding-left: 10px;
        text-align: left;
        font-family: 'Open Sans';
        font-style: normal;
        font-size: 14px;
        line-height: 20px;
        color: #121212;

        :hover {
          font-family: 'Open Sans';
          font-style: normal;
          font-weight: 600;
          font-size: 14px;
          line-height: 20px;
          color: #FF2D89;
        }

        .dropItem {
          padding: 10px;
          cursor: pointer;
          display: block;
          color: #000;
        }

        .coming {
          font-size: 12px;
          color: #8A8A8A;
        }
      }

      .line {
        height: 2px;
        width: 30px;
        background: #000;
        position: absolute;
        top: 35px;
        left: 50%;
        transform: translateX(-50%);
      }

    }


  }
}

.searchDocm {
  width: 170px;
  display: inline-block;
  margin-right: 30px;
}

.btn {
  display: inline-block;
  width: 109px;
  height: 30px;
  vertical-align: middle;
  margin-right: 100px;

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
