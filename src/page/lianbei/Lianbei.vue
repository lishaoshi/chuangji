<template>
	<div>
        <clxsd-head-top title='联贝CLT' style="border-bottom: 0px" append="1">
			<div slot="append">
				<router-link to="/lianbei-detail">
					<svg class="lb-svg">
						<use xlink:href="#icon-uniteCoin-account"/>
					</svg>
				</router-link>
				<router-link to="/lianbei-edit">
					<svg class="lb-svg">
						<use xlink:href="#icon-uniteCoin-publish"/>
					</svg>
				</router-link>
			</div>
		</clxsd-head-top>
		<div class="info-bottom">
			<div class="account">
				<p>价值(RMB)</p>
				<p id="U_gold_value">{{currentValue | display_price(3)}}</p>
			</div>
			<div class="line">
			</div>
			<div class="lianbei">
				<p>联贝(CLB)</p>
				<p id='U_gold'>{{balance | display_price }}</p>
			</div>
		</div>
		<mt-navbar v-model="selected">
			<mt-tab-item id="1">市场</mt-tab-item>
			<mt-tab-item id="2">购买</mt-tab-item>
			<mt-tab-item id="3">应用</mt-tab-item>
		</mt-navbar>
		<!-- tab-container -->
		<mt-tab-container v-model="selected">
			<mt-tab-container-item id="1">
				<div class="otc-box">
					<div @click="showTimePicker">
						<span>{{year}}年{{month}}月</span>
						<svg>
			                <use xlink:href="#icon-uniteCoin-dropdownButton"/>
			            </svg>
					</div>
					<div class="total"><!--总计 258787--></div>
				</div>
				<OtcCell></OtcCell>
			</mt-tab-container-item>
			<mt-tab-container-item id="2">
				<div class="buy-form">
					<form>
						<div class="inp1"><input type="text"><label>RMB</label></div>
						<div class="inp1"><input type="text"><label>CLB</label></div>
						<button type="submit" class="btn-sub">购买</button>
					</form>
				</div>
				<LianbeiCard></LianbeiCard>
			</mt-tab-container-item>
			<mt-tab-container-item id="3">
				<div style="margin-top: .2rem">
					<clxsd-cell :title="'转账'" :to="'/transfer-accounts'" is-link icon="promote-cell-transferAccounts"/>
				</div>
			</mt-tab-container-item>
		</mt-tab-container>
		<mt-popup v-model="regionVisible" position="bottom" class="bottom-region" style="width:100%;">
			<mt-datetime-picker v-model="dateValue" type="date" ref="datePicker" year-format="{value} 年" month-format="{value} 月" 
				:startDate="startDate"
				:endDate="new Date()" 
				@confirm="handleConfirm">
			</mt-datetime-picker>
		</mt-popup>
	</div>
</template>

<script>
	import OtcCell from '@/components/modules/lianbei/OtcCell';
    import ClxsdCell from '@/components/common/Cell';
	import LianbeiCard from '@/components/modules/lianbei/LianbeiCard';
	export default {
		name: "lianbei-header",
		data() {
			return {
				selected: '1',
				regionVisible: false,
				dateValue:null,
				year:2015,
				month:1,
				startDate:new Date('2015-01'),
				balance:0.00,
				currentValue:0.00
			}
		},
		 components:{
            OtcCell,
            LianbeiCard,
			ClxsdCell,
        },
		created(){
		  this.initData();
		},
       methods: {
			showTimePicker() {
				this.regionVisible = true;
				//this.$refs.dataPicker.style.color ='red';
				this.$refs.datePicker.open();
				
			},
			handleConfirm() {
				//console.log(this.dateValue)
				let time = this.dateValue
				this.year = this.dateValue.getFullYear();
				this.month = this.dateValue.getMonth() + 1;
				this.isClicked = true;
				
			},
		    initData(){
                this.$http.get('lianbei/info')
                    .then(response => {
                        const { data } = response;
                        if(data){
                            this.balance = data.value;
							this.currentValue = data.currentValue
                        }
                    }).catch(err => {

                })
			}
		},
	}
</script>

<style lang="scss" scoped>
    .sp1 {
        position: absolute;
        right: .2rem;
        top:.2rem
    }
	.lb-svg {
		width: .45rem;
		height: .4rem;
		margin-left: .1rem;
	}
	.info-bottom {
		text-align: center;
		padding: .35rem 0 .35rem;
		background: #26a2ff;
	}
	
	.info-bottom .account,
	.info-bottom .lianbei {
		width: 45%;
		display: inline-block;
	}
	
	.info-bottom .line {
		width: 1px;
		height: .6rem;
		background: rgb(245, 245, 245);
		margin: auto 0;
		display: inline-block;
		opacity: .6;
	}
	
	.info-bottom .account p:nth-child(1),
	.info-bottom .lianbei p:nth-child(1) {
		font-size: .24rem;
		line-height: 140%;
		color: rgba(255, 255, 255, 0.6);
	}
	
	.info-bottom .account p:nth-child(2),
	.info-bottom .lianbei p:nth-child(2) {
		font-size: .32rem;
		color: rgb(255, 255, 255);
		line-height: 140%;
	}
	
	.mint-navbar {
		margin-bottom: .2rem;
	}
	
	.buy-form {
		background: #fff;
		padding: .2rem;
		margin-bottom: .2rem;
		form {
		 width: 100%;	
		}
		.inp1 {
			display: inline-block;
			width: 39%;
			border:1px solid #f1f1f1;
			height: .6rem;
			line-height: .6rem;
			margin-right: 2%;
			input {
				border:0px;
				width: 65%;
				height: 90%;
				padding-left: 4%;
			}
			label {
				float: right;
				padding-right: .1rem;
			}
		}
		.btn-sub {
			width: 17%;
			height: .6rem;
			background: #26A2FF;
			color: #fff;
			float: right;
			border-radius: 3px;
		}
	}
	.otc-box {
		display: flex;
		justify-content: space-between;
		margin-bottom: .18rem;
		padding: 0 .2rem;
		svg {
			width: .2rem;
			height: .18rem;
			margin-left: .05rem;
		}
		.total {
			color: #666;
			font-size: .24rem;
		}
	}
</style>