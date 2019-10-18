<template>
    <div class="role">
        <!-- 信息确认页面 -->
        <clxsd-head-top title='信息确认'></clxsd-head-top>

       <ul class="user-list">
           <li>
               <div class="user">
                   <span>姓名</span>
                   <p>张鑫鑫</p>
               </div>
               <div class="iphone">
                   <span>手机号</span>
                   <p>15237367115</p>
               </div>
           </li>
           <li>
               
           </li>
       </ul>
    </div>
</template>


<script>
export default {
    

}
</script>


<style lang="scss" scoped>
.role {

    .user-list {

        li {
            height: 1.4rem;
            background:rgba(255,255,255,1);
            display: flex;
            
        }
    }
}
</style>