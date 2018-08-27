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

    <!--Recommend goods area-->
    <div class="recommend-area">
      <div class="recommend-title">
        商品推荐
      </div>
      <div class="recommend-body">
        <!--swiper-->
        <swiper :options="swiperOption">
          <swiper-slide v-for=" (item ,index) in recommendGoods" :key="index">
            <div class="recommend-item">
              <img v-lazy="item.image" width="80%" />
              <div>{{item.goodsName}}</div>
              <div>￥{{item.price}} (￥{{item.mallPrice}})</div>
            </div>
          </swiper-slide>
        </swiper>
      </div>
    </div>

    <!--floor one area-->
    <floor-component :floorData="floor1" :floorTitle="floorName.floor1"></floor-component>
    <floor-component :floorData="floor2" :floorTitle="floorName.floor2"></floor-component>
    <floor-component :floorData="floor3" :floorTitle="floorName.floor3"></floor-component>

    <!--Hot Area-->
    <div class="hot-area">
      <div class="hot-title">热卖商品</div>
      <div class="hot-goods">
        <van-list>
          <van-row>
            <van-col span="12" v-for="(item , index) in hotGoods" :key="index">
              <goods-info :goodsId="item.goodsId" :goodsImage="item.image" :goodsName="item.name" :goodsPrice="item.price">
              </goods-info>
            </van-col>
          </van-row>
        </van-list>
      </div>
    </div>

  </div>

</template>
 
<script>
import axios from "axios";
import "swiper/dist/css/swiper.css";
import { swiper, swiperSlide } from "vue-awesome-swiper";
import floorComponent from "../component/floorComponent";
import toMoney from "@/filter/moneyFilter.js";
import goodsInfo from "../component/goodsInfoComponent";
import url from "@/serviceAPI.config.js";

export default {
  data() {
    return {
      locationIcon: require("../../assets/images/location.png"),
      category: [],
      adBanner: "",
      bannerPicArray: [],
      recommendGoods: [],
      swiperOption: {
        slidesPerView: 3
      },
      floor1: [],
      floor2: [],
      floor3: [],
      floorName: {},
      hotGoods: []
    };
  },
  filters: {
    moneyFilter(money) {
      return toMoney(money);
    }
  },
  components: { swiper, swiperSlide, floorComponent, goodsInfo },
  created() {
    axios({
      url: url.getShoppingMallInfo,
      method: "get"
    })
      .then(response => {
        if (response.status == 200) {
          this.category = response.data.data.category;
          this.adBanner = response.data.data.advertesPicture; //获得广告图片
          this.bannerPicArray = response.data.data.slides; //轮播图片
          this.recommendGoods = response.data.data.recommend; //推荐商品
          // 获取楼层数据
          this.floor1 = response.data.data.floor1; //楼层1数据
          this.floor2 = response.data.data.floor2; //楼层2数据
          this.floor3 = response.data.data.floor3; //楼层3数据
          this.floorName = response.data.data.floorName; //楼层标题
          this.hotGoods = response.data.data.hotGoods; //热卖商品
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
  background: rgba(0, 0, 0, 0);
  margin-left: 0.4rem;
  border: 0;
  font-size: 1rem;
  min-width: 2rem;
  min-height: 1.2rem;
  color: orangered;
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

.recommend-area {
  background-color: #fff;
  margin-top: 0.3rem;
  font-size: 0.8rem;
}
.recommend-title {
  border-bottom: 1px solid #eee;
  padding: 0.2rem;
  color: #e5017d;
}

.recommend-body {
  border-bottom: 1px solid #ccc;
}

.recommend-item {
  width: 99%;
  border-right: 1px solid #eee;
  text-align: center;
  font-size: 0.7rem;
}

.hot-title {
  color: #e5017d;
}
</style>