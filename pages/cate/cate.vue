<template>
	<view class="cate">
		<view class="cate-left">
			<scroll-view class="wrapper" :scroll-top="scrollTop" scroll-y="true" @scrolltoupper="upper" @scrolltolower="lower" @scroll="scroll">
				<view class="item" :class="{ active: currentIndex === index }" v-for="(item, index) in main" :key="index" @click="itemClick(index)">
					<view class="title">{{ item.title }}</view>
				</view>
			</scroll-view>
		</view>
		<view class="cate-right">
			<scroll-view class="wrapper" scroll-y="true">
				<view class="category" v-if="category">
					<view class="nav">
						<view class="nav-item" v-for="(item, index) in category.data.list" :key="index">
							<view class="imgBox">
								<image :src="item.image" mode="widthFix"></image>
							</view>
							<view class="title">{{ item.title }}</view>
						</view>
					</view>
					<view class="cube" v-if="cube">
						<view class="tab">
							<view class="tab-item" v-for="(item, index) in cube.sortFilter" :key="index">{{ item.title }}</view>
						</view>
						<view class="card-list">
							<card v-for="(item, index) in cube.wall.docs" :key="index" :item="item"></card>
						</view>
					</view>
				</view>
			</scroll-view>
		</view>
	</view>
</template>

<script>
// import card from '@/components/card/card.vue';
export default {
	data() {
		return {
			main: [],
			scrollTop: 0,
			currentIndex: 0,
			category: null,
			cube: null,
		};
	},
	// components:{
	// 	// card,
	// },
	methods: {
		// 获取数据相关
		getCateMain() {
			uni.request({
				url: './static/cate/main.json',
				success: res => {
					// console.log(res);
					this.main = res.data;
					// 获取右边数据
					this.getRightData(res.data[this.currentIndex]);
				},
				fail: err => {
					console.log(err);
				}
			});
		},
		getRightData(item) {
			// https://mce.mogucdn.com/jsonp/get/3?pid=598&appPlat=m&callback=jsonp4
			// 商品分类
			console.log(item);
			uni.request({
				// url: `http://api.kele8.cn/agent/https://mce.mogucdn.com/jsonp/get/3?pid=${item.maitKey}&appPlat=m&callback=jsonp7`,
				url: "http://api.kele8.cn/agent/https://mce.mogucdn.com/jsonp/get/3?pid="+ item.maitKey +"&appPlat=m&callback=jsonp2",
				success: res => {
					// console.log(res);
					this.category = JSON.parse(res.data.replace(/(^jsonp2\(|\)$)/gi, ''));
				},

				fail: err => {
					console.log(err);
				}
			});
			// 商品详情
			// https://list.mogujie.com/search?cKey=h5-cube&fcid=50005&page=2&_version=1&pid=&q=&cpc_offset=0&_=1631697363594&callback=jsonp9
			// http://api.kele8.cn/agent/https://list.mogujie.com/search?cKey=h5-cube&fcid="+ item.miniWallkey,
			uni.request({
				// url: `http://api.kele8.cn/agent/https://list.mogujie.com/search?cKey=h5-cube&fcid=${item.miniWallkey}`,
				url: "http://api.kele8.cn/agent/https://list.mogujie.com/search?cKey=h5-cube&fcid="+ item.miniWallkey,
				success: res => {
					console.log(res);
					this.cube = res.data.result;
				},
				fail: err => {
					console.log(err);
				}
			});
		},
		// 事件相关
		itemClick(index) {
			this.currentIndex = index;
			this.getRightData(this.main[index]);
		},
		upper: function(e) {
			// console.log(e);
		},
		lower: function(e) {
			// console.log(e);
		},
		scroll: function(e) {
			// console.log(e);
			// this.old.scrollTop = e.detail.scrollTop
		}
	},
	onLoad() {
		// 获取右边数据
		this.getCateMain();

	}
};
</script>

<style lang="less">
.cate {
	display: flex;
	.cate-left {
		width: 200rpx;
		height: calc(100vh - 44px - 50px);
		box-sizing: border-box;
		.wrapper {
			width: 100%;
			height: 100%;
			line-height: 3;
			background-color: #f6f6f6;
			text-align: center;
			font-size: 28rpx;
			box-sizing: border-box;

			.item {
				&.active {
					position: relative;
					background-color: #fff;
					border-radius: 0 10rpx 10rpx 0;
					color: #ff5a5f;
					.title {
						&::before {
							content: '';
							position: absolute;
							top: 50%;
							left: 0;
							height: 28rpx;
							margin-top: -18rpx;
							border-left: 8rpx solid #ff5a5f;
							box-sizing: border-box;
						}
					}
				}
			}
		}
	}
	.cate-right {
		width: 550rpx;
		height: calc(100vh - 44px - 50px);
		.wrapper {
			width: 100%;
			height: 100%;
			.category {
				width: 100%;
				.nav {
					width: 100%;
					display: flex;
					flex-wrap: wrap;
					justify-content: flex-start;
					font-size: 24rpx;
					.nav-item {
						text-align: center;
						width: 180rpx;
						height: 180rpx;
						margin-top: 50rpx;
						.imgBox{
							margin: 0 auto;
							width: 70%;
							image {
								width: 100%;
							}
						}
						.title {
							margin: 20rpx 0;
						}
					}
				}
				.tab {
					width: 100%;
					display: flex;
					align-items: center;
					text-align: center;
					margin: 100rpx 0 20rpx;
					padding-bottom: 30rpx;
					border-bottom: 1px solid #ccc;
					.tab-item {
						// 高亮
						&.active {
						}
						flex: 1;
						// &:nth-child(2){
						// 	border-left: 2rpx solid #aaa;
						// 	border-right: 2rpx solid #aaa;
						// }
						&:nth-child(2) {
							&::before {
								content: '|';
								color: #ccc;
								padding-right: 50rpx;
							}
							&::after {
								color: #ccc;
								content: '|';
								padding-left: 50rpx;
							}
						}
					}
				}
				.card-list{
					width: 100%;
					display: flex;
					flex-wrap: wrap;
					justify-content: space-evenly;
				}
			}
		}
	}
}
</style>
