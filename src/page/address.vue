<template>
	<div class="address">
		<heads title='获取位置'>
			<span slot="right"></span>
		</heads>
		<div class="search-city">
			<span>
				<img src="../../static/icon/位置.svg"/>
				{{positions.name}}
			</span>
			<p>
				<img src="../../static/icon/搜索.svg"/>
				<input type="text" v-model="search" placeholder="搜索城市"/>
			</p>
		</div>
		<mt-index-list>
			<mt-index-section v-for="city in cities" :key="city[0].abbr.slice(0,1)" :index="city[0].abbr.slice(0,1)">
				<mt-cell v-for="(i,index) in city" :key="index">
					<p  @click='currentLocation(i)'>{{i.name}}</p>
				</mt-cell>
			</mt-index-section>
		</mt-index-list>
	</div>
</template>

<script>
	import axios from '@/config/axios.js';
	import {mapState, mapMutations} from 'vuex';
	import Vue from 'vue'
	import { IndexList, IndexSection } from 'mint-ui';
	import heads from '@/components/head';
	Vue.component(IndexList.name, IndexList);
	Vue.component(IndexSection.name, IndexSection)
	export default {
		data() {
			return {
				currentCity: '', //当前城市
				cities: [], //所有城市
				search: '', //搜索城市
			}
		},
		async mounted() {
			this.allCities();
		},
		methods: {
			...mapMutations([
				'increment'
			]),
			currentLocation(city) {
				this.increment(city)
				this.$router.push('/home')
			},
			async allCities() {
				let res = await axios.axiosget('v1/cities?type=group');
				let newkey = Object.keys(res.data).sort();
				for(let i = 0; i < newkey.length; i++) {
					this.cities.push(res.data[newkey[i]])
				}
			}

		},
		computed: mapState([
			 'positions'
		]),
		components: {
			heads
		}

	}
</script>

<style lang="scss" scoped>
	.address {
		font-size: .36rem;
		width: 100%;
	}
	.search-city {
		height: .8rem;
		display: flex;
		justify-content: space-between;
		align-items: center;
		p {
			width: 60%;
			height: .5rem;
			line-height: .5rem;
			border: 1px solid #9B9A99;
			margin: 0 .5rem;
			border-radius: .05rem;
			padding-left: .2rem;
			input {
				border: none;
				outline: none;
				width: 80%;
				font-size: .25rem;
			}
			input:-webkit-input-placeholder  {
					color: red;
			}
		}
		span {
			display: flex;
			align-items: center;
			margin: 0 .2rem;
		}
		img {
			width: .4rem;
			vertical-align: middle;
		}
	}
</style>