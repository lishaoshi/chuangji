<template>
	<div id="PlatformFans">
		<clxsd-head-top :title='`我的粉丝`'></clxsd-head-top>
		<ul class="fans-list">
			<li>
				<img src="../../images/my/user_default.png">
				<div>
					<p class="title">张无忌<small>15256986598</small></p>
					<p class="name">张仲景大药房</p>
				</div>
			</li>
			<li>
				<img src="../../images/my/user_default.png">
				<div>
					<p class="title">张无忌<small>15256986598</small></p>
					<p class="name">张仲景大药房</p>
				</div>
			</li>
			<li>
				<img src="../../images/my/user_default.png">
				<div>
					<p class="title">张无忌<small>15256986598</small></p>
					<p class="name">张仲景大药房</p>
				</div>
			</li>
			<li>
				<img src="../../images/my/user_default.png">
				<div>
					<p class="title">张无忌<small>15256986598</small></p>
					<p class="name">张仲景大药房</p>
				</div>
			</li>
		</ul>
	</div>
</template>

<script>
	export default {
		name: 'PlatformFans',
		}
</script>

<style lang="scss" scoped>
	.fans-list {
		background: #fff;
		padding: 0 .2rem;
		li{
			border-bottom: 1px solid #f1f1f1;
			padding: .2rem 0px;
			display: flex;
			img {
				width: 1rem;
				height: 1rem;
			}
			div{
				width: 80%;
				padding-left: 3%;
				p{
					white-space: nowrap;
					overflow: hidden;
					text-overflow: ellipsis;
				}
				.title {
					font-size: .32rem;
					line-height: 150%;
					small {
						font-size: .24rem;
						color: #999;
					}
				}
				.name {
					font-size: .24rem;
					line-height: 1.5;
				}
			}
		}
	}
</style>