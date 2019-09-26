<template>
    <div>
        <div v-if="swipers.length > 0" >
            <mt-swipe :auto="4000" class="swiper" :show-indicators="showIndicator">
                <mt-swipe-item :key="`sw-${index}`"  v-for="(swiper,index) in swipers">
                    <img :src="swiper.data.image" width="100%" />
                </mt-swipe-item>
            </mt-swipe>
        </div>
        <mt-swipe :auto="auto" class="swiper"  :show-indicators="showIndicator" v-else>
            <mt-swipe-item><img src="../../images/banner/banner.png" width="100%"></mt-swipe-item>
            <mt-swipe-item><img src="../../images/banner/banner2.jpg" width="100%"></mt-swipe-item>
            <mt-swipe-item><img src="../../images/banner/banner3.jpg" width="100%"></mt-swipe-item>
            <mt-swipe-item><img src="../../images/banner/banner4.jpg" width="100%"></mt-swipe-item>
        </mt-swipe>
        <CircleLoading v-if="loading" />
    </div>
</template>

<script>
    import { adList} from "@/api/ad";
    export default {
        name: "Swiper",
        props:{
            channel:{
                type:String,
                default:'app'
            },
            space:{
                type:String,
                default:null,
            },
            auto:4000,
            showIndicator: false
        },
        data(){
            return {
                loading: false,
                swipers:[],

            }
        },
        created(){
            this.initData()
        },
        methods:{
            async initData(){
                const { data } =await  adList({channel:this.channel,space:this.space})
                this.swipers = data
            }
        }


    }
</script>

<style lang="scss" scoped>
    .swiper {
        height: 2.5rem;
        width: 7.2rem;
        margin: 0 auto;
        border-radius: .08rem;
        overflow: hidden;
        margin-top: .2rem;
    }
</style>