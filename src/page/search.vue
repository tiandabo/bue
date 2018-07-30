<template>
	<div class="search">
		<heads>
			<div slot="search" class="search-head">
				<input type="text" placeholder="请输入搜索内容">
			</div>
			<div slot="right">
				<button class="submit">搜索</button>
			</div>
		</heads>
	</div>
</template>

<script>
	import heads from '@/components/head';
	export default {
		components: {
			heads
		}
	}
</script>

<style lang="scss" scoped>
	.search-head {
		width: 70%;
		height: .5rem;
		display: flex;
		border-radius: .5rem;
		background: #FDF8F4;
		padding: 0 .25rem;
		overflow: hidden;
		>input {
			width: 100%;
			border: none;
			background: #FDF8F4;
			font-size: .3rem;
			outline: none;
		}
		
	}
	.submit {
			background: #FDF8F4;
			padding: .05rem .15rem;
			font-size: .25rem;
			border: none;
			margin:  0 .2rem 0 .1rem;
			border-radius: .15rem;
			color: #F2880B;
	}	
</style>