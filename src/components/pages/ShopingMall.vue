<template>
  <div>

    <!--search bar layout-->
    <div class="search-bar">
      <van-row gutter="5">
        <van-col span="3">
          <img :src="locationIcon" width="80%" class="location-icon" />
        </van-col>
        <van-col span="16">
          <input type="text" class="search-input" />
        </van-col>
        <van-col span="5">
          <van-button size="mini" class="search-button">查找</van-button>
        </van-col>
      </van-row>
    </div>

    <!-- swipwer area -->
     <div class="swiper-area">
      <van-swipe :autoplay="2000">
        <van-swipe-item v-for="(banner,index) in bannerPicArray" :key="index">
          <img v-lazy="banner.image" width="100%" />
        </van-swipe-item>
      </van-swipe>
    </div>

    <!--type bar-->
    <div class="type-bar">
      <div v-for="(cate,index) in category" :key="index">
        <img v-lazy="cate.image" width="90%">
        <span>{{cate.mallCategoryName}}</span>
      </div>
    </div>

    <!--AD banner area-->
    <div class="ad">
      <img v-lazy="adBanner.PICTURE_ADDRESS" width="100%">
    </div>

  </div>
</template>
 
<script>
import axios from "axios";

export default {
    data() {
        return {
            locationIcon: require("../../assets/images/location.png"),
            category: [],
            adBanner: "",
            bannerPicArray:[]
        };
    },
    created() {
        axios({
            url: "https://www.easy-mock.com/mock/5b727e2877e37d07a4181f3d/mock",
            method: "get"
        })
            .then(response => {
                if (response.status == 200) {
                    //  console.log(response.status);
                    this.category = response.data.data.category;
                    this.adBanner = response.data.data.advertesPicture; //获得广告图片
                    this.bannerPicArray = response.data.data.slides   //轮播图片
                }
            })
            .catch(error => {
                console.log(error);
            });
    }
};
</script>
 
<style scoped>
.search-bar {
    height: 2.2rem;
    background-color: aquamarine;
    line-height: 2.2rem;
    overflow: hidden;
}
.search-bar img {
    max-width: 2rem;
}
.search-input {
    width: 100%;
    height: 1.3rem;
    border-top: 0px;
    border-left: 0px;
    border-right: 0px;
    border-bottom: 1px solid 1px !important ;
    background-color: aquamarine;
    color: #fff;
}
.location-icon {
    padding-top: 0.2rem;
    padding-left: 0.3rem;
}
.search-button {
    background-color: rgb(228, 230, 145);
    margin-left: 0.4rem;
    border: 0;
    font-size: 1rem;
    min-width: 2rem;
    min-height: 1.2rem;
    color:magenta;
}

.swiper-area {
    clear: both;
    max-height: 15rem;
    overflow: hidden;
}

.type-bar {
    background-color: #fff;
    margin: 0 0.3rem 0.3rem 0.3rem;
    border-radius: 0.3rem;
    font-size: 14px;
    display: flex;
    flex-direction: row;
    flex-wrap: nowrap;
}
.type-bar div {
    padding: 0.3rem;
    font-size: 12px;
    text-align: center;
    flex: 1;
}
.type-bar span {
  font-size: 0.8rem;
}
</style>