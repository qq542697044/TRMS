<template>
    <div>
        <LayoutHeader/>
        <LayoutMain/>
        <LayoutNav/>
    </div>
</template>

<script>
import LayoutHeader from './Components/header'
import LayoutMain from './Components/main'
import LayoutNav from './Components/nav'
export default {
    name:'layout',
    components:{LayoutHeader,LayoutMain,LayoutNav},
    setup(){

    }
}
</script>

<style lang="scss" scoped>

</style>