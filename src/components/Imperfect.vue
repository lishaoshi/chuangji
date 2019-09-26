<template>
	<div id="Imperfect">
		<img src="../images/my/approve.png" width="44%">
		<p class="p1">{{userInfo.infoText}}</p>
		<router-link to="" class="go">
			<span>去完善</span>
			<svg>
                <use xlink:href="#icon-business-drug-enter"/>
            </svg>
		</router-link>
	</div>
</template>

<script>
	import { mapState } from "vuex";
	export default {
		name: "Imperfect",
		computed:{
            ...mapState({
                userInfo: state => {
                    const currentInfo = state.CURRENTUSER
                    const configInfo = state.CONFIG
                    let infoState = 0
                    let infoText = '未上传资质,信息完善后才能查看订单'
                    if(currentInfo['certification']){
                        if(1 === currentInfo['certification']['status']){
                            infoState = 1
                        }else if(0 === currentInfo['certification']['status']){
                            infoState = 0
                            infoText = '正在审核中... 请耐心等待'
                        } else if(2 === currentInfo['certification']['status']){
                        	infoState = 0
                        	infoText = '审核失败... 请重新上传'
                        }
                    }
                    return {
                        infoState,
                        infoText
                    }

                },
            })
        },
	}
</script>

<style scoped lang="scss">
	#Imperfect {
		text-align: center;
		padding-top: 2rem;
		.p1 {
			font-size: .26rem;
			line-height: 2;
			color: #666;
			margin-top: .4rem;
		}
		.go {
			font-size: .26rem;
			color: #26A2FF;
			position: relative;
			margin-top: .3rem;
			svg {
				width: .3rem;
				height: .3rem;
				margin-left: .1rem;
				position: relative;
				top:.05rem
			}
		}
	}
</style>