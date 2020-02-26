<template>
    <div id="main-wrap">
        <router-view/>
    </div>
</template>

<script>
export default {
    
}
</script>

<style lang="scss" scoped>
@import '../../../styles/config.scss';
#main-wrap{
    height: 88vh;
    margin: 75px 0 0 $left;
    border: 20px solid #f7f7ff;
    border-right: none;
    border-bottom: none;
    -webkit-box-sizing: border-box;
}
</style>