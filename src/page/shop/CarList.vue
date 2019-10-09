<template>
    <div>
        <clxsd-head-top :title="title"></clxsd-head-top>
        <span class="manage" @click="is_delete=true">管理</span>
        <div class="" v-if="data.shops.length>0">
            <CartsShoplist 
                :data="data"
                :add-goods="addGoods"
                :min-goods="minGoods"
                :productCheckchange="productCheckchange"
                 @shopChecked="shopCheck"
            />
            <CartsFooter @shopCheckedAll="shopCheckedAll" :data="data" :toSubmitDataFnc="submitDataFunc" v-if="is_delete!=true"/>
            <CartsFooterClear @shopCheckedAll="shopCheckedAll" :data="data" :toClearDataFnc="clearDataFunc" v-else/>
        </div>
        <EmptyCartShop v-if="data.shops.length==0 && loading==false" ></EmptyCartShop>
        <CircleLoading v-if="loading"></CircleLoading>
    </div>
</template>

<script>
    import { mapState,mapMutations} from 'vuex'
    import { supplierFactoryEntities } from '@/api/supplier'
    import CartsShoplist  from '@/components/shopcart/CartsShoplist'
    import CartsFooter from "@/components/shopcart/CartsFooter"
    import CartsFooterClear from "@/components/shopcart/CartsFooterClear"
    import EmptyCartShop from '@/components/EmptyCarList'
    import { queryShopCarList, delShopCar, addShopCar, onlyDelShopCar } from '@/api/shopCar'


    export default {
        name:'page-cart',
        components:{
            CartsFooter,
            CartsShoplist,
            EmptyCartShop,
            CartsFooterClear
        },
        data(){
            return {
                shopId:0,
                title:'购物车',
                isEmpty: true,
                loading:true,
                data:{
                    shops:[],
                    checked:false,
                },
                is_delete:false
            }
        },
        created(){
            this.shopId = this.$route.params.shopId ? parseInt(this.$route.params.shopId):0
            if(this.shopId){
                this.route = `/factory/shop/${this.shopId}`
            }
            this._queryShopCarList()
        },
        mounted(){
            // this.initData()
        },
        computed:{
            ...mapState({
                cartList: state =>state.shop.CART_LIST
            }),
        },
        methods:{
            ...mapMutations([
                'CLEAR_CART', 'CLEAR_ALL_CART', 'ADD_CART', 'REMOVE_CART'
            ]),
            // async initData(){
            //     let ids = []
            //     let idMapQ = {}
            //     let cartData = this.shopId ? this.cartList[this.shopId]:this.cartList
            //     if(cartData){
            //         if(this.shopId){
            //             Object.values(cartData).forEach(item => {
            //                 if(item) {
            //                     ids.push(item.id)
            //                     idMapQ[item.id] = item.num
            //                 }
                           
            //             })
            //         }else{
            //             Object.values(cartData).forEach(item => {
            //                 Object.values(item).forEach(_item =>{
            //                     if(_item&&_item.num>0){
            //                         ids.push(_item.id)
            //                         idMapQ[_item.id] = _item.num
            //                     }
            //                 })

            //             })
            //         }
            //     }
            //     if(ids.length){
            //         const { data } = await supplierFactoryEntities(ids.join(','))
            //         this.data.shops = this._handleData(data,idMapQ)
            //     }
            //     this.loading = false
            // },

            // 页面初始化获取购物车数据
            _queryShopCarList() {
                queryShopCarList().then(res=>{
                    if(res.code==200) {
                        let data = res.data
                        this.data.shops = this._handleData(data.goodsList)
                        this.loading = false
                    }
                })
            },
            _handleData(data){
                let shops = {}
                data.forEach((item,index) =>{
                    item.sale_price = item.price
                    item.checked = false
                    item.shopId = item.supplier.id
                    item.show_unit = item.unit
                    if(shops[item.supplier.id]){
                        shops[item.supplier.id]['items'] = shops[item.supplier.id]['items'].concat([item])
                    }else{
                        shops[item.supplier.id] = {
                            shopId:item.supplier_id,
                            shopName: item.supplier.display_name || item.supplier.name,
                            logo:item.supplier.logo,
                            type:item.supplier.type,
                            checked:false,
                            items:[].concat([item])
                        }
                    }
                })
                return Object.values(shops)
            },
            //实现全选
            shopCheckedAll(){
                this.data.checked = !this.data.checked
                let allChecked=this.data.checked;
                this.data.shops.forEach((shop,sid)=>{
                    shop.checked=allChecked
                    shop.items.forEach((product,pid)=>{
                        product.checked=allChecked
                    })
                })
            },
            // 需要注意店铺的ID值
            shopCheck(i){
                console.log(i)
                // return
                let shop = this.data.shops[i]
                shop.checked = !shop.checked
                console.log("shop.checked:"+shop.checked)
                //获取当前店铺的选中的状态
                let shopChecked=shop.checked
                //根据当前店铺的状态控制店铺商品的状态的值
                shop.items.forEach((product,pid)=>{
                    product.checked=shopChecked
                })

                //更具店铺的状态控制全选的状态的值
                let allChecked=true;
                //循环当前的店铺的值
                this.data.shops.forEach((shop,pid)=>{
                    shop.items.forEach((product,sid)=>{
                        if(!product.checked){
                            allChecked=false;
                        }
                    })
                })
                this.data.checked=allChecked;
            },
            //商品的状态控制店铺的状态与全选的状态
            //首先要注意店铺与商品的ID的值
            productCheckchange(sid,pid){
                this.data.shops[sid].items[pid].checked = !this.data.shops[sid].items[pid].checked
                let isChecked=true;
                //循环店铺的商品
                this.data.shops[sid].items.forEach((product,kid)=>{
                    if(!product.checked){
                        isChecked=false;
                    }
                })
                this.data.shops[sid].checked=isChecked;
                //根据商品的状态改变全选反选的状态

                let isAllChecked=true;

                this.data.shops.forEach((shop,sid)=>{
                    shop.items.forEach((product,pid)=>{
                        if(!product.checked){
                            isAllChecked=false;
                        }
                    })
                })
                this.data.checked=isAllChecked;
            },
            //要注意店铺与商品的ID
            addGoods(sid,pid, item){
                // console.log(sid, pid, item)
                this.data.shops[sid].items[pid].num++;
                let shopId = this.data.shops[sid].shopId

                item.itemId = item.id
                addShopCar({supplier_id: shopId, good_id:item.id})
                // item.sale_price = item.price * item.tran
                // this.ADD_CART(item)
            },
            //进行商品减的操作
            async minGoods(sid,pid,item){
                // console.log(item)
                let params = {}
                //  console.log(this.data.shops[sid])
                if(item.num>item.order_min_num){
                    // 获取商品id
                    item.itemId = item.id
                    // 获取商家id
                    let shopId = this.data.shops[sid].shopId
                    let data =  {
                        supplier_id: shopId,
                        good_id: item.id
                    }
                    await onlyDelShopCar(data)
                    // params[`${shopId}`] = [item.id]
                    // console.log(params)
                    // delShopCar(params)
                    // item.sale_price = item.price * item.tran
                    item.num--;
                    // console
                    // this.REMOVE_CART(item)
                }
            },
            submitDataFunc(){
                let params = {
                    checkedItems:[],
                    type: 'factory'
                }

                this.data.shops.forEach(shop => {
                    shop.items.forEach(item => {
                        if(item.checked){
                            params.checkedItems.push({
                                shopId:item.shopId,
                                num:item.num,
                                id:item.id
                            })
                        }
                    })
                })

                this.$store.commit('SAVE_CONFIRM_ORDER_DATA',params)
                this.$router.push({path:'/shop/confirm-order'})
            },
            //删除
            async clearDataFunc(){
                let params = {}
                this.data.shops.forEach((shop,key,arr) => {
                    shop.items.forEach((item,index, arrs) => {
                        if(item.checked){
                            // params.push({
                            //     shopId:item.shopId,
                            //     num:item.num,
                            //     id:item.id
                            // })
                            // params[item.shopId] = []
                            if(params[item.shopId]) {
                                params[item.shopId] = [...params[item.shopId], item.id]
                            } else {
                                 params[item.shopId] = [item.id]
                            }
                        }
                    })
                    // arr[key].items = shop.items.filter((el, index, arr)=> el.checked!=true)
                })
                // this.data.shops.forEach((shop,key,arr) => {
                //    !shop.items.length&&arr.splice(key, 1)
                // })
                
                // console.log(this.data.shops)
                // return
                if(params) {
                    // let data = {}
                    // params.forEach((item,index,arr)=>{
                    //     // data[item.shopId] = 
                    //     if(data[item.shopId]) {
                    //         data[item.shopId] = [...data[item.shopId], item.id]
                    //     } else {
                    //         data[item.shopId] = [item.id]
                    //     }
                    //     // console.log(data,')
                    // })
                    // console.log(data,'data')
                    // return
                   await delShopCar({ids:params})
                   this._queryShopCarList()
                }
                // if(this.data.checked){
                //     this.CLEAR_ALL_CART()
                // }else {
                //     params.forEach(item => {
                //        this.CLEAR_CART(item.id)
                //     })
                // }
            }
        }
    }
</script>

<style lang="scss" scoped>
    .manage {
        position: fixed;
        z-index: 999;
        color: #fff;
        right: .2rem;
        font-size: .3rem;
        top:.23rem;
    }
</style>