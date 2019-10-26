<template>
	<div>
		<div class="search" :class="{activeTop: isFullScreen}">
			<div v-if="is_search == true" class="search-form">
                <input type="text" placeholder="请输入搜索内容">
                <svg>
                    <use xlink:href="#icon-ordering-search" />
                </svg>
            </div>
            <ul class="nav-list"  v-if="is_search==false">
                <li :class="`${selected == 1 ? 'active':''}`" @click="selected =1">工业订单</li>
                <li :class="`${selected == 2 ? 'active':''}`" @click="selected = 2">商业订单</li>
            </ul>
			<div class="approve">
				<svg @click="is_search = !is_search" v-if="is_search == false">
					<use xlink:href="#icon-ordering-search" />
				</svg>
                <p @click="is_search = !is_search" v-if="is_search == true">取消</p>
			</div>
		</div>
        <factoryPage v-if="selected === 1"/>
        <businessPage v-if="selected === 2"/>
		<!--订量生产结束-->
		<clxsd-foot-guide :user-type="USER_TYPE" />
	</div>

</template>

<script>
	import { mapState } from "vuex";
	import SearchBar from '@/components/common/SearchBar';
	import { countDownFun } from '@/plugins/coutdown.js';
	import factoryPage from '@/page/order/FactoryOrder'
    import businessPage from '@/page/order/BusinessOrder'
	export default {
		name: "Collect",
		components: {
			SearchBar,
            factoryPage,
            businessPage
		},
		data() {
			return {
				temp: null, //倒计时初始
                isFullScreen: (document.body.clientHeight / document.body.clientWidth) > (16 / 9),
                is_search:false,
                selected:1
			}
		},
		created() {
			this.timer();
		},
		computed: {
			...mapState({
				USER_TYPE: state => state.CURRENTUSER.data.user_type,
			})
		},
		methods: {
			timer() { //页面多个定时器 //主要逻辑都在这页面更新
				let _that = this;
				this.temp = setInterval(() => {
					/*
					_that.orderList.forEach((item, index) => {
						item.dayTime = countDownFun(item.countDown);
						_that.$set(_that.orderList, item.dayTime, countDownFun(item.countDown))
					})*/
				}, 1000)
			},
		},
		destroyed() { //切记页面销毁需要销毁
			clearInterval(this.temp);
		}
	}
</script>

<style lang="scss" scoped>
    .search-form{
        width: 90%;
        background: #0081e5;
        height: .6rem;
        line-height: .6rem;
        border-radius: .6rem;
        align-items: center;
        display: flex;
        input {
            margin-left: .4rem;
            width: 84%;
            height: .5rem;
            background: #0081e5;
            color: #fff;
            &::placeholder {
                color: #fff;
                opacity: .6;
            }
        }
        svg {
            width: .32rem;
            height: .32rem;
        }
    }
    .nav-list {
        width: 80%;
        padding-left: 15%;
        color: #fff;
        text-align: center;
        height: .6rem;
        li {
            display: inline-block;
            padding-left: .3rem;
            font-size: .37rem;
            opacity: .6;
        }
        .active {
            opacity: 1;
            font-size: .47rem;
        }
    }
	.search {
		background: #26A2FF;
		display: flex;
		width: 100%;
		top: 0px;
		padding: 10px 10px 6px;
		z-index: 999;
		justify-content: space-between;
		.retreat {
			width: 30px;
			height: 30px;
		}
		.approve {
			text-align: center;
			margin-left: .1rem;
			width: .7rem;
			svg {
				width: .4rem;
				height: .4rem;
				color: #fff;
                margin-top: .1rem;
			}
            p {
                color: #fff;
                line-height: 2.5;
                font-size: .28rem;
            }
		}
	}
    .activeTop {
        padding-top: 38px;
    }

</style>