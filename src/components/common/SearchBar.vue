<template>
	<div class="c-search-bar">
		<form class="input-wrap" onsubmit="return false" action="">
			<svg class="m-icon-svg m-svg-small" @click="searchFn">
				<use xlink:href="#icon-promote-search" />
			</svg>
			<input ref="input"  :value="value" :placeholder="placeholder" @keyup.enter="keyEnter($event)"  type="search" @input="$emit('input', $event.target.value)">
			<svg ref="clearIcon" v-if="value" class="m-icon-svg m-svg-small" @click="clearText">
				<use xlink:href="#icon-empty1" />
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
			flex: auto;
			background-color: #fff;
			align-items: center;
			padding: 0 .2rem;
			border-radius: 8px;
			.m-icon-svg {
				fill: #7c7c7c;
				margin-right: .1rem;
				width: .55rem;
				height: .45rem;
				border-left: 1px solid #f5f5f5;
                position: relative;
                padding-left: .1rem;
			}
			input {
				color: #7c7c7c;
				flex: auto;
				background-color: transparent;
				font-size: .3rem;
				border: 0px;
				line-height: .6rem;
                text-align: center;
				&::-webkit-input-placeholder {
					text-align: center;
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