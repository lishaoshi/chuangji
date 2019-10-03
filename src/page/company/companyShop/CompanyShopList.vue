<template>
	<div id="CompanyShopList">
		<HeaderTop></HeaderTop>
        <mt-swipe :auto="4000" class="swiper">
			<mt-swipe-item :key="key" v-for="(swipe,key) in swipers"><a :href="swipe.link"> <img :src="swipe.picture" width="100%"></a>
			</mt-swipe-item>
		</mt-swipe>
		<Notice :notices="notices" v-if="notices!=null"></Notice>
		<div class="notice" v-else>
			<svg>
				<use xlink:href="#icon-notice"/>
			</svg>
			<span style="padding-left: 5px">暂时没有消息</span>
		</div>
		<div class="nav">
			<div>
				<router-link to="">
					<svg><use xlink:href="#icon-quanqiucang-active" /></svg>
					<p>领卷活动</p>
				</router-link>
			</div>
			<div>
				<router-link to="/company-promotion">
					<svg><use xlink:href="#icon-quanqiucang-active1" /></svg>
					<p>促销活动</p>
				</router-link>
			</div>
			<div>
				<router-link to="/company-shop-fast">
					<svg><use xlink:href="#icon-quanqiucang-active2" /></svg>
					<p>快速补货</p>
				</router-link>
			</div>
			<div>
				<router-link to="/company-product-list">
					<svg><use xlink:href="#icon-quanqiucang-active3" /></svg>
					<p>产品分类</p>
				</router-link>
			</div>
		</div>
		<!--列表开始-->
		<p class="title">药品推荐</p>
		<list :business-id="businessId" :title="title"></list>
        <div style="height: 1.2rem"></div>
        <div style="position: fixed;width: 100%;bottom: 0px" v-if="entities.length>0">
            <mini-company-cart ref="MiniCompanyCart" :shop-id="businessId" :count="cartNum" :total-price="totalPrice" style="bottom: 0px"></mini-company-cart>
        </div>
	</div>
</template>

<script>
	import list from "@/page/company/companyShop/CompanyShopListMould.vue";
	import HeaderTop from "@/page/company/CompanyHeader.vue";
	import foot from "@/page/company/CompanyFooterNav.vue";
	import SearchBar from '@/components/common/SearchBar';
	import { mapState, mapMutations} from 'vuex';
    import {businessEntities} from '@/api/business'
    import MiniCompanyCart from '@/page/company/CompanyClassify/MiniShopCart.vue'
	import {adList, infoList} from "@/api/ad";
	import Notice from '@/components/common/notice';

	export default {
		name: "CompanyShopList",
		components: {
			list,
			foot,
			SearchBar,
			HeaderTop,
            MiniCompanyCart,
			Notice
		},
		data(){
			return {
				entities:[],
                notices:[],
				swipers:[]
			}
		},
		computed:{
			...mapState({
				businessData: state => state.shop.CURRENT_BUSINESS_SHOP_DATA,
                //用户是否有权限看价格
                canShow: state => state.CURRENTUSER.data.userInfo.shop_supplier,
                cartList: state => state.shop.BUSINESS_CART_LIST
			}),
			businessId(){
				 return this.businessData.id
			},
            title() {
                return this.businessData.display_name || this.businessData.name
            },
			infos(){
				return this.businessData.infos
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
		    	let params = {
					supplier_id:this.businessId
				}
				const {data} = await businessEntities(params)
                this.entities = data.data.recommendList;
		    	console.log(this.entities)
				/*
                infoList({from:'platform',supplier_id:this.businessId}).then( data => {
                    this.notices = data.data.data
                })
				 */
				this.notices = this.infos
				adList({channel: 'app', space: 'global-top'}).then( data => {
					this.swipers = data.data.data
				})
			}
		}

	}
</script>

<style lang="scss" scoped>
    .notice {
        margin: .2rem 0;
        margin-top: 0px;
        background: #fff;
        width: 100%;
        height: .64rem;
        line-height: .64rem;
        display: flex;
        padding: 0 .24rem;
        align-items: center;

        .notice-list {
            width: 6.2rem;
            height: .64rem;
            overflow-y: hidden;
            margin-left: .1rem;

            a {
                display: block;
                white-space: nowrap;
                overflow: hidden;
                text-overflow: ellipsis;
                font-size: .24rem;
                line-height: .64rem;
                color: #333;
            }
        }

        svg {
            width: .38rem;
            height: .38rem;
        }
    }
	.swiper {
		padding: .15rem;
		background: #fff;
		height: 2.6rem;
		padding-bottom: 0px;
        border-radius: 5px;
        margin-top: -10px;
	}
	.nav {
		text-align: center;
		background: #fff;
		display: flex;
		border-radius: 7px;
		padding: .35rem .5rem;
		padding-bottom: .2rem;
		justify-content: space-between;
		>div{
			svg {
				width: 1rem;
				height: 1rem;
			}
			p {
				color: #666666;
				line-height: 200%;
				
			}
		}
	}
	.title {
		line-height: .88rem;
		border-bottom: 1px solid #f1f1f1;
        text-align: center;
        color: #666;
        font-size: .28rem;
	}
</style>