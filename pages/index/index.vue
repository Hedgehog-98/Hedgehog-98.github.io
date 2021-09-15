<template>
	<view class="home">
		<view class="header"></view>
		<view class="container">
			<!-- 分类菜单 -->
			<view class="menu">
				<view class="menu-top" v-if="menuTop">
					<view class="card" v-for="(item, index) in menuTop.list" :style="{ backgroundImage: `url(${item.backgroundImage})` }">
						<view class="title">{{ item.title }}</view>
					</view>
				</view>
				<view class="menu-bottom" v-if="menuBottom">
					<view class="item" v-for="(item, index) in menuBottom.list">
						<image :src="item.image" mode="widthFix"></image>
						<view class="title">{{ item.title }}</view>
					</view>
				</view>
			</view>
			<!-- 猜你喜欢 -->
			<view class="likes">
				<view class="title">
					<image mode="widthFix" src="https://s10.mogucdn.com/mlcdn/c45406/190426_4hlfgkc2ceaea67422ag73077lfce_1611x166.png_1200x9999.v1c7E.81.webp"></image>
				</view>
				<view class="product-list">
					<view class="card" v-for="(item, index) in likes" :key="index">
						<!-- <view class="thumb">
						<image :src="item.img" mode="widthFix" ></image>
						</view> -->
						<image :src="item.img" mode="aspectFill" class="thumb"></image>
						<view class="info">
							<view class="desc">{{ item.title }}</view>
							<view class="box">
								<text class="price">￥{{ item.price }}</text>
								<view class="sale">
									<view class="text">{{ item.cfav }}</view>
									<view class="star"></view>
								</view>
							</view>
							<view class="btn">立即购买</view>
						</view>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
export default {
	data() {
		return {
			likes: [],
			menuTop: null,
			menuBottom: null,
			page: 0
		};
	},
	methods: {
		// 获取数据相关
		// 获取likes数据
		getHomeLikes() {
			uni.request({
				url: `./static/index/likes${this.page}.json`,
				success: res => {
					// console.log(res);
					this.likes = [...this.likes, ...res.data];
				},
				fail: err => {
					console.log(err);
				}
			});
		},
		// 获取首页菜单数据
		getHomeMenu() {
			uni.request({
				url: './static/index/menu.json',
				success: res => {
					// console.log(res);
					this.menuTop = res.data.top;
					this.menuBottom = res.data.bottom;
				},
				fail: err => {
					console.log(err);
				}
			});
		}
	},
	onLoad() {
		// console.log(123);
		// this.getHomeLikes();
		uni.request({
			url: './static/index/likes0.json',
			success: res => {
				// console.log(res);
				this.likes = res.data;
			},
			fail: err => {
				console.log(err);
			}
		});
		this.getHomeMenu();
	},
	// 下拉触底加载更多
	onReachBottom() {
		console.log(123);
		this.page += 1;
		if (this.page <= 1) {
			this.getHomeLikes();
		} else {
			console.log('没有更多了');
		}
	}
};
</script>

<style lang="less">
page {
	// height: 100vh;
	// height: calc(100vh - 44px -50px);
}
.container {
	.menu {
		.menu-top {
			margin: 20rpx 0;
			display: flex;
			justify-content: space-evenly;
			.card {
				display: flex;
				justify-content: center;
				align-items: end;
				width: 175rpx;
				height: 175rpx;
				background-size: cover;
				text-align: center;
				border-radius: 10rpx;
				font-size: 28rpx;
				color: #f0f0f0;

				.title {
					font-weight: 700;
				}
			}
		}
		.menu-bottom {
			display: flex;
			flex-wrap: wrap;
			font-size: 24rpx;
			color: #666666;

			.item {
				width: 150rpx;
				text-align: center;
				margin: 10rpx 0;

				image {
					width: 70%;
				}
			}
		}
	}
	.likes {
		background-color: #efefef;
		.title {
			display: flex;
			justify-content: center;
			align-items: center;
			width: 100%;
			height: 100rpx;
			// margin: 20rpx 0;
			// background-color: #efefef;
			text-align: center;

			image {
				height: 100%;
			}
		}
		.product-list {
			display: flex;
			justify-content: space-evenly;
			flex-wrap: wrap;

			// align-items: center;
			// width: 720rpx;
			// margin: 0 auto;
			.card {
				display: flex;
				flex-direction: column;
				justify-content: space-between;
				width: 350rpx;
				background-color: #fff;
				margin: 0 0 20rpx;

				.thumb {
					width: 100%;
					// border: 1px solid #999;
					box-shadow: 0 5px 2px 1px #fff inset;
					border-radius: 10rpx;
				}

				.info {
					background-color: #fff;
					// border: 1px solid #007AFF;
					padding: 10rpx;
					height: 150rpx;

					.desc {
						white-space: nowrap;
						overflow: hidden;
						text-overflow: ellipsis;
						font-size: 24rpx;
					}

					.box {
						display: flex;
						justify-content: space-between;
						align-items: center;
						// padding: 0 10rpx;
						margin: 10rpx 0;

						.price {
							font-weight: 600;
						}

						.sale {
							display: flex;
							justify-content: center;
							align-items: center;

							.text {
								font-size: 24rpx;
							}
							.star {
								width: 30rpx;
								height: 30rpx;
								margin-left: 6rpx;
								background-image: url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAuCAAAAABLtcWwAAAAAmJLR0QA/4ePzL8AAAJVSURBVEjHjZULb6JAFIX5///ggNYXRdRq3fog2tVqo61r3DWRNU3MqkmNNru6oS0qa63Oig9AEOTEyNzL/WRmOHOlyCkp1Uikqpy8RZ1KTi+x0eXUNZDE9XC4+Vq7BEREFoQsomi5A+QLpqdee8yF7AoQ8HU3uIXgBuiC3e+PwuLXeWARgngY/0Tw31mgjIwepFE6B4wQkPRICmDoDHzyqBvjOvhPR6COxHHi+vgHjgC5U+bhHZmm6AVf7sgWQHoqbv3DPpgXWWO3vio+SRqgtG+DajIsNMbkhMYNIazeD+bbigq0vQAdzTcl4iCpmY/QgLdNqD6YTEsmLiSLWQZ96gsabqoPm3hDcZDcAxI4SkDNPVBDlhrg4tlt/bMfA4o8IvTHXf3vEB7V91AA52oZEofC9sWtsojMztfPosiudtZYJpFYnqtfJpBUi7ZeWsRws3KuX6UQ3Z6+nflm3KnzbpQAbjftvVtfg+qC7FVA8JUYATL2oWJfX4HvYGTtAPURtwfi6BMz8IKUPZDCyAJ0kbcHcuhaANHagnSV9eamAXUn19bwzQKUTjb3vVr64zVA0KdpVQ9ZCxDH2B6Y4MoChGgH/y3pkAVg/Ecli8VRGKDXJmAO3jiFO7+/ODEkeMxNwF9DF+6madCbT1rfhiQmJkBzxup7HPBV394efEDsx/6Y6N44ABPE1Mv0ftN7w+KHOv4QNy2Vvd/+vV/B7NY1i8p7J+cBUn196v0U4Ml13qsImRdNXhi1Q3vujEtVn1zyqHnG6lYyyHDJ5pxYpDSTXGaghf8BQmofv0UdUUcAAAAASUVORK5CYII=');
								background-size: cover;
							}
						}
					}

					.btn {
						text-align: center;
						height: 40rpx;
						padding: 6rpx 0;
						line-height: 40rpx;
						// border: 1px solid #999;
						font-size: 28rpx;
						color: #fff;
						border-radius: 10rpx;
						background-color: rgb(255, 87, 119);
					}
				}
			}
		}
	}
}
</style>
