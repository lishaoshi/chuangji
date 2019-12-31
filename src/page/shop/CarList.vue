<template>
    <div>
        <clxsd-head-top :title="title"></clxsd-head-top>
        <span class="manage" @click="is_delete=!is_delete">{{is_delete?'取消':'管理'}}</span>
        <div class="" v-if="data.shops.length>0">
            <CartsShoplist 
                :data="data"
                :add-goods="addGoods"
                :min-goods="minGoods"
                :productCheckchange="productCheckchange"
                 @shopChecked="shopCheck"
                 :is_delete="is_delete"
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
    import bus from '@/bus'


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
                is_delete:false,
                oldShopData: {
                    shops:[],
                    checked:false,
                },
                suppliersPrices: {},
                totalPrice: 0
            }
        },
        created(){
            this.shopId = this.$route.params.shopId ? parseInt(this.$route.params.shopId):0
            if(this.shopId){
                this.route = `/factory/shop/${this.shopId}`
            }
            this._queryShopCarList()
        },
        watch: {
            is_delete(newValue, oldValue) {
                // console.log(newValue, oldValue, this.data)
                if(newValue&&this.data.shops.length) {
                    this.data.shops.forEach((item, index, arr)=>{    
                        this.data.checked = false
                        item.checked = false
                        item.items.forEach((items, key, goodsList)=>{
                            goodsList[key].checked = false
                        })
                    })
                }
            },
            data:{
                handler(newVal, oldVal) {
                    this.totalPrice = 0
                    let allChecked = true
                    let distributionFlag = false; //是否需要配送费  false不需要， true需要
                    this.data.shops.forEach((shop,index)=>{
                        let totalNum = 0
                        shop.items.forEach((product,key)=>{
                            if(!product.checked){
                                allChecked=false;
                            } else {
                                totalNum += +product.sale_price * +product.num
                                this.totalPrice += +product.sale_price * +product.num
                            }
                           
                        })
                        if(totalNum < this.suppliersPrices[shop.shopId].starting_price && this.totalPrice > 0) {
                                this.totalPrice += +this.suppliersPrices[shop.shopId].shipping_fee
                                distributionFlag = true
                        }
                             bus.$emit('_cartCount',this.totalPrice, distributionFlag)
                    })
                    this.data.checked=allChecked;
                },
                deep: true
            },
        },
        computed:{
            ...mapState({
                cartList: state =>state.shop.CART_LIST
            }),
            shopCartData() {
                return this.data.shop
            }
        },
        methods:{
            ...mapMutations([
                'CLEAR_CART', 'CLEAR_ALL_CART', 'ADD_CART', 'REMOVE_CART', 'CHANG_SHOPcART_LIST'
            ]),

            // 页面初始化获取购物车数据
            _queryShopCarList() {
                queryShopCarList().then(res=>{
                    if(res.code==200) {
                        let data = res.data
                        this.suppliersPrices = data.suppliersPrices
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
                    item.isSelfChoose = false
                    item.shopItemTotalPrice = +item.sale_price*+item.num
                    item.cover = `${item.cover}?x-oss-process=image/resize,w_130,h_130,m_fixed`
                    //为商家信息添加配送信息
                    item.suppliersPrices = this.suppliersPrices[item.supplier_id]
                    // debugger
                    if(shops[item.supplier.id]){
                        shops[item.supplier.id]['items'] = shops[item.supplier.id]['items'].concat([item])
                    }else{
                        shops[item.supplier.id] = {
                            shopId:item.supplier_id,
                            shopName: item.supplier.display_name || item.supplier.name,
                            logo:item.supplier.logo,
                            type:item.supplier.type,
                            img_cover: item.supplier.img_cover,
                            checked:false,
                            items:[].concat([item]),
                            suppliersPrices:　this.suppliersPrices[item.supplier_id],
                            totalPrice: 0,
                            type: item.supplier.type,
                            spec: item.spec,
                            brand: item.brand || ""
                        }
                    }
                })
                // console.log(Object.values(shops), shops, 'shops')
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
                let shop = this.data.shops[i]
                shop.checked = !shop.checked
                //获取当前店铺的选中的状态
                let shopChecked=shop.checked
                shop.items.forEach((shop, index)=>{
                    if(shopChecked) {
                        shop.checked = true
                    } else {
                        shop.checked = false
                    }
                })
            },
            //商品的状态控制店铺的状态与全选的状态
            //首先要注意店铺与商品的ID的值
            productCheckchange(sid,pid){
                this.data.shops[sid].items[pid].checked = !this.data.shops[sid].items[pid].checked
                let shopId = this.data.shops[sid].shopId
                let isChecked=true;
                //根据商品的状态改变全选反选的状态
                let isAllChecked=true;
                this.data.shops.forEach((shop,index)=>{
                    shop.items.forEach((product,key)=>{
                        // 只判断当前选择的商品
                        if(sid == index) {
                            if(!product.checked){
                                isChecked=false;
                            }
                        }
                    })
                })
                this.data.shops[sid].checked=isChecked;
                this.data.checked=isAllChecked;
            },
            //要注意店铺与商品的ID
            addGoods(sid,pid, item){
                if(item.num>=99999) {
                    this.$toast('最大购买量为99999')
                    return false
                }
                this.data.shops[sid].items[pid].num++;
                let shopId = this.data.shops[sid].shopId
                item.itemId = item.id
                addShopCar({supplier_id: shopId, good_id:item.id})
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
                    onlyDelShopCar(data)
                    item.num--;
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
               await this.$messagebox.confirm('确定删除吗？').then(res=>{
                    // console.log(res)
                    
                    this.data.shops.forEach((shop,key,arr) => {
                        shop.items.forEach((item,index, arrs) => {
                            if(item.checked){
                                if(params[item.shopId]) {
                                    params[item.shopId] = [...params[item.shopId], item.id]
                                } else {
                                    params[item.shopId] = [item.id]
                                }
                            }
                        })
                    })
                    
                })
                if(params) {
                    await delShopCar({ids:params})
                    this._queryShopCarList()
                }
            }
        },
        mounted() {
            bus.$on('chooseSelf',({pid, sid})=>{
                // debugger
                this.$nextTick().then(()=>{
                    this.data.shops[sid].items[pid].isSelfChoose = true
                })
                
            })
            bus.$on('handleBlur', ({pid, sid, num, item})=>{
                // bus.$off('chooseSelf')
                 this.$nextTick().then(()=>{
                     this.data.shops[sid].items[pid].isSelfChoose = false
                     
                     if(Number.isInteger(parseInt(num))&&(num < this.data.shops[sid].items[pid].order_min_num)) {
                        this.$toast(`最小订货量为${this.data.shops[sid].items[pid].order_min_num}`)
                        return false
                     }
				// 如果event.target.value是空，则不改变数值
                    if(!num ||　(num == this.data.shops[sid].items[pid].num)) {
                        return false
                    }
                    if(num > 99999) {
                        this.$toast('最大购买量为99999')
                        return false
                    }
                    console.log(num)
                    this.data.shops[sid].items[pid].num = num
                     let shopId = this.data.shops[sid].shopId
                    let params = {
                        supplier_id:shopId,
                        good_id: item.id,
                        num
                    }
                    addShopCar(params).then(res=>{
                        // bus.$off('handleBlur')
                    })
                })
            })
        },
        destroyed() {
            bus.$off('chooseSelf')
            bus.$off('handleBlur')
            bus.$off('_cartCount')
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