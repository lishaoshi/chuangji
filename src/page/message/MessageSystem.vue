<template>
	<div class="MessageSystem">
		<clxsd-head-top :title='`我的消息`'></clxsd-head-top>
		<router-link to="" class="item">
	    	<div class="item-top">
	    		<span class="title">标题</span>
	    		<span class="time">2019.06.15</span>
	    	</div>
	    	<div class="item-content">
	    		<span style="width: 100%">习近平指出，2016年中塞建立全面战略伙伴关系以来，双方各领域合作稳步推进，政治互信更加牢固，坚定支持彼此核心利益。塞尔维亚是共建“一带一路”
	    			重要沿线国家，双方要深化互利合作，更好造福两国人民。双方要密切人文交流互鉴，促进民心相通，加强多边领域国际合作，共同维护多边主义，促进世界和平与发展。</span>
	    	</div>
	    </router-link>
	    <router-link to="" class="item">
	    	<div class="item-top">
	    		<span class="title">标题</span>
	    		<span class="time">2019.04.15</span>
	    	</div>
	    	<div class="item-content">
	    		<img src="../../images/img.png" />
                <span>2016年中塞建立全面战略伙伴关系以来，双方各领域合作稳步推进，政治互信更加牢固，坚定支持彼此核心利益。塞尔维亚是共建“一带一路”
	    			重要沿线国家，双方要深化互利合作，更好造福两国人民。双方要密切人文交流互鉴，促进民心相通，加强多边领域国际合作，共同维护多边主义，促进世界和平与发展。</span>
	    	</div>
	    </router-link>
	</div>
</template>

<script>
    export default {
        name: "MessageSystem"
    }
</script>

<style scoped lang="scss">
	.item {
		display: block;
		margin: .3rem .3rem 0;
		background: #fff;
		padding: .15rem;
		border-radius: .1rem;
		.item-top {
			line-height: .6rem;
			height: .6rem;
			.title {
				display: inline-block;
				line-height: 1;
				width: 70%;
				overflow: hidden;
				white-space: nowrap;
				text-overflow: ellipsis;
				color: #333;
				font-size: .34rem;
			}
			.time {
				font-size: 10px;
				color: #CCCCCC;
				float: right;
			}
		}
		.item-content {
			background: #F1F1F1;
			color: #5C5C5C;
			line-height: .54rem;
			max-height: 1.75rem;
			display: flex;
			width: 100%;
			span {
				padding: .05rem .12rem;
				display: block;
				max-height: 77px;
				overflow: hidden;
                width:73% ;
                font-size: .28rem;
			}
			img {
				width: 1.75rem;
				height: 1.75rem;
			}
		}
	}

</style>