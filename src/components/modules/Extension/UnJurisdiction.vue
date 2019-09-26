<template>
    <div id="UnJurisdiction">
        <img src="../../../images/my/approve.png"  />
        <p>{{message}}</p>
    </div>
</template>

<script>
    export default {
        name: "UnJurisdiction",
        props:{
            message:{
                type: String,
                default:'您还未开启权限，快去首页开启'
            },
        }
    }
</script>

<style lang="scss" scoped>
	#UnJurisdiction {
		padding-top: 2.4rem;
		text-align: center;
		img {
			width: 2.52rem;
			height: auto;
		}
		p {
			font-size: .28rem;
			color: #666;
			margin-top: .4rem;
		}
	}
</style>