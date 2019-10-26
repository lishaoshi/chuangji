<template>
	<div class="clxsd-loadmore" style="transform: translate(0,0)" @mousedown="startDrag" @touchstart="startDrag" @mousemove.stop="onDrag" @touchmove.stop="onDrag" @mouseup="stopDrag" @touchend="stopDrag" @mouseleave="stopDrag">

		<!-- header -->
		<div ref="head" :style="{transform: `translateY(${ tY - topBarHeight }px)`, transitionDuration}" class="clxsd-loadmore-head clxsd-loadmore-head-box">
			<slot name="head">
				<CircleLoading v-if="refreshing" />
			</slot>
		</div>

		<!-- body -->
		<div :style="{transform: `translateY(${tY}px)`, transitionDuration }" class="clxsd-loadmore-main">
			<slot/>

			<!-- footer -->
			<div v-if="bottomStatus > 0 && showBottom" :class="`clxsd-loadmore-foot status-${bottomStatus}`" @click="beforeLoadMore">
				<slot name="foot">
					<CircleLoading v-if="bottomStatus === 1" />
					<span>{{ bottomTxt }}</span>
				</slot>
			</div>
		</div>
	</div>
</template>

<script>
	import _ from "lodash";

	const getScrollTarget = el => {
		while(
			el &&
			el.nodeType === 1 &&
			el.tagName !== "HTML" &&
			el.tagName !== "BODY"
		) {
			const overflowY = document.defaultView.getComputedStyle(el).overflowY;
			if(overflowY === "scroll" || overflowY === "auto") {
				return el;
			}
			el = el.parentNode;
		}
		return document.documentElement;
	};

	export default {
		name: "ClxsdLoadMore",
		props: {
			topDistance: {
				type: Number,
				default: 0
			},
			noAnimation: {
				type: Boolean,
				default: false
			},
			autoLoad: {
				type: Boolean,
				default: true
			},
			showBottom: {
				type: Boolean,
				default: true
			},
		},
		data() {
			return {
				//用于计算 scrollTop 的节点
				scrollTarget: null,

				dY: 0,
				startY: 0,
				pulling: false,
				dragging: false,

				loading: false,
				noMore: false,
				refreshing: false,

				topBarHeight: 0,

				isTop: true,
				topTxt: '下拉刷新',
				bottomTxt: '点击加载更多'

			};
		},
		computed: {
			maxDistance() {
				return this.topDistance > 0 ? this.topDistance : this.topBarHeight * 1.5
			},
			tY() {
				return this.noAnimation ? 0 : 80 * Math.atan(this.dY / 200)
			},
			transitionDuration() {
				return this.pulling ? '0s' : '200ms'
			},
			topStatus() {
				return this.refreshing ? 2 : this.tY > this.maxDistance ? 1 : 0
			},
			bottomStatus() {
				return this.refreshing ? 0 : this.loading ? 1 : this.noMore ? 2 : 3
			},
		},
		watch: {
			topStatus(val) {
				const text = ['下拉刷新', '释放更新', '正在刷新'] // ['下拉刷新', '释放更新', '正在刷新']
				this.topTxt = text[val]
			},
			bottomStatus(val) {
				const text = ['加载中...', '-- 没有更多 --', '点击加载更多'] // ['加载中...', '-- 没有更多 --', '点击加载更多']
				this.bottomTxt = ['', ...text][val]
			},
		},
		mounted() {
			this.scrollTarget = getScrollTarget(this.$el);
			this.topBarHeight = this.$refs.head.clientHeight;
			//console.log(this.autoLoad) 
			//console.log(this.$el)
			if(this.autoLoad && !this.isFulled()) {
				this.beforeRefresh()
			}
		},
		methods: {
			startDrag(e) {
				// console.log(e)
				// debugger
				e = e.changedTouches ? e.changedTouches[0] : e;
				if(this.loading || this.refreshing || this.scrollTarget.scrollTop > 0) {
					return
				}
				this.topBarHeight = this.$refs.head.clientHeight
				//console.log(this.topBarHeight)
				this.$emit('onPullStart')
				this.dragging = true
				this.startY = e.pageY
			},

			// 开始动作函数
			startUp(e) {
			},
			onDrag(e) {
				// console.log(123123123)
				const $e = e.changedTouches ? e.changedTouches[0] : e;
				const offsetY = $e.pageY - this.startY
				// 是否为下拉操作
				const isPull = offsetY > 0

				if(this.dragging && isPull && window.scrollY <= 0) {
					// 阻止 原生滚动 事件
					e.preventDefault()

					this.dY = offsetY
					this.pulling = true
					this.$emit('onPull', this.dY)
				}
			},
			stopDrag() {
				this.dragging = false
				this.pulling = false

				this.$emit('onPullEnd')

				this.tY > this.maxDistance && window.scrollY <= 0 ?
					this.beforeRefresh() :
					(this.dY = 0)
			},
			beforeRefresh() {
				this.dY = Math.tan(this.topBarHeight / 80) * 200

				if(this.refreshing) return

				this.noMore = false
				this.refreshing = true

				this.$emit('onRefresh', (noMore = false) => {
					this.afterRefresh(noMore)
				})
			},
			afterRefresh(noMore = true) {
				this.dY = 0
				this.noMore = noMore
				this.refreshing = false
				this.$emit('afterRefresh')

				this.$nextTick(() => {
					noMore ||
						(this.showBottom &&
							this.autoLoad &&
							!this.isFulled() &&
							this.beforeLoadMore())
				})
			},
			beforeLoadMore() {
				if(this.loading || this.refreshing || this.noMore) return
				this.loading = true
				this.$emit('onLoadMore', (noMore = false) => {
					this.afterLoadMore(noMore)
				})
			},
			afterLoadMore(noMore = true) {
				this.noMore = noMore
				this.loading = false
				this.$emit('afterLoadMore')

				this.$nextTick(() => {
					noMore || (this.autoLoad && !this.isFulled() && this.beforeLoadMore())
				})
			},
			isFulled() {
				//console.log(this.$el)
				//console.log(this.scrollTarget)
				//console.log("是否填满")
				//console.log(this.$el.getBoundingClientRect().bottom)
				//console.log(this.scrollTarget.clientHeight)
				return(
					this.$el.getBoundingClientRect().bottom >=
					this.scrollTarget.clientHeight
				)
			},
		}
	};
</script>

<style lang="scss" scoped>
	.clxsd-loadmore {
		position: relative;
		&-head,
		&-foot {
			width: 100%;
		}
		&-head {
			position: fixed;
			z-index: 0;
			.jo-loadmore-icon::after {
				content: '↓';
			}
		}
		&-head-box {
			height: 45px;
			/*no*/
			display: flex;
			align-items: center;
			justify-content: center;
			color: #7c7c7c;
			font-size: 0.28rem;
            z-index: 1;
			>span {
				vertical-align: middle;
				margin-left: 0.2rem;
			}
			i {
				font-style: normal;
				transition: all 0.3s ease;
			}
		}
		&-foot {
			height: 100px;
			display: flex;
			align-items: center;
			justify-content: center;
			font-size: 0.28rem;
			&.status-2 {
				color: #ccc;
			}
		}
		&-main {
			background-color: inherit;
		}
	}
</style>