<template>
	<div id="CompanyShopFast">
	<clxsd-head-top :title='`快速补货`'></clxsd-head-top>
		<div class="nav">
			<span @click="chooseType(1)" :class="`${is_active == 1 ? 'active':''}`">按收藏品分类</span>
			<span @click="chooseType(2)" :class="`${is_active == 2 ? 'active':''}`">按购买时间</span>
			<span @click="chooseType(3)" :class="`${is_active == 3 ? 'active':''}`">按购买次数</span>
		</div>
		<list :business-id="businessId" :title="title" :items="entities" :shopCart="shopCart"></list>
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

	export default {
		name: "CompanyShopFast",
		components: {
			list,
            MiniCompanyCart
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
                    // console.log(res, 'res .data')
                    data = res[0].data.data
                    console.log('dataL:',data)
                    this.shopCart = res[1]
                })
                this.entities = this._handleData(data)
                // this.shopCart
                // console.log(data, this.shopCart, 'helllo')
                // this.entities = data;
                
            },
            _handleData(data) {
                if(!data) return []
                // console.log(data,'data')
                data.forEach((item, index) => {
                    item.shopId = this.factoryId
                    item.num = 0
                    item.itemId = item.id
                    item.sale_price = item.price
                    if (this.shopCart[item.id]) {
                        item.num = this.shopCart[item.id].num
                    }
                })
                this.loading = false
                return data
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
                    console.log(data)
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