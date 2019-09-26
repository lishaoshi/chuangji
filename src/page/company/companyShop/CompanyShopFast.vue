<template>
	<div id="CompanyShopFast">
	<clxsd-head-top :title='`快速补货`'></clxsd-head-top>
		<div class="nav">
			<span @click="is_active = 1" :class="`${is_active == 1 ? 'active':''}`">按收藏品分类</span>
			<span @click="is_active = 2" :class="`${is_active == 2 ? 'active':''}`">按购买时间</span>
			<span @click="is_active = 3" :class="`${is_active == 3 ? 'active':''}`">按购买次数</span>
		</div>
		<list :entities="entities" :business-id="businessId"></list>
        <div style="height: 1.3rem"></div>
        <div style="position: fixed;width: 100%;bottom: 0px">
            <mini-company-cart ref="MiniCompanyCart" :shop-id="businessId" :count="cartNum" :total-price="totalPrice" style="bottom: 0px"></mini-company-cart>
        </div>
	</div>
	
</template>

<script>
	import list from "@/page/company/companyShop/CompanyShopListMould.vue";
    import { mapState} from 'vuex';
    import {businessEntities} from '@/api/business'
    import MiniCompanyCart from '@/page/company/CompanyClassify/MiniShopCart.vue'

	export default {
		name: "CompanyShopFast",
		components: {
			list,
            MiniCompanyCart
		},
        data(){
            return {
                entities:[],
                is_active:1
            }
        },
        computed:{
            ...mapState({
                //用户是否有权限看价格
                canShow: state => state.CURRENTUSER.shop_supplier,
                cartList: state => state.shop.BUSINESS_CART_LIST,
                businessData: state => state.shop.CURRENT_BUSINESS_SHOP_DATA,
            }),
            businessId(){
                return this.businessData.id
            },
            shopCart() {
                return {...this.cartList[this.businessId]}
            },
            cartNum() {
                let num = 0;
                Object.values(this.shopCart).forEach((data, index) => {
                    num += data.num;
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
        methods:{
            async initData(){
                const {data} = await businessEntities(this.businessId,1)
                this.entities = data;
            }
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