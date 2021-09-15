<template>
	<view class="card">
		<view class="thumb-box">
			<image :src="item.img" mode="widthFix" class="thumb" lazy-load="true"></image>
			<text class="text">已售1件</text>
		</view>
		<view class="info">
			<view class="desc">{{ item.title }}</view>
			<view class="box">
				<text class="price">￥{{ item.price }}</text>
				<view class="sale">
					<view class="text">{{ item.cfav }}</view>
					<view class="star"></view>
				</view>
			</view>
		</view>
	</view>
	<!-- <view class="card">
		<image src="" mode="aspectFill" class="thumb"></image>
		<view class="info">
			<view class="desc"></view>
			<view class="box">
				<text class="price">￥</text>
				<view class="sale">
					<view class="text"></view>
					<view class="star"></view>
				</view>
			</view>
		</view>
	</view> -->
</template>

<script>
export default {
	name: 'card',
	props: {
		item: Object
	},
	data() {
		return {};
	}
};
</script>

<style lang="less">
.card {
	display: flex;
	flex-direction: column;
	justify-content: space-between;
	width: 250rpx;
	background-color: #fff;
	// margin: 0 20rpx 20rpx 0;
	&:nth-child(even) {
		margin-right: 10rpx;
	}
	&:nth-child(odd) {
		margin-right: 10rpx;
		// margin-left: 10rpx;
	}
	.thumb-box {
		position: relative;
		// height: 178px;
		.thumb {
			width: 100%;
			// height: 100%;
			// border: 1px solid #999;
			box-shadow: 0 1px 3px 0px #ccc inset;
			// border-radius: 10rpx;
			// border: 1px solid #ccc;
			border-radius: 10rpx;
		}
		.text {
			position: absolute;
			bottom: 40rpx;
			left: 0;
			padding: 8rpx 50rpx 8rpx 30rpx;
			font-size: 24rpx;
			color: #fff;
			background: linear-gradient(to right ,rgba(0,0,0,.5),rgba(0,0,0,.1));
		}
	}

	.info {
		// background-color: #fff;
		// border: 1px solid #007AFF;
		padding: 10rpx;
		// height: 150rpx;

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
				color: #ff5777;
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
	}
}
</style>
