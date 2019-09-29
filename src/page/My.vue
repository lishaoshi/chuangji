<template>
	<transition name="my" mode="out-in">
		<page-business-my v-if="USER_TYPE === 2"/>
		<page-lian-shuo-my v-else-if="USER_TYPE === 3" />
		<page-factory-my v-else-if="USER_TYPE === 1"/>
	</transition>
</template>

<script>

    import { mapState } from "vuex";
    import PageBusinessMy from './My/BusinessMy';
    import PageFactoryMy from "./My/FactoryMy";
    import PageLianShuoMy from "./My/LianShuoMy";
	export default {
		name: "page-my",
		components:{
            PageBusinessMy,
            PageFactoryMy,
            PageLianShuoMy,

		},
		computed:{
			...mapState({
                USER_TYPE:state => state.CURRENTUSER.data.userInfo.user_type,
			})
		},
	};
</script>
