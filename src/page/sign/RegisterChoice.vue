<template>
	<div id="RegisterChoice">
        <clxsd-head-top title='' style="border:0px"></clxsd-head-top>
		<img src="../../images/login/icon.png" width="100%" />
		<div class="choice-content" v-if="choiceTypes.length > 0">
			<ul class="choice-list" v-for="(item,index) in choiceTypes"
				:key="`${index}--${item.type}`">
					<li v-if="item.status === 1">
						<router-link  :to="{path:'/signup',query:{user_type:item.type}}">
						<img :src="item.imgSrc">
						<p class="p1">{{item.title}}</p>
						</router-link>
					</li>
			</ul>
		</div>
		<ul class="choice-list" v-else>
				<li>
					<router-link  :to="`/signup?user_type=1&hashid=${hashid}`">
					<img src="../../images/login/industrySelected@2x.png">	
					<p class="p1">工业注册</p>
					</router-link>
				</li>
				<li >
					<router-link  :to="`/signup?user_type=2&hashid=${hashid}`">
					<img src="../../images/login/businessSelected@2x.png">
					<p>商业注册</p>
					</router-link>
				</li>
				<li>
					<router-link  :to="`/signup?user_type=3&hashid=${hashid}`">
					<img src="../../images/login/chainShopSelected@2x.png">
					<p>采购注册</p>
					</router-link>
				</li>
				<li>
					<router-link  :to="`/signup?user_type=4&hashid=${hashid}`">
					<img src="../../images/login/tuiguang.png">
					<p>推广注册</p>
					</router-link>
				</li>
		</ul>
	</div>
</template>

<script>
    import { mapState } from "vuex";
	export default {
		name: "page-register-choice",
		computed:{
			...mapState({
                choiceTypes: state => {
                    const config = state.CONFIG;
                    return (config['register'] && config['register']['register-choice-types']) ? config['register']['register-choice-types'] :[]
                }
			})
		},
		data() {
			return {
				hashid: ''
			}
		},
		created() {
			if(this.$route.query.hashid) {
				this.hashid = this.$route.query.hashid
			}
		}
	}
</script>

<style lang="scss" scoped>
	#RegisterChoice {
		height: 100%;
		background: #fff;
	}
	.choice-list {
		padding: 1rem .5rem;
		text-align: center;
		li {
			display: inline-block;
			width: 45%;
			font-size: .24rem;
			line-height: 130%;
			margin-bottom: .5rem;
            a {
                color: #333;
            }
			img {
				width: 1.5rem;
                height: 1.5rem;
			}
		}
	}
	.router-link-active {
		color: #333;
	}
</style>