<template>
  <div class="Home">
    <div class="banner">
      <div class="max-ban">
        <div class="left">
          <div class="title">Lovense Developer Platform</div>
          <div class="desc">Make your product sexier! Lovense provides a complete solution for controlling our toys, applied
            to cam sites, games, apps and other fields, making the user experience more diverse and rich.</div>
        </div>
        <div class="right">
          <img src="../../assets/home/banner.png" alt="">
        </div>
      </div>

    </div>
    <div class="banxin">
      <div class="productCard">
        <div class="title">Our Products</div>
        <div class="cardBox">
          <div class="card" v-for="(item, index) in ourProducts" :key="index">
            <router-link :to="item.link" @mouseenter="() => item.showLine = true" @mouseleave="() => item.showLine = false">
              <div class="imgBox">
                <img :src="item.image">
              </div>
              <div class="remake">
                <div class="name" style="text-decoration: none">{{ item.title }}</div>
                <div class="decs" :class="{ 'card-decs': item.id == 3 || item.id == 4 }" style="text-decoration: none">
                  {{ item.remake }}</div>

                <div class="checkName" v-if="item.id !== 4">
                  {{ item.checkName }}
                  <div class="rightIcon">
                    <img src="../../assets/home/rightIcon.png" alt="">
                  </div>
                </div>
                <div class="coming" v-else>{{ item.checkName }}</div>
                <div class="line" v-show="item.showLine && item.id !== 4"></div>
              </div>
            </router-link>
          </div>
        </div>
      </div>
    </div>

  </div>
</template>

<script>
import camSolutions from '../../assets/home/camSolutions.png'
import gameEnginePlugins from '../../assets/home/gameEnginePlugins.png'
import native from '../../assets/home/native.png'
import standard from '../../assets/home/standard.png'
export default {
  name: "home",
  data() {
    return {
      ourProducts: [
        {
          title: 'Standard Solutions',
          remake: 'Elevate the gaming and APP experience to extraordinary levels of fun! Unlock a world of endless entertainment and excitement with our comprehensive solution designed to control Lovense toys. Let us revolutionize your games and APPs, turning them into an irresistible fusion of pleasure and play.',
          image: standard,
          link: '/docs/standard-solutions',
          checkName: 'Check Documentation',
          id: 1,
          showLine: false
        },
        {
          title: 'Cam Solutions',
          remake: 'Unleash the power of live broadcasts like never before! Elevate the streaming experience to new heights of excitement and thrill with our cutting-edge solution for controlling Lovense Toys. It\'s time to take your broadcasts to the next level of excitement!',
          image: camSolutions,
          link: '/docs/cam-solutions',
          checkName: 'Check Documentation',
          id: 2,
          showLine: false
        },
        {
          title: 'Native SDKs',
          remake: 'A set of tools and resources for developers to create native applications for specific platforms, such as iOS, Android, and Windows.',
          image: native,
          link: '/docs/native-sdks',
          checkName: 'Check Documentation',
          id: 3,
          showLine: false
        },
        {
          title: 'Game Engine Plugins',
          remake: 'With support for Unity, Unreal, and Renpy, it’s easy to create immersive, engaging experiences. Take your game development to the next level - try it today!',
          image: gameEnginePlugins,
          link: '/',
          checkName: 'Coming soon',
          id: 4,
          showLine: false
        },

      ]
    }
  },
  methods: {
    productItem(item) {
      if (item.id == 4) return
      console.log(item);
      this.$router.push({
        path: item.link || '/'
      })
    }
  }
}
</script>

<style scoped lang="scss">
@media (max-width: 1300px) {
  .Home {
    width: 100% !important;
    min-width: 1280px !important;
    .banxin{
      padding: 0 !important;
      margin: 0 auto !important;
      width: 100% !important;
      .productCard{
        width: 1100px !important;
        margin: 0 auto !important;
        min-width: 1100px !important;
      }
    }


    .card {
      width: 47.8% !important;
      .remake {
        .name {
          font-size: 18px !important;
        }

        .decs {
          font-size: 14px !important;
        }
      }
    }
    .card:nth-child(2n){
      margin-left: 47px !important;
    }
  }
}

.Home {
  overflow: hidden;
  width: 100%;
  .banner {
    padding: 100px 0;
    background-image: url("../../assets/navbar/bg.png");
    background-size: cover;
    width: 100%;
    .max-ban{
      width: 80%;
      min-width: 1100px;
      max-width: 1360px;
      display: flex;
      margin: 0 auto;
    }
    .left {
      flex: 1;
      text-align: left;
      .title {
        font-size: 50px;
        font-weight: 900;
        color: #050739;
      }

      .desc {
        margin-top: 24px;
        font-size: 18px;
      }
    }

    .right {
      flex: 1;
      vertical-align: top;
      margin-left: 60px;
      text-align: right;
      img {
        vertical-align: top;
        width: 408px;
        height: 280px;
        min-height: 280px;
        min-width: 408px;

        :hover {
          display: none !important;
        }
      }
    }
  }
  .banxin{
    padding: 0 10%;
    .productCard {
      margin-top: 18px;
      margin: 0 auto;
      max-width: 1360px;
      .title {
        text-align: center;
        font-weight: 700;
        font-size: 30px;
        margin-top: 18px;
        color: #121212;
      }

      .cardBox {
        margin-top: 50px;
      }

      a {
        text-decoration: none;
      }

      .card {
        width: 47.4%;
        display: inline-block;
        cursor: default;
        margin-bottom: 80px;
        color: #000;

        //text-decoration: none;
        .imgBox {
          height: 300px;
          line-height: 300px;
          vertical-align: middle;
          width: 100%;
          text-align: center;
          background: radial-gradient(81.9% 81.9% at 73.82% 18.1%, rgba(237, 255, 241, 0.1) 0%, rgba(0, 255, 179, 0) 100%)
            /* warning: gradient uses a rotation that is not supported by CSS and may not behave as expected */
          , linear-gradient(68.17deg, #FFFAFA 48.46%, rgba(252, 240, 255, 0.69) 87.84%);
          box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.04);
          border-radius: 16px;

          img {
            width: 231.84px;
            height: 170px;
            vertical-align: middle;
          }
        }

        .remake {
          width: 100%;
          color: #000;

          .name {
            font-family: 'Open Sans';
            font-style: normal;
            font-weight: 700;
            font-size: 32px;
            line-height: 44px;
            margin-top: 24px;
            text-decoration: none !important;
          }

          .decs {
            margin-top: 8px;
            height: 100px;
            width: 100%;
            font-weight: 400;
            overflow: hidden;
            text-overflow: ellipsis;
            display: -webkit-box;
            -webkit-box-orient: vertical;
            -webkit-line-clamp: 5;
            padding-bottom: 10px;
          }

          .card-decs {
            height: 65px !important;
          }

          .checkName {
            font-weight: 500;
            color: #f6418d;
            vertical-align: middle;

            :hover {
              text-decoration: underline;
            }
          }

          .line {
            width: 160px;
            height: 1px;
            background-color: #f6418d;
          }

          .rightIcon {
            width: 16.24px;
            height: 10.49px;
            display: inline-block;

            img {
              background-size: cover;
              margin-left: 12px;
              image-rendering: -moz-crisp-edges;
              /* Firefox */
              image-rendering: -o-crisp-edges;
              /* Opera */
              image-rendering: -webkit-optimize-contrast;
              /*Webkit (non-standard naming) */
              image-rendering: crisp-edges;
              -ms-interpolation-mode: nearest-neighbor;
              /* IE (non-standard property) */
            }
          }
        }
      }

      .card:nth-child(2n) {
        margin-left: 5%;
      }
    }
  }

}

img {
  -webkit-touch-callout: none;
  -webkit-user-select: none;
  -khtml-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
}

.coming {
  color: #8A8A8A !important;
  font-weight: 500;
  color: #f6418d;

  :hover {
    text-decoration: none !important;
  }

  a {
    text-decoration: none !important;
  }
}
</style>
