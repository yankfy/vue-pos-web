<template>
  <div class="pos">
    <el-row>
      <el-col :span='7' class="pos-order" id="order-list">
        <el-tabs>
          <el-tab-pane label="点餐">
            <el-table :data="tableData" border style="width:100%;" height="250">
              <el-table-column prop="goodsName" label="商品名称" header-align="center"></el-table-column>
              <el-table-column prop="count" label="数量" header-align="center"></el-table-column>
              <el-table-column prop="price" label="金额" header-align="center"></el-table-column>
              <el-table-column prop="option" label="操作" header-align="center" fixed='right'>
                <template scope="scope">
                  <el-button type="text" size="small" @click='delSingleGoods(scope.row)'>删除</el-button>
                  <el-button type="text" size="small" @click='addOrderList(scope.row)'>增加</el-button>
                  <!--将当前行传入数据-->
                </template>
              </el-table-column>
            </el-table>
            <div>
              <p class="totalNum">
                <span>数量：</span>
                <span>{{totalCount}}</span>
                &nbsp;&nbsp;
                <span>金额：</span>
                <span>￥{{totalMoney}}元</span>
              </p>
            </div>
            <div class="order-btns">
              <el-button type="warning">挂单</el-button>
              <el-button type="danger" @click='delAllGoods()'>删除</el-button>
              <el-button type="success" @click="checkOut()">结账</el-button>
            </div>

          </el-tab-pane>
          <el-tab-pane label="挂单">
            挂单
          </el-tab-pane>
          <el-tab-pane label="外卖">
            外卖
          </el-tab-pane>
        </el-tabs>
      </el-col>
      <el-col :span='17' class="pos-show" id="order-show">
        <div class="often-goods">
          <h3 class="title">常用商品</h3>
          <div class="often-goods-list">
            <ul>
              <li v-for='goods in oftenGoods' @click='addOrderList(goods)'>
                <span>{{goods.goodsName}}</span>
                <span class="o-price">￥{{goods.price}}元</span>
              </li>
            </ul>
          </div>
        </div>
        <div class="goods-type">
          <el-tabs>
            <el-tab-pane label="汉堡">
              <div>
                <ul class="cookList">
                  <li v-for="goods in type0Goods" @click='addOrderList(goods)'>
                    <span class="foodImg">
                      <img :src="goods.goodsImg" alt="" width="100%">
                    </span>
                    <span class="foodName">{{goods.goodsName}}</span>
                    <br>
                    <br>
                    <span class="foodPrice">￥{{goods.price}}元</span>
                  </li>
                </ul>
              </div>
            </el-tab-pane>
            <el-tab-pane label="小食">
              <div>
                <ul class="cookList">
                  <li v-for="goods in type1Goods" @click='addOrderList(goods)'>
                    <span class="foodImg">
                      <img :src="goods.goodsImg" alt="" width="100%">
                    </span>
                    <span class="foodName">{{goods.goodsName}}</span>
                    <br>
                    <br>
                    <span class="foodPrice">￥{{goods.price}}元</span>
                  </li>
                </ul>
              </div>
            </el-tab-pane>
            <el-tab-pane label="饮料">
              <div>
                <ul class="cookList">
                  <li v-for="goods in type2Goods" @click='addOrderList(goods)'>
                    <span class="foodImg">
                      <img :src="goods.goodsImg" alt="" width="100%">
                    </span>
                    <span class="foodName">{{goods.goodsName}}</span>
                    <br>
                    <br>
                    <span class="foodPrice">￥{{goods.price}}元</span>
                  </li>
                </ul>
              </div>
            </el-tab-pane>
            <el-tab-pane label="套餐">
              <div>
                <ul class="cookList">
                  <li v-for="goods in type3Goods" @click='addOrderList(goods)'>
                    <span class="foodImg">
                      <img :src="goods.goodsImg" alt="" width="100%">
                    </span>
                    <span class="foodName">{{goods.goodsName}}</span>
                    <br>
                    <br>
                    <span class="foodPrice">￥{{goods.price}}元</span>
                  </li>
                </ul>
              </div>
            </el-tab-pane>
          </el-tabs>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
  import axios from 'axios';
  export default {
    name: "pos",
    data() {
      return {
        totalMoney: 0,
        totalCount: 0,
        tableData: [],
        oftenGoods: [],
        type0Goods: [],
        type1Goods: [],
        type2Goods: [],
        type3Goods: [],
      }
    },
    // 当在创建的时候
    created() {
      axios.get('http://jspang.com/DemoApi/oftenGoods.php')
        .then(res => {
          console.log(res);
          this.oftenGoods = res.data;
        })
        .catch(err => {
          console.log(err);
          alert("网络错误不能访问")
        })
      axios.get('http://jspang.com/DemoApi/typeGoods.php')
        .then(res => {
          console.log(res);
          this.type0Goods = res.data[0];
          this.type1Goods = res.data[1];
          this.type2Goods = res.data[2];
          this.type3Goods = res.data[3];
        })
        .catch(err => {
          console.log(err);
          alert("网络错误不能访问")
        })
    },
    // 当所有的虚拟DOM加载完成之后,vue钩子函数DOM被挂载时
    mounted() {
      var orderHeight = document.body.clientHeight;
      document.getElementById('order-list').style.height = orderHeight + 'px';
      document.getElementById('order-show').style.height = orderHeight + 'px';
    },
    methods: {
      addOrderList(goods) {
        this.totalCount = 0;
        this.totalMoney = 0;

        // 商品是否已存在订单列表
        let isHave = false;
        for (let i = 0; i < this.tableData.length; i++) {
          if (this.tableData[i].goodsId == goods.goodsId) {
            isHave = true;
          }
        }
        // 根据判断的值得编写业务逻辑 
        if (isHave) {
          // 该表列表中商品数量
          let arr = this.tableData.filter(o => o.goodsId == goods.goodsId);
          arr[0].count++;
        } else {
          let newGoods = {
            goodsId: goods.goodsId,
            goodsName: goods.goodsName,
            price: goods.price,
            count: 1
          };
          this.tableData.push(newGoods);
        }
        // 计算汇总金额和数量 
        this.getAllMoney();
      },
      // 删除单个商品 
      delSingleGoods(goods) {
        this.tableData = this.tableData.filter(o => o.goodsId != goods.goodsId);
        // 计算汇总金额和数量 
        this.getAllMoney();
      },
      // 删除全部商品 
      delAllGoods() {
        this.tableData = [];
        // 计算汇总金额和数量 
        this.totalCount = 0;
        this.totalMoney = 0;
      },
      // 汇总数量和金额 
      getAllMoney() {
        this.totalCount = 0;
        this.totalMoney = 0;
        if (this.tableData) {
          this.tableData.forEach(ele => {
            this.totalCount += ele.count;
            this.totalMoney = this.totalMoney + (ele.price * ele.count);
          })
        }
      },
      // 模拟结账
      checkOut() {
        if (this.totalCount != 0) {
          this.tableData = [];
          this.totalCount = 0;
          this.totalMoney = 0;
          this.$message({
            message: "结账成功",
            type: 'success'
          })
        } else {
          this.$message.error("不能空结");
        }
      }
    }
  }

</script>

<style scoped>
  .pos-order {
    background-color: #f9fafc;
    /* height: 100%; //设置不起作用 */
    border-right: 1px solid #c0ccda;
  }

  .order-btns {
    margin-top: 20px;
  }

  .title {
    text-align: left;
    height: 20px;
    line-height: 20px;
    border-bottom: 1px solid #d3dce6;
    background-color: #f9fafc;
    padding: 10px;
    margin: 0;
    margin-bottom: 10px;
  }

  .often-goods-list ul {
    overflow: hidden;
    padding: 0;
    margin: 0;
  }

  .often-goods-list li {
    list-style: none;
    float: left;
    border: 1px solid #c0ccda;
    padding: 10px;
    margin: 10px;
    background-color: #fff;
    cursor: pointer;
    width: 160px;
    text-align: center;
  }

  .often-goods-list .o-price {
    color: #58b7ff;
    margin-left: 5px;
  }

  .goods-type {
    clear: both;
  }

  .cookList {
    padding: 0;
    margin: 0;
  }

  .cookList li {
    list-style: none;
    width: 23%;
    border: 1px solid #E5E9F2;
    height: auot;
    overflow: hidden;
    background-color: #fff;
    padding: 2px;
    float: left;
    margin: 10px;
    margin-right: 0;
    cursor: pointer;
  }

  .cookList li span {

    display: block;
    float: left;
    overflow: hidden;
    font-size: 16px;
  }

  .foodImg {
    width: 40%;
  }

  .foodName {
    font-size: 18px;
    padding-left: 10px;
    color: brown;
  }

  .foodPrice {
    font-size: 16px;
    padding-left: 10px;
    padding-top: 10px;
  }

  .totalNum {
    background-color: #fff;
    border-bottom: 1px solid #d3dce6;
    padding: 10px;
    margin-top: 0px;
    text-align: left;
  }

</style>
