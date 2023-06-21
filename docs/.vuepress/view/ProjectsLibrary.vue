<template>
   <div class="ProjectsLibrary">
     <div class="title">Projects Library</div>
     <div class="remake">View the online projects of these excellent developers.</div>
     <div class="cardBox">
       <div class="card" v-for="(item,index) in ProjectData" :key="index" @click="cardItem(item)">
          <div class="head">
            <div class="left">
              <img src="../../assets/projectsLibrary/projectIcon.png" alt="">
            </div>
            <div class="right">
               <div class="name">{{item.projectName}}</div>
               <div class="descProject">by {{item.publisher}}</div>
            </div>
          </div>
          <p class="desc">
            {{item.description}}
          </p>
         <div class="btn">
           Learn More
         </div>
       </div>
     </div>
     <div class="sharBox">
       <div class="title">Share Your Project</div>
       <div class="uploadBox">
          <div class="icon">
            <img src="../../assets/projectsLibrary/uploder.png" alt="">
          </div>
          <div class="desc">
            Are you using our API or SDK to build something awesome? Share your project with us and get a chance to be featured in our project library, where thousands of developers can discover your work.
          </div>
         <div class="btn">
           <button class="button-submit" @click="subClick">Submit Your Application</button>
         </div>
       </div>
     </div>
   </div>
</template>

<script>
import {queryProjectList} from '../api/projectsLibrary'
export default {
  name: "ProjectsLibrary",
  data(){
   return{
     ProjectData:[
     ]
   }
  },
  mounted(){
    this.queryProjectList()
  },
  methods:{
    queryProjectList(){
      queryProjectList().then(res=>{
        if(res.result){
          this.ProjectData = res.data?.list
        }
      })
    },
    cardItem(item){
      window.open(item.projectLinkPrefix+item.projectLink)
    },
    subClick(){
      window.open('https://forms.gle/bLuPenqiFqqvqXZE7')
    }
  }
}
</script>

<style scoped lang="scss">
.ProjectsLibrary{
  padding: 100px 0;
  width: 1200px;
  margin: 0 auto;
  .title{
    text-align: center;
    font-family: 'Open Sans';
    font-style: normal;
    font-weight: 700;
    font-size: 32px;
    line-height: 50px;
    color: #121212;
  }
  .remake{
    font-family: 'Open Sans';
    font-style: normal;
    font-weight: 400;
    font-size: 18px;
    line-height: 26px;
    text-align: center;
    color: #4A4A4A;
    margin-top: 10px;
  }
  .cardBox{

    margin-top: 60px;
    .card{
      cursor: pointer;
      margin-bottom: 30px;
      margin-right: 30px;
      display: inline-block;
      padding: 32px;
      gap: 24px;
      isolation: isolate;
      width: 26.3%;
      background: radial-gradient(81.9% 81.9% at 73.82% 18.1%, rgba(237, 255, 241, 0.1) 0%, rgba(0, 255, 179, 0) 100%) /* warning: gradient uses a rotation that is not supported by CSS and may not behave as expected */, linear-gradient(68.17deg, #FFFFFF 48.46%, rgba(252, 240, 255, 0.69) 87.84%);
      box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.04);
      border-radius: 16px;
      overflow:hidden;
      .head{
        width: 100%;
        display: flex;
        .left{
          display: inline-block;
          width: 37.5px;
          height: 37.5px;
          img{
            height: 100%;
            width: 100%;
          }
        }
        .right{
          display: inline-block;
          vertical-align: top;
          margin-left: 17.25px;
          overflow: hidden;
          width: 100%;
          height: 80px;
          flex: 1;
          .name{
            font-family: 'Open Sans';
            font-style: normal;
            font-weight: 700;
            font-size: 22px;
            vertical-align: top;
            overflow: hidden;
            text-overflow: ellipsis;
            display:-webkit-box;
            -webkit-box-orient:vertical;
            -webkit-line-clamp:2;
            word-break:break-all;
            width: 100%;
          }
          .descProject{
            font-family: 'Open Sans';
            font-style: normal;
            font-weight: 400;
            font-size: 12px;
            line-height: 16px;
            color: #8A8A8A;
            margin-top: 4px;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
          }
        }
      }
      .desc{
        font-family: 'Open Sans';
        width: 100%;
        height: 210px;
        font-style: normal;
        font-weight: 400;
        font-size: 14px;
        line-height: 19px;
        color: #121212;
        margin-top: 24px;
        overflow: hidden;
        text-overflow: ellipsis;
        display:-webkit-box;
        -webkit-box-orient:vertical;
        -webkit-line-clamp:11;
      }
      .btn{
        font-family: 'Open Sans';
        font-style: normal;
        font-weight: 600;
        font-size: 14px;
        line-height: 19px;
        color: #FF2D89;
        margin-top: 24px;
      }
    }
    .card:nth-child(3n){
      margin-right: 0px;
    }
  }
  .sharBox{
    margin-top: 80px;
    cursor: pointer;
    .title{
      font-family: 'Open Sans';
      font-style: normal;
      font-weight: 700;
      font-size: 32px;
      line-height: 50px;
      text-align: center;
      color: #121212;
    }
    .uploadBox{
      margin-top: 40px;
      padding: 64px 100px;
      background: radial-gradient(81.9% 81.9% at 73.82% 18.1%, rgba(237, 255, 241, 0.1) 0%, rgba(0, 255, 179, 0) 100%) /* warning: gradient uses a rotation that is not supported by CSS and may not behave as expected */, linear-gradient(68.17deg, #FFFFFF 48.46%, rgba(252, 240, 255, 0.69) 87.84%);
      box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.04);
      border-radius: 16px;
      .icon{
        width: 86px;
        height: 64px;
        text-align:center;
        margin: 0 auto;
        img{
          height: 100%;
          width: 100%;
        }
      }
      .desc{
        margin-top: 32px;
        text-align: center;
        font-family: 'Open Sans';
        font-style: normal;
        font-weight: 400;
        font-size: 18px;
        line-height: 26px;
        text-align: center;
        color: #121212;
      }
      .btn{
        text-align: center;
        margin-top: 48px;
        .button-submit{
          border: none;
          padding: 16px 48px;
          gap: 12px;
          width: 307px;
          background: #FF2D89;
          border-radius: 16px;
          color: #fff;
          cursor: pointer;
          font-size: 18px;
          font-weight: 700;
        }
      }
    }
  }
}
</style>
