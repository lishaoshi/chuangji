<template>
  <div class="messageInfo">
    <div class="message-left">
        <div class="icon-box" :class="{partner: this.data.channel=='fenyong', rebate:this.data.channel == 'fenrun'}">
            <svg>
                <use :xlink:href="svg"/>
            </svg>
        </div>
        
    </div>
     <div class="message-right">
         <div class="title-type">
             <span>
                 {{messageType}}
             </span>
             <span>
                 {{data.created_at | filltTime}}
             </span>
         </div>

         <div>
             {{data.content}}
         </div>
     </div>
  </div>
</template>

<script>
export default {
    computed: {
        svg() {
            let icon = ''
            switch (this.data.channel) {
                case 'fenyong':
                    icon = '#icon-promote-promoter'
                    break;
                case 'fenyong':
                    icon = '#icon-promote-partner'
                    break;
                default:
                    icon = '#icon-message-profit'
                    break;
            }
            
            return icon
        },
         messageType() {
            let text = ''
            switch (this.data.channel) {
                case 'tongdao':
                    text = '通道收益'
                    break;
                case 'fenyong':
                    text = '合伙收益'
                    break;
                default:
                    text = '集采返利'
                    break;
            }
            return text
        }
    },
    props: {
        data: {
            type: Object,
            required: true
        }
    },
    filters: {
        filltTime(val) {
            let date = new Date(val*1000)
            let y = date.getFullYear()
            let m = date.getMonth()+1
            let d = date.getDate()
            return `${y}-${m}-${d}`
        }
    }


}
</script>

<style lang="scss" scoped>
.messageInfo {
    padding: .3rem .24rem;
    display: flex;
    margin-top: .2rem;
    background: #fff;
    .message-left {
        display: flex;
        margin-right: .3rem;
        .icon-box {
            border-radius:10px;
            background: #2DA2FF;
            width: .96rem;
            height: .96rem;
            svg {
                width: 100%;
                height: 100%;
            }
        }
        .partner {
            background: #FA5452;
        }
        .rebate {
            background: #FF7612;
        }
    }
    .message-right {
        .title-type {
            display: flex;
            justify-content: space-between;
            margin-bottom: .16rem;
            span {
                font-size: .24rem;
            }
            span:first-child {
                font-size: .32rem;
                color: #333;
            }
        }
        flex: 1;
        font-size: .26rem;
        color: #9C9C9C;
    }
}
</style>