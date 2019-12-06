<template>
    <div class="userList">
        <div class="userInfo">
            <img v-if="!avatar && !img_cover" src="../../../images/default_company_logo.png" class="extension-item-img">
            <img v-else :src="avatar?avatar:img_cover" class="extension-item-img">
            <span>{{display_name}}</span>
        </div>
        <div class="userType">
            <span>{{city_name | handleCity}}</span>
            <span v-if="isShow"> • {{companyType}}</span>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        data: {
            type: Object,
            required: true
        },
        isShow: {
            type: Boolean,
            default: false
        }
    },
    filters: {
        handleCity(val) {
            if(val&&val.includes('市')) {
                return val.replace('市', '')
            }
            if(!val) {
                return '无'
            }
        }
    },
    computed: {
        avatar() {
            return this.data.user&&this.data.user.avatar
        },
        img_cover() {
            return this.data.img_cover
        },
        display_name() {
            return this.data.display_name
        },
        city_name() {
            if(this.data.city_name&&this.data.city_name.includes('市辖')) {
                return this.data.province_name
            }
            return this.data.city_name
        },
        companyType() {
            let text = ''
            switch (this.data.type) {
                case 1:
                    text = '工业'
                    break;
                case 2:
                    text = '商业'
                    break;
                case 3:
                    text = '医院'
                    break;
                case 4:
                    text = '连锁'
                    break;
                case 5:
                    text = '单体'
                    break;
                case 6:
                    text = '诊所'
                    break;
                default:
                    text = '--'
                    break;
            }
            return text
        }
    },

}
</script>

<style lang="scss" scoped>
.userList {
    height: 2rem;
    margin: .2rem .2rem 0;
    padding: 0 .32rem;
    display: flex;
    flex-direction: column;
    justify-content: center;
    box-shadow: 0px 0px 3px rgba(0, 144, 255, 0.2);
    position: relative;
    border-radius: 5px;
    // padding-bottom: .32rem;
    .userInfo {
        display: flex;
        align-items: center;
        font-size: .3rem;
        font-weight: bold;
        color: #333;
    }
    .userType {
       position: absolute;
       right: .32rem;
       bottom: .32rem;
       color: #666;
    }
    img {
        width: .96rem;
        height: .96rem;
        margin-right: .24rem;
        border-radius: 50%;
    }
}
</style>