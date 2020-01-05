<template>
	<div id="CompanyShopList">
			
        <div class="mainbox" ref="mainbox">
			<HeaderTop :shopId="shopId" :businessInfo="businessInfo" :hasError="hasError"></HeaderTop>
			<div style="margin-top:-10px">
				<mt-loadmore ref="loadmore" :bottom-method="loadBottom" :bottom-all-loaded="allLoaded" :autoFill="false">
	
			<!-- <div  v-if="items.length">
			<mt-loadmore ref="loadmore" :bottom-method="loadBottom" :bottom-all-loaded="allLoaded" :autoFill="false"> -->
					<mt-swipe :auto="4000" class="swiper">
						<mt-swipe-item :key="key" v-for="(swipe,key) in swipers"><a :href="swipe.link"> <img :src="swipe.img" width="100%" height="100%"></a>
						</mt-swipe-item>
					</mt-swipe>
					<div style="background: #fff;">
						<!-- <Notice :notices="notices" v-if="notices.length" style="background: #f4f5f5;border-radius: 2px;"></Notice> -->
						<div class="left">
							<Notice :notices="notices" v-if="notices.length"/> 
							<div class="notice" v-else>
								<svg>
									<use xlink:href="#icon-notice"/>
								</svg>
								<span> &nbsp;没有消息</span>
							</div>
						</div>
					</div>
					<div class="nav">
						<div>
							<router-link to="/develop">
								<svg><use xlink:href="#icon-quanqiucang-active" /></svg>
								<p>领卷活动</p>
							</router-link>
						</div>
						<div>
							<router-link to="/develop">
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
							<router-link :to="`/company-product-list?shopId=${shopId}`">
								<svg><use xlink:href="#icon-quanqiucang-active3" /></svg>
								<p>产品分类</p>
							</router-link>
						</div>
					</div>
			<!-- <div  v-if="items.length">
				<mt-loadmore ref="loadmore" :bottom-method="loadBottom" :bottom-all-loaded="allLoaded" :autoFill="false"> -->
			<!--列表开始-->
					<p class="title">药品推荐</p>
			<!-- <div style="overflow:scroll" v-if="items.length">
				<mt-loadmore ref="loadmore" :bottom-method="loadBottom" :bottom-all-loaded="allLoaded" :autoFill="false"> -->
					<list v-if="items.length" class="list-item" @updateSlefChoss="handleChoose" @handleBlur="handleBlur" :business-id="shopId" :title="title" @add_shop_car="add_shop_car" @del_shop_cart="del_shop_cart" :shopCart="shopCart" :items="items"></list>
					<EmptyList class="noData" v-else/>
				</mt-loadmore>
		</div>

			
		</div>

        <div v-if="items.length" style="height: 1.2rem"></div>
        <div style="position: fixed;width: 100%;bottom: 0px" v-if="entities.length>0">
            <mini-company-cart ref="MiniCompanyCart" :isHasDistribution="isHasDistribution" :shipping_fee="businessConfig&&businessConfig.shipping_fee" :count="cartNum" :total-price="totalPrice" style="bottom: 0px"></mini-company-cart>
        </div>
	</div>
</template>

<script>
	import list from "@/page/company/companyShop/CompanyShopListMould.vue";
	import EmptyList from "@/components/EmptyList"
	import HeaderTop from "@/page/company/CompanyHeader.vue";
	import foot from "@/page/company/CompanyFooterNav.vue";
	import SearchBar from '@/components/common/SearchBar';
	import { mapState, mapMutations} from 'vuex';
    import {businessEntities, queryBusinessDetail} from '@/api/business'
    import MiniCompanyCart from '@/page/company/CompanyClassify/MiniShopCart.vue'
	import {adList, infoList} from "@/api/ad";
	import Notice from '@/components/common/notice2';
	import { queryShopCarList, delShopCar, addShopCar, onlyDelShopCar } from '@/api/shopCar'

	export default {
		name: "CompanyShopList",
		components: {
			list,
			foot,
			SearchBar,
			HeaderTop,
            MiniCompanyCart,
			Notice,
			EmptyList
		},
		data(){
			return {
				entities:[],
                notices:[],
				swipers:[],
				shopCart: {},
				page: 1,
				hasError:false,
				items: [],
				allLoaded: false,
				shopId: 0,
				businessInfo: {}
			}
		},
		computed:{
			...mapState({
				businessData: state => state.shop.CURRENT_BUSINESS_SHOP_DATA,
                //用户是否有权限看价格
                canShow: state => state.CURRENTUSER.data.shop_supplier,
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
            cartNum() {
                let num = 0;
                return Object.values(this.shopCart).length
            },
            totalPrice() {
				let total_price = 0.00;
				if(this.cartNum == 0) {
					return total_price.toFixed(2)
				}
                Object.values(this.shopCart).forEach((data, index) => {
					total_price += data.num * data.price;
				})
				if(total_price < (this.businessConfig&&+this.businessConfig.starting_price || 0)) {
					total_price += +this.businessConfig.shipping_fee
				}
                return total_price.toFixed(2)
			},

			// 出去配送费的总额
			notPrice() {
				let total_price = 0.00;
				if(this.cartNum == 0) {
					return total_price.toFixed(2)
				}
                Object.values(this.shopCart).forEach((data, index) => {
					total_price += data.num * data.price;
				})
				return total_price
			},
			businessConfig() {
				return this.businessInfo.business_config
			},
			// 判断是否有配送费
			isHasDistribution() {
				if(this.notPrice < (this.businessConfig&&+this.businessConfig.starting_price)) {
					return true 
				} else {
					return false
				}
			}
		},
		created(){
			this.shopId = parseInt(this.$route.query.id)
		    this.initData()
		},
		mounted() {
			this.$refs.mainbox.addEventListener('scroll', this.handleScroll, true)
            // window.addEventListener('scroll', this.handleScroll, true)

        },
		methods:{
		    async initData(){
				let params = {
					page: this.page,
					limit: 20,
					supplier_id:this.shopId
				}
				let data = {}
				let shopList = []
				await Promise.all([queryShopCarList({}, this.shopId),businessEntities(params),queryBusinessDetail(this.shopId)]).then(res=>{
					data = res[1].data
					shopList = res[1].data.data.recommendList
					this.shopCart = res[0]
					if(this.page != 1) {
						this.items = [...this.items, ...shopList]
					} else {
						this.items = shopList
					}
					this.items = this._handleData(this.items)
					let nameArr = []
					for(let i=0; i < res[2].data.supplierInfo.short_name.length; i++ ) {
                            nameArr.push(res[2].data.supplierInfo.short_name.charAt(i))
					}
					res[2].data.supplierInfo.shortName = nameArr
					this.businessInfo = res[2].data.supplierInfo;
					this.notices = this.businessInfo.infos
				})
				this.entities = data.data.recommendList;
				adList({channel: 'app', space: 'global-top'}).then( data => {
					this.swipers = data.data.data
				})
			},

			// 通过软键盘输入
			handleChoose(boolear, index) {
				this.items = JSON.parse(JSON.stringify(this.items))
				this.items[index].isSelfChoose = true
			},
			handleScroll() {
                // debugger
                let scrollTop = this.$refs.mainbox.pageYOffset || this.$refs.mainbox.scrollTop || this.$refs.mainbox.scrollTop;
                if (scrollTop > 90) {
                    this.hasError = true
                } else {
                    this.hasError = false;
                }
            },
			/*当前商品的输入框失去焦点
			* 
			*flag类型是boolear值，true为正常修改购物车数量，false为小于最小购买量
			*/
		
			handleBlur(flag, index, num, item) {
				this.items = JSON.parse(JSON.stringify(this.items))
				this.items[index].isSelfChoose = false
				if(flag) {
					this.items[index].num = num
					if(this.shopCart[item.id]) {
                        this.shopCart[item.id].num = num
                        } else {
                            this.$set(this.shopCart, `${item.id}`, {...this.entities[index]})
                    }
				}
			},

			// 获取商业详情
            _queryBusinessDetail() {
                queryBusinessDetail(this.businessData.id).then(res=>{
                    debugger
                })
            },
			add_shop_car(index, item) {
				this.items = JSON.parse(JSON.stringify(this.items))
				if(item.num < item.order_min_num) {
					this.items[index].num += this.items[index].order_min_num
				} else {
					this.items[index].num++
				}
				
				if(this.shopCart[item.id]) {
					if(this.shopCart[item.id].num>0) {
						this.shopCart[item.id].num++
					} else {
						this.shopCart[item.id].num = item.order_min_num
					}
                    
                } else {
					this.$set(this.shopCart, `${item.id}`, {...this.items[index]})
                }
			},
			// 删除购物车
			del_shop_cart(index, item) {
				this.items = JSON.parse(JSON.stringify(this.items))
				if(item.num <= item.order_min_num) {
					this.items[index].num = 0
					this.shopCart[item.id].num = 0
				} else {
					this.items[index].num--
					this.shopCart[item.id].num--
				}
				 
			},
			// 上啦刷新
			loadBottom() {
				this.page++
				let params = {
					page: this.page,
					limit: 20,
					supplier_id:this.shopId
				}
				businessEntities(params).then(res=>{
					let list = res.data.data.recommendList
					if(list.length) {
						list =  this._handleData(list)
						this.items = [...this.items, ...list]
					} else {
						this.allLoaded = true
					}
					this.$refs.loadmore.onBottomLoaded()
				})
			},

			// 对获取到的购物车数据进行处理
			_handleData(data) {
				// debugger
                data.forEach((item, index, arr) => {
					item.isSelfChoose = false
                    item.shopId = this.factoryId
					item.num = 0
					item.cover = `${item.cover}?x-oss-process=image/resize,w_300,m_fixed,h_300,limit_0`
                    item.itemId = item.id
                    item.sale_price = item.price
                    if (this.shopCart[item.id]) {
                        item.num = this.shopCart[item.id].num
					}
					if(item.valid_time>0) {
						arr[index].time = this.$moment.unix(item.valid_time).format("YYYY.MM.DD")
					} else {
						arr[index].time = ''
					}
					
					arr[index].brandName = item.brand&&item.brand.name || '暂无维护'
                })
				this.loading = false
				// console.log(data)
                return data
            },
		}

	}
</script>

<style lang="scss" scoped>
	.left {
		padding: .2rem; 
		background: #fff;
	}
	.mainbox {
		flex: 1;
		overflow: auto;
		// padding: .2rem 0 0 0;
	}
	#CompanyShopList {

	display: flex;
    flex-direction: column;
    height: 100%;
	}
	.list-item {
		overflow: auto;
		flex: 1;
	}
    .notice {
			// margin: .2rem;
        background: #f1f4f5;
        height: .64rem;
        line-height: .64rem;
        display: flex;
        padding: 0 .24rem;
        align-items: center;
		div {
			background: #F9F9F9;
			width: 100%;
			height: .64rem;
			line-height: .64rem;
			display: flex;
			border-radius: 4px;
			align-items: center;
			svg {
				margin-left: .24rem;
			}
			
		}
      

        .notice-list {
            width: 6.2rem;
            height: .88rem;
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
        // margin-top: -10px;
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
	.noData {
		padding-top: .8rem;
	}
</style>