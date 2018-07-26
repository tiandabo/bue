<template>
	<div class="home">
		<header class="head">
			<div class="address">
					<router-link to='/address' class='link'>
						<span>{{address.name}}</span>
						<img src="../../static/icon/下 拉.svg" />
					</router-link>
			</div>
			<div class="search">
				<img src="../../static/icon/搜索.svg" />
				<span>搜索店铺名称</span>
			</div>
			<div class="mina">
				<img src="../../static/icon/我的.svg" />
			</div>
		</header>
		<ul class="shop-list"  
			v-infinite-scroll="loadMore"
			infinite-scroll-disabled="loading"
			infinite-scroll-distance="10">
			<li class="list" v-for="list in shopLists">
				<img :src="'//elm.cangdu.org/img/'+list.image_path" alt="" />
				<div>
					<p class="shop-name">{{list.name}}</p>
					<p class="shop-number">
						<span>销量{{list.recent_order_num}}</span>
						<span>好评{{parseInt(list.rating/5*100)}}%</span>
					</p>
					<p class="shop-address">{{list.address}}</p>
					<p class="shop-give">
						<span>{{list.float_minimum_order_amount}}起送</span>
						<span>配送费{{list.float_delivery_fee}}</span>
					</p>
				</div>
				<span class="distance">{{list.distance}}</span>
			</li>
			<li class="bottom">
				<img src="../../static/icon/加载中.svg" class="load" v-if='bottom'/>
				<span v-else>暂无更多</span>
			</li>
		</ul>
	</div>
</template>

<script>
	import axios from '@/config/axios.js';
	import {mapState, mapMutations} from 'vuex';
	import Vue from 'vue';
	import { InfiniteScroll } from 'mint-ui';
	
	Vue.use(InfiniteScroll);
	export default {
		data() {
			return {
				address: {},
				shopLists: [],
				shoplength: 0,
				bottom: true,
			}
		},
		mounted(){
			this.positionInformation();
//			this.shopList()
		},
		methods: {
			...mapMutations([
				'increment'
			]),
			async positionInformation() {
				if(!this.positions) {
					let res = await axios.axiosget('v1/cities?type=guess');
					this.increment(res.data)
					this.address = {...this.positions}
				}else {
					this.address = {...this.positions}
				}
				
			},
			async shopList() {
				let geohash = 'latitude='+this.address.latitude+'&longitude='+this.address.longitude
				let res = await axios.axiosget('shopping/restaurants?'+geohash+'&limit=10&offset='+this.shoplength);
//				console.log(res)
				this.shopLists = [...this.shopLists,...res.data]
				this.shoplength = this.shopLists.length;
				if(res.data.length == 0) {
					this.bottom = false
				}
			},
			loadMore(){
				if(this.bottom == false){
					return
				}
				console.log(this.shoplength)
				this.shopList()
			}
		},
		computed: mapState([
			 'positions'
		])
	}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
	* {
		margin: 0;
		padding: 0;
	}
	
	.head {
		height: .65rem;
		display: flex;
		justify-content: space-around;
		align-items: center;
		background: #F2880B;
		font-size: .25rem;
		.address {
			.link {
				color: #fff;
				text-decoration: none;
			}
			
			span {
				margin-right: -0.1rem;
				display: inline-block;
				line-height: 100%;
				max-width: .8rem;
				overflow: hidden;
				white-space: nowrap;
				text-overflow:  ellipsis;
			}
			img {
				width: .4rem;
				vertical-align: bottom;
			}
		}
		.search {
			width: 65%;
			height: .45rem;
			/*line-height: .45rem;*/
			/*padding: 0 .2rem;*/
			border-radius: .225rem;
			background: rgba(255,255,255,.4);
			display: flex;
			align-items: center;
			font-size: .25rem;
			color: #9B9A99;
			img {
				width: .3rem;
				margin: 0 .1rem 0 .3rem;
			}
		}
		.mina {
			img {
				width: .3rem;
			}
		}
	}
	.shop-list {
		margin-top: .65rem;
		.list{
			border-bottom: 1px solid #9B9A99;
			display: flex;
			justify-content: space-around;
			height: 2rem;
			align-items: center;
			img {
				width: 1.5rem;
				height: 1.5rem;
			}
			div {
				width: 4rem;
				.shop-name {
					font-size: .3rem;
				}
				.shop-number {
					font-size: .2rem;
				}
				.shop-address {
					width: 80%;
					font-size: .25rem;
					white-space: nowrap;
					overflow: hidden;
					text-overflow: ellipsis;
				}
				.shop-give {
					font-size: .25rem;
				}
			}
			.distance {
				font-size: .3rem;
			}
			
		}
	}
	@keyframes rotate{
		0%{
			transform: rotateZ(0deg);
		}
		100%{
			transform: rotateZ(360deg);
		}
	}
	.load {
		animation: rotate 1s infinite linear;
	}
	.bottom {
		text-align: center;
		font-size: .36rem;
		padding: .1rem 0;
	}
</style>