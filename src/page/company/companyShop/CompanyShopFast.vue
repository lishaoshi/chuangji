<template>
	<div id="CompanyShopFast">
	<clxsd-head-top :title='`快速补货`'></clxsd-head-top>
		<div class="nav">
			<span @click="chooseType(1)" :class="`${is_active == 1 ? 'active':''}`">按收藏品类</span>
			<span @click="chooseType(2)" :class="`${is_active == 2 ? 'active':''}`">按购买时间</span>
			<span @click="chooseType(3)" :class="`${is_active == 3 ? 'active':''}`">按购买次数</span>
		</div>
        
		<list @updateSlefChoss="handleChoose" @handleBlur="handleBlur" :business-id="businessId" :title="title" :items="entities" v-if="entities.length" @del_shop_cart="del_shop_cart" @add_shop_car="add_shop_car" :shopCart="shopCart"></list>
        <EmptyOrder v-else/>
        <div style="height: 1.3rem"></div>
        <div style="position: fixed;width: 100%;bottom: 0px">
            <mini-company-cart ref="MiniCompanyCart" :shop-id="businessId" :count="cartNum" :total-price="totalPrice" style="bottom: 0px"></mini-company-cart>
        </div>
	</div>
	
</template>

<script>
	import list from "@/page/company/companyShop/CompanyShopListMould.vue";
    import { mapState} from 'vuex';
    import {quickreplenish} from '@/api/business'
    import MiniCompanyCart from '@/page/company/CompanyClassify/MiniShopCart.vue'
    import { queryShopCarList, delShopCar, addShopCar, onlyDelShopCar } from '@/api/shopCar'
    import EmptyOrder from '@/components/EmptyList'

	export default {
		name: "CompanyShopFast",
		components: {
			list,
            MiniCompanyCart,
            EmptyOrder
		},
        data(){
            return {
                entities:[],
                is_active:1,
                page: 1,
                shopCart: {},
                type: 1
            }
        },
        computed:{
            ...mapState({
                //用户是否有权限看价格
                canShow: state => state.CURRENTUSER.data.shop_supplier,
                cartList: state => state.shop.BUSINESS_CART_LIST,
                businessData: state => state.shop.CURRENT_BUSINESS_SHOP_DATA,
            }),
            businessId(){
                return this.businessData.id
            },
			title() {
				return this.businessData.display_name || this.businessData.name
			},
            cartNum() {
                let num = 0;
                Object.values(this.shopCart).forEach((data, index) => {
                    num += +data.num;
                })
                return num
            },
            totalPrice() {
                let total_price = 0.00;
                Object.values(this.shopCart).forEach((data, index) => {
                    total_price += data.num * data.price;

                })
                return total_price.toFixed(2)
            }
        },
        created(){
            this.initData()
        },
        methods: {
            async initData(){
                let params = {
					// page: this.page,
					// limit: 20,
                    supplier_id:this.businessId,
                    type: this.type
                }
                let data
                // const {data} = await quickreplenish(params, this.businessId)
                await Promise.all([quickreplenish(params, this.businessId), queryShopCarList({}, this.businessId)]).then(res=>{
                    data = res[0].data.data
                    this.shopCart = res[1]
                })
                this.entities = this._handleData(data)
            },
            _handleData(data) {
                if(!data) return []
                // console.log(data,'data')
                data.forEach((item, index, arr) => {
                    item.isSelfChoose = false
                    item.shopId = this.factoryId
                    item.num = 0
                    item.itemId = item.id
                    item.sale_price = item.price
                    if (this.shopCart[item.id]) {
                        item.num = this.shopCart[item.id].num
                    }
                    arr[index].time = this.$moment.unix(item.valid_time).format("YYYY.MM.DD")
                    arr[index].brandName = item.brand.name
                })
                this.loading = false
                return data
            },

            // 通过软键盘输入
			handleChoose(boolear, index) {
				this.entities = JSON.parse(JSON.stringify(this.entities))
				this.entities[index].isSelfChoose = true
			},

			/*当前商品的输入框失去焦点
			* 
			*flag类型是boolear值，true为正常修改购物车数量，false为小于最小购买量
			*/
		
			handleBlur(flag, index, num, item) {
                
				this.entities = JSON.parse(JSON.stringify(this.entities))
				this.entities[index].isSelfChoose = false
				if(flag) {
                    this.entities[index].num = num
                    if(this.shopCart[item.id]) {
                        this.shopCart[item.id].num = num
                        } else {
                            this.$set(this.shopCart, `${item.id}`, {...this.entities[index]})
                    }
                }
			},
            // 添加购物车
            add_shop_car(index, item) {
                // debugger
				this.entities = JSON.parse(JSON.stringify(this.entities))
				if(item.num < item.order_min_num) {
					this.entities[index].num += this.entities[index].order_min_num
				} else {
					this.entities[index].num++
				}
				
				if(this.shopCart[item.id]) {
					if(this.shopCart[item.id].num>0) {
						this.shopCart[item.id].num++
					} else {
						this.shopCart[item.id].num = item.order_min_num
					}
                    
                } else {
					this.$set(this.shopCart, `${item.id}`, {...this.entities[index]})
                }
            },
            
            // 删除购物车
			del_shop_cart(index, item) {
				this.entities = JSON.parse(JSON.stringify(this.entities))
				if(item.num <= item.order_min_num) {
					this.entities[index].num = 0
					this.shopCart[item.id].num = 0
				} else {
					this.entities[index].num--
					this.shopCart[item.id].num--
				}
			},

            //获取
              // 选择快速补货类型
            chooseType(type) {
                this.type = type
                this.is_active = type
                let params = {
                     supplier_id:this.businessId,
                    type: this.type
                }
                quickreplenish(params, this.businessId).then(res=>{
                    // console.log(res.data)
                    let data = res.data.data
                   this.entities = this._handleData(data)
                })
                // console.log(this.type)
            },
        }
	}
</script>

<style lang="scss" scoped>
	.nav {
		display: flex;
		text-align: center;
		justify-content: space-around;
		background: #fff;
		height: .9rem;
		line-height: .9rem;
		font-size: .26rem;
		margin-bottom: .2rem;
		a {
			color: #333;
		}
		.active {
			color: #26A2FF;
			border-bottom: 2px solid #26A2FF;
		}
	}
</style>