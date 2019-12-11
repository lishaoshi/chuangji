<template>
    <div class="shops-price-list">
        <div class="box" :class="{anim: animate}">
            <div v-for="(item, index) of data.prices" :key="index">
                <span>{{item.supplier_name}}</span>
                <span>
                    采购价(元): 
                    <span class="price">
                        {{item.supplier_price}}
                    </span>
                </span>
            </div>
        </div>
            
    </div>
</template>

<script>
export default {
    props: {
        data: Object,
        default:()=>{}
    },
    data(){
        return {
            animate: false,
            timing: null
        }
    },
    mounted() {
        if(this.data.prices.length > 3) {
            this.timing = setInterval(() => {
                this.setInter() 
            }, 2200);
        }
    },
    methods: {
        setInter() {
            this.animate = !this.animate;
            this.timing = setTimeout(() => {
                this.data.prices.push(this.data.prices[0]);
                this.data.prices.shift();
                 this.animate = !this.animate;
            }, 900);
        }
    },
    destroyed() {
        if(this.timing) {
            clearInterval(this.timing)
        }
    }

}
</script>

<style lang="scss" scoped>
.shops-price-list {
    background: #F9F9F9;
    border-radius: 8px;
    display: inline-flex;
    flex-direction: column;
    padding: 0 .1rem;
    font-size: .22rem;
    flex: 0 0 auto;
    align-self: flex-start;
    max-height: 1.92rem;
    overflow-y: hidden;
    span:first-child {
        margin-right: .1rem;
    }
    & > span {
        flex: 0 1 auto;
    }
    .price {
        color: #0090FF;
    }
   
    
}
.box {
     div {
        height: .64rem;
        line-height: .64rem;
        flex: 0 0 auto;
    }
}
.anim {
    transition: linear .8s;
    margin-top: -.64rem;
}
</style>