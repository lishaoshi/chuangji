<template>
	<div class="c-search-bar">
		<form class="input-wrap" onsubmit="return false" action="">
			<svg class="m-icon-svg m-svg-small" @click="searchFn">
				<use v-if="lianSho||business||record" xlink:href="#icon-search1" />
				<use v-else-if="isCollect" xlink:href="#icon-sousuo" />
				<use v-else xlink:href="#icon-global-factory-search" />
			</svg>
			<input ref="input"  :value="value" :placeholder="placeholder" @keyup.enter="keyEnter($event)"  type="search" @input="$emit('input', $event.target.value)">
			<svg ref="clearIcon" v-if="value" class="m-icon-svg m-svg-small" @click="clearText">
				<use v-if="isCollect" xlink:href="#icon-qingkong" />
				<use v-else xlink:href="#icon-empty1" />
			</svg>
		</form>
	</div>
</template>

<script>
	import { noop } from "@/util";

	export default {
		name: "SearchBar",
		model: {
			// event: 'keyup'
		},
		props: {
			value: {
				type: String,
				default: ""
			},
			placeholder: {
				type: String,
				default: "请输入关键词"
			},
			back: {
				type: Function,
				default: noop
			},
            searchFn:{
			    type:Function,
				default: noop,
			},
			lianSho:{
				type:Boolean,
				default:false
			},
			business:{
				type:Boolean,
				default:false
			},
			record:{
				type:Boolean,
				default:false
			},
			isCollect:{
				type:Boolean,
				default:false
			}
		},
		methods: {
			onBackClick() {
				if(this.back === noop) this.goBack();
				else this.back();
			},
			keyEnter(e) {
				this.$emit('keyup', e.target.value)
			},
			clearText(){
				this.$emit('clearText')
			},
		},
	};
</script>

<style lang="scss" scoped>
	.c-search-bar {
		position: relative;
		align-items: center;
		background-color: #fff;
		border-radius: 1rem;
		width: 96%;
        margin-left: 2%;
		height: .6rem;
		font-size: .3rem;
		z-index: 1;
		overflow: hidden;
        align-items: center;
        display: flex;
		.input-wrap {
			display: flex;
			// flex: auto;
			width: 100%;
			height: 100%;
			background-color: #fff;
			align-items: center;
			padding: 0 .2rem;
			border-radius: 8px;
			.m-icon-svg {
				fill: #7c7c7c;
				margin-right: .23rem;
				width: .3rem;
				height: .3rem;
				// border-left: 1px solid #f5f5f5;
                position: relative;
                // padding-left: .1rem;
				&:nth-of-type(2) {
					margin-right: .0rem;
				}
			}
			input {
				color: #7c7c7c;
				// flex: auto;
				height: 100%;
				flex-grow: 1;
				background-color: transparent;
				font-size: .28rem;
				border: 0px;
				
				&::-webkit-input-placeholder {
					text-align: left;
				}
			}
		}
		.btn-cancel {
			flex: none;
			text-align: right;
		}
	}
	.clear {
		display: none;
	}
</style>