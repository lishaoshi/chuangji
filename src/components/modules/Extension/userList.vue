<template>
    <div class="userList">
        <div class="userInfo">
            <img v-if="!avatar && !img_cover" src="../../../images/default_company_logo.png" class="extension-item-img">
            <img v-else :src="avatar?avatar:img_cover" class="extension-item-img">
            <span>{{display_name}}</span>
        </div>
        <div class="userType">
            <span>上海</span>
            <span>·工业</span>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        data: {
            type: Object,
            required: true
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
    box-shadow: 0px 0px 1px #0090ff;
    // padding-bottom: .32rem;
    .userInfo {
        display: flex;
        align-items: center;
        font-size: .3rem;
        font-weight: bold;
    }
    .userType {
        align-self: flex-end;
    }
    img {
        width: .96rem;
        height: .96rem;
        margin-right: .24rem;
    }
}
</style>