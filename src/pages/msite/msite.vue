<template>
  <div class="wrapper">
    <div class="header"></div>
    <div class="foodentry-wrapper"></div>
    <h3 class="index-title">推荐商家</h3>
    <section class="shoplist" v-infinite-scroll="loadMore" infinite-scroll-disabled='busy' infinite-scroll-distance='60'
             infinite-scroll-immediate-check='false' ref="shopList">
      <shoplist :shop='item' v-for='(item,index) in shoplist' :class="[`shop-${index}`]" :link="goToShop"></shoplist>
    </section>

  </div>
</template>

<script>
  import {getshoplist} from '../../assets/js/fetchData.js'
  import shoplist from '../../components/shoplist/index.vue'
  export default {
    name: 'msite',
    data() {
      return {
        shoplist: [],
        busy: false,
        loadedComputed: false,
        offset: 0,
        limit: 20
      }
    },
    components: {
      shoplist
    },
    methods: {
      loadMore() {
        var self = this;
        if (!this.loadedComputed) {
          this.busy = true;
          getshoplist({
            latitude: 22.572909,
            longitude: 113.86192,
            offset: this.offset,
            limit: this.limit
          }).then(res => {
            res = res.data;
            if (res.length < self.limit) {
              self.loadedComputed = true;
            }
            self.shoplist = self.shoplist.concat(res);
            self.offset += self.limit;
            self.busy = false;
          })
        }
      },
      goToShop(e) {
        window.location.href = `/shop/#geohash${this.geohash}&id=${e}`
      }
    },
    created() {
      this.loadMore()
    }
  }
</script>

<style lang="less">
  .wrapper {
    .header {
      width: 100%;
      height: 250px;
      background-color: #0096ff;
    }
    .foodentry-wrapper {
      min-height: 354px;
      border-bottom: 1px solid #eee;
      background-color: #fff;
    }
    .index-title {
      margin-top: 20px;
      line-height: 68px;
      font-weight: 600;
      background-color: #fff;
      border-top: 1px solid #eee;
      border-bottom: 1px solid #eee;
      font-size: 30px;
      padding-left: 30px;
    }
  }
</style>
