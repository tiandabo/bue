<template>
    <header>
        <router-link to='/' ><img class="back-top" src="../../static/icon/下 拉.svg"/></router-link>
        <span v-if="title">{{title}}</span>
        <slot name='search'></slot>
        <slot name='right'></slot>
    </header>
</template>

<script>
    export default {
        props: ['title']
    }
</script>

<style lang='scss' scoped>
    header {
		height: .65rem;
		display: flex;
		justify-content: space-between;
		align-items: center;
		background: #F2880B;
		font-size: .32rem;
		color: #fff;
        .back-top {
			/*margin-left: .2rem;*/
			width: .65rem;
			vertical-align: middle;
			transform: rotate(90deg);
		}
    }    
</style>
