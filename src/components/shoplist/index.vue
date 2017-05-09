<template>
  <section class="index-container" @click="link(shop.id)">
    <div class="logo-container">
      <div class="logo-main">
        <img v-img="shop.image_path" class="logo-logo" alt="">
      </div>
    </div>
    <div class="index-main">
      <section class="index-line">
        <h3 class="index-shopname"> {{shop.name}}</h3>
        <div class="index-supportWrap" v-show="shop.supports.length!=0">
          <div class="activity-activityWrap activity-nowrap" v-for="support in shop.supports">
            <i class="activity-activityIcon activity-icononly">{{support.icon_name}}</i>
          </div>
        </div>
      </section>
      <section class="index-line">
        <div class="index-rateWrap">
          <span class="index-rate">{{shop.rating}}</span>
          <span>月售{{shop.recent_order_num}}单</span>
        </div>
        <div class="index-deliveryWrap" v-show="shop.delivery_mode">
          <span class="index-iconDelivery">准时达</span>
          <span class="index-iconDelivery index-hollow" >蜂鸟专送</span>
        </div>
      </section>
      <section class="index-line">
        <div class="index-moneylimit">
          <span>¥{{shop.float_minimum_order_amount}}起送</span>
          <span>{{shop.piecewise_agent_fee.tips}}</span>
        </div>
        <div class="index-timedistanceWrap">
          <span class="index-distanceWrap">{{shop.distance>1000?(shop.distance/1000).toFixed(2)+'km':shop.distance+'m'}}</span>
          <span v-show="shop.order_lead_time!=0" class="index-timeWrap">{{shop.order_lead_time}}分钟</span>
        </div>
      </section>
    </div>
  </section>
</template>

<script>
  import utils from '../../assets/js/utils.js'
  export default {
    name: 'hello',
    props:{
      shop:{
        type:Object,
        default(){
          return {}
        }
      },
      link:{
        type:Function,
        default:function () {
//        window.location.href = "eleme://restaurant?restaurant_id=" + this.shop.id + "&animation_type=1"
        }
      },
      actWrap: {
        type: Boolean,
        default: true
      },
      showActivity: {
        type: Boolean,
        default: true
      }
    },
    data() {
      return {

      }
    },
    computed:{

    },
    methods: {

    },
    created() {

    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang='less'>
  .shoplist{
    background-color: #fff;
    .index-container{
      display: flex;
      justify-content: space-between;
      position: relative;
      color: #666;
      font-size: .293333rem;
      border-bottom: 1px solid #eee;
      background-color: #fff;
      .logo-container{
        padding: .4rem .266667rem;
        .logo-main{
          width: 1.6rem;
          height: 1.6rem;
        }
        .logo-logo{
          width: 100%;
          height: 100%;
          border-radius: .053333rem;
        }
      }
      .index-main{
        padding: .4rem .266667rem .4rem 0;
        flex-grow: 1;
        flex-direction: column;
        .index-line{
          display: flex;
          justify-content: space-between;
          align-items: center;
          &:nth-child(2),&:nth-child(3){
            margin-top: .2rem
          }
          .index-shopname{
            font-size: .4rem;
            color: #333;
            font-weight: 700;
            line-height: .426667rem;
            max-width: 5rem;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
            &:before{
              content:"\54C1\724C";
              color: #52250a;
              background-color: #ffd930;
              font-size: .293333rem;
              font-weight: 700;
              vertical-align: top;
              height: .4rem;
              padding: 0 .066667rem;
              margin-right: .133333rem;

            }
          }
          .index-supportWrap{
            display: flex;
            .activity-activityWrap{
              display: flex;
              line-height: .426667rem;
            }
            .activity-activityIcon{
              font-size: .266667rem;
              font-style: normal;
              height: .346667rem;
              line-height: 1;
              padding: .04rem;
              margin-left: .066667rem;
              border: 1px solid;
              text-align: center;
              color: rgb(153, 153, 153);
              border-color: rgb(221, 221, 221);
            }
          }
          .index-rateWrap{
            display: flex;
            align-items: center;
            .index-rate{
              margin: 0 .106667rem;
              color: #ff6600;
            }
          }
          .index-deliveryWrap{
            display: flex;
            .index-iconDelivery{
              padding: 0 .053333rem;
              border: 1px solid #44a5ff;
              border-radius: .053333rem;
              color: #2395ff;
              background-color: #fff;
              font-size: .266667rem;
              line-height: .346667rem;
              &:not(:last-child){
                margin-right: .08rem;
              }
            }
            .index-hollow{
              background-color: #2395ff;
              color: #fff;
            }
          }
          .index-moneylimit{
            display: flex;
            align-items: center;
            span:nth-child(2){
              &:before{
                content: '/';
                color: #ddd;
                margin: 0 .08rem;
              }
            }
          }
          .index-timedistanceWrap{
            display: flex;
            align-items: center;
            .index-distanceWrap{
              color: #999;
            }
            .index-timeWrap{
              color: #2395ff;
              &:before{
                content: '/';
                color: #ddd;
                margin: 0 .08rem;
              }
            }
          }
        }

      }
    }
  }
</style>
