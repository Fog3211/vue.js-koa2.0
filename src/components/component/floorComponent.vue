<template>
  <div class="floor">
    <div class="floor-title">{{floorTitle}}</div>
    <div class="floor-anomaly">
      <div class="floor-one"><img :src="floorData0.image" width="100%" /></div>
      <div>
        <div class="floor-two"><img :src="floorData1.image" width="100%" /></div>
        <div><img :src="floorData2.image" width="100%" /></div>
      </div>
    </div>
    <div class="floor-rule">
      <div v-for="(item ,index) in floorData.slice(3)" :key="index">
        <img :src="item.image" width="100%" />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ["floorData","floorTitle"],
  data() {
    return {
      floorData0: {},
      floorData1: {},
      floorData2: {}
    };
  },
  watch: {
    floorData: function(val) {
      // console.log(this.floorData);
      this.floorData0 = this.floorData[0];
      this.floorData1 = this.floorData[1];
      this.floorData2 = this.floorData[2];
    }
  }
};
</script>

<style scoped>
.floor-anomaly {
  display: flex;
  flex-direction: row;
  background-color: #fff;
  border: 1px solid #ddd;

}
.floor-anomaly div {
  box-sizing: border-box;
  -webkit-box-sizing: border-box;
}
.floor-one {
  border-right: 1px solid #ccc;
  border-top: 1px solid #ccc;
}
.floor-two {
  border: 1px solid #ccc;
}

.floor-rule {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  background-color: #fff;
}
.floor-rule div {
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  width: 50%;
  border: 1px solid #ccc;
}
.floor-rule div:nth-child(odd) {
  border: 1px solid #ccc;
}
.floor-title{
  font-size: 0.9rem;
  color: magenta;
}
</style>