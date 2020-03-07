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
#main-wrap{
    height: 88vh;
    border: 20px solid #f7f7ff;
    border-right: none;
    border-bottom: none;
    box-sizing: border-box;
    @include webkit(box-sizing,border-box);
    @include webkit(transition,all .5s ease 0s);
    padding: 30px 30px 0 30px;
}

.open{
  #main-wrap{
    margin: 75px 0 0 $menuWidth;
  }
}
.close{
  #main-wrap{
    margin: 75px 0 0 $cmenuWidth;
  }
}
</style>