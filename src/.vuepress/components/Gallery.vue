<template>
    <div class="gallery-container">
        <div class="gallery-grid">
            <div class="gallery-item" v-for="(image, index) in images" :key="index">
                <img :src="image.src" :alt="image.alt" class="gallery-image" />
            </div>
        </div>
        <div v-if="loading" class="loading-spinner">加载中...</div>
    </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { Image } from './types';  // 引入类型定义

@Component
export default class Gallery extends Vue {
    images: Image[] = []; // 当前显示的图片列表
    allImages: Image[] = []; // 所有图片列表
    loading: boolean = false; // 加载状态
    perLoad: number = 6; // 每次加载图片的数量
    loaded: number = 0; // 已加载的图片数量

    mounted() {
        this.loadImages();
        this.setupScrollListener();
    }

    // 加载图片列表
    loadImages() {
        const imageList: string[] = require.context('@/public/images/gallery', false, /\.(jpg|jpeg|png|gif)$/).keys();
        this.allImages = imageList.map((src, index) => ({
            src: `/images/gallery${src.replace('./', '/')}`,
            alt: `Image ${index + 1}`,
        }));
        this.loadMoreImages(); // 加载第一批图片
    }

    // 处理滚动加载更多图片
    setupScrollListener() {
        window.addEventListener('scroll', this.handleScroll);
    }

    handleScroll() {
        const scrollHeight = document.documentElement.scrollHeight;
        const scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
        const clientHeight = document.documentElement.clientHeight;

        if (scrollHeight - scrollTop <= clientHeight + 100) {
            // 当页面接近底部时加载更多
            this.loadMoreImages();
        }
    }

    // 加载更多图片
    loadMoreImages() {
        if (this.loading) return;
        this.loading = true;

        // 模拟延迟加载
        setTimeout(() => {
            const nextImages = this.allImages.slice(this.loaded, this.loaded + this.perLoad);
            this.images = [...this.images, ...nextImages];
            this.loaded += nextImages.length;
            this.loading = false;
        }, 1000);
    }
}
</script>

<style scoped>
.gallery-container {
    width: 100%;
    padding: 20px;
}

.gallery-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
    gap: 20px;
    margin-top: 10px;
}

.gallery-item {
    border: 1px solid #ddd;
    border-radius: 8px;
    overflow: hidden;
    transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.gallery-item:hover {
    transform: scale(1.05);
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
}

.gallery-image {
    width: 100%;
    height: auto;
    display: block;
}

.loading-spinner {
    text-align: center;
    font-size: 20px;
    margin-top: 20px;
}
</style>