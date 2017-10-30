<template>
  <div class="left-nav">
    <ul>
      <li>
        <i class="iconfont icon-goumai"></i>
        <p>收银</p>
      </li>
      <li>
        <i class="iconfont icon-dianpu"></i>
        <p>店铺</p>
      </li>
      <li>
        <i class="iconfont icon-hanbao"></i>
        <p>商品</p>
      </li>
      <li>
        <i class="iconfont icon-31huiyuanqia"></i>
        <p>会员</p>
      </li>
      <li>
        <i class="iconfont icon-zuanshi"></i>
        <p>统计</p>
      </li>
      <li>
        <i class="iconfont icon-gongnengjianyi"></i>
        <p>设置</p>
      </li>
    </ul>
  </div>
</template>

<script>
  export default {

  }

</script>

<style>
.left-nav{
    color: #fff;
    font-size: 10px;
    height: 100%;
    background-color: #1d8ce0;
    float: left;
    width: 5%;
}
.iconfont{
    font-size: 24px;
}

.left-nav ul{
    overflow: hidden;
    padding: 0;
    margin: 0;
}
.left-nav ul li{
    list-style: none;
    text-align: center;
    border-bottom: 1px solid #20a0ff;
    padding: 10px;
    cursor: pointer;
}
</style>
