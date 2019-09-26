<template>
    <div>
        <clxsd-carts-shoplist :minGoods="minGoods" />
        <clxsd-carts-footer/>
    </div>
</template>

<script>
    export default {
        name: "ShopCart",
        created(){
            this._initData()
        },
        methods:{
            //实现初始化的操作
            _initData(){

            },
            //实现全选
            shopCheckedAll(){
                let allChecked=this.goodsInfo.checked;
                this.goodsInfo.shops.forEach((shop,sid)=>{
                    shop.checked=allChecked
                    shop.products.forEach((product,pid)=>{
                        product.checked=allChecked
                    })
                })
            },



            //店铺的状态控制全选的状态
            shopCheck(i){
                const shopChecked = this.goodsInfo.shops[i].checked
                this.goodsInfo.shops[i].products.forEach((product,pid) => {
                    product.checked = shopChecked
                })

                let allChecked = true
                this.goodsInfo.shops.forEach((shop,pid)=>{
                    shop.products.forEach((product,sid)=>{
                        if(!product.checked){
                            allChecked=false;
                        }
                    })
                })
                this.goodsInfo.checked=allChecked
            },
            //实现商品加减的操作
            addGoods(sid, pid){
                this.goodsInfo.shop[sid].products[pid].qua++;
            },
            //进行商品减的操作
            minGoods(sid,pid){
                if(this.goodsInfo.shops[sid].products[pid].qua>1){
                    this.goodsInfo.shops[sid].products[pid].qua--;
                }
            }
        }
    }
</script>

<style scoped>

</style>