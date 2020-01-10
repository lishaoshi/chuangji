<template>
    <div class="clxsd-cell" @click="handleButton">
        <span class="clxsd-cell-mask" v-if="isLink"></span>
        <div class="clxsd-cell-left">
            <slot name="left"></slot>
        </div>
        <div class="clxsd-cell-wrapper">
            <div class="clxsd-cell-title">
                <slot name="icon">
                    <svg  v-if="icon" class="cell-icon" >
                        <use :xlink:href="'#icon-' + icon" fill="#FF7612"/>
                    </svg>
                </slot>
                <slot name="title">
                    <span class="clxsd-cell-text" v-text="title"></span>
                    <span v-if="label" class="clxsd-cell-label" v-text="label"></span>
                </slot>
            </div>
            <div class="clxsd-cell-value" :class="{ 'is-link' : isLink }">
                <slot>
                    <span v-text="value"></span>
                </slot>
            </div>
            <svg class="cell-icon-go">
                <use xlink:href="#icon-my-enter"/>
            </svg>
        </div>
    </div>
</template>

<script>
    export default {
        name: "Cell",
        props:{
            to: [String, Object],
            icon: String,
            title: String,
            label: String,
            isLink: Boolean,
            value: {},
            color: String
        },
        methods: {
            handleClick($event) {
                $event.preventDefault();
                this.$router.push(this.href);
            },
            handleButton() {
                console.log(123)
            }
        }
    }
</script>

<style lang="scss" scoped>
    .clxsd-cell {
        background-color: #fff;
        box-sizing: border-box;
        color: inherit;
        height: 1rem;
        line-height: 1rem;
        display: block;
        overflow: hidden;
        position: relative;
        text-decoration: none;
        display: flex;
        padding:0 .2rem;
        &-wrapper {
        	display: flex;
        	height: 100%;
        	justify-content: space-between;
        	 border-bottom: 1px solid #f4f5f5;
        	width: 100%;
        	align-items: center;
        	.clxsd-cell-value {
        		font-size: .28rem;
        		color: #666;
        		padding-right: .2rem;
        		line-height: .3rem;
        		width: 2.6rem;
        		text-align: right;
        	}
        }
		&-title {
			width: 100%;
			height: .1rem;
			font-size: .34rem;
			display: flex;
			align-items: center;
			.cell-icon {
				width: .45rem;
				height: .45rem;
				margin-right: .2rem;
			}
		}
    }
    .cell-icon-go {
    	width: .3rem;
    	height: .31rem;
    }
</style>