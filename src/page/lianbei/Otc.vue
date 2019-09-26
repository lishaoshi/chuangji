<template>
	<div id="Otc">
		<totalheader></totalheader>
		<div class="text-center">
			<img src="../../../images/developing.png" width="50%" />
			<p class="info">正在开发中，敬请期待。。。。</p>
		</div>
		<lianbei-header/>
	</div>
</template>
<script>
	import Vue from 'vue';
	import totalheader from "@/page/my/lianbei/LianbeiHeader.vue"
	export default {
		name: "Otc",
		components:{
			totalheader
		}
	}
</script>

<style lang="scss" scoped>
	.text-center {
		text-align: center;
	}
	.info {
		font-size: 12px;
		color: #26A2FF;
	}
	
</style>