<template>
    <transition name="home" mode="out-in">
         <page-lianshuo-home v-if="USER_TYPE ===3"/>
         <page-business-home v-else-if="USER_TYPE ===2" />
         <page-factory-home v-else-if="USER_TYPE ===1" />
         <page-extension-home v-else-if="USER_TYPE ===4" />
         <pageRootHome v-if="rootHome" />
    </transition>
</template>

<script>
    import BusinessHome from './Home/BusinessHome'
    import FactoryHome from './Home/FactoryHome'
    import LianShuoHome from './Home/LianShuoHome';
    import ExtensionHome from './Home/ExtensionHome';
    import pageRootHome from "./Home/RootHome";
    import { mapState } from "vuex";
    export default {
        name: "page-home",
        components:{
            [BusinessHome.name]:BusinessHome,
            [LianShuoHome.name]:LianShuoHome,
            [FactoryHome.name]:FactoryHome,
            [ExtensionHome.name]:ExtensionHome,
            pageRootHome

        },
        computed:{
            ...mapState({
                USER_TYPE: state => state.CURRENTUSER.data.user_type,
                rootHome: state => !!state.CURRENTUSER.data.is_root,
            }),

        },
        created(){
        }
    }
</script>
