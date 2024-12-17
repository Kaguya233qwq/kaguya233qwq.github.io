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
import { defineComponent, ref, onMounted } from 'vue';
import { Image } from './types';  // 引入类型定义

export default defineComponent({
    name: 'Gallery',
    setup() {
        // 定义响应式状态
        const images = ref<Image[]>([]);  // 当前显示的图片列表
        const allImages = ref<Image[]>([]);  // 所有图片列表
        const loading = ref(false);  // 加载状态
        const perLoad = 6;  // 每次加载图片的数量
        const loaded = ref(0);  // 已加载的图片数量

        // 在组件挂载后执行
        onMounted(() => {
            loadImages();
            setupScrollListener();
        });

        // 加载图片列表
        function loadImages() {
            // 使用 require.context 加载图片路径
            const imageList: string[] = require.context('@/public/assets/gallery', false, /\.(jpg|jpeg|png|gif)$/).keys();
            allImages.value = imageList.map((src, index) => ({
                src: `/assets/gallery${src.replace('./', '/')}`,
                alt: `Image ${index + 1}`,
            }));
            loadMoreImages();  // 加载第一批图片
        }

        // 设置滚动监听器
        function setupScrollListener() {
            window.addEventListener('scroll', handleScroll);
        }

        // 滚动事件处理函数
        function handleScroll() {
            const scrollHeight = document.documentElement.scrollHeight;
            const scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
            const clientHeight = document.documentElement.clientHeight;

            if (scrollHeight - scrollTop <= clientHeight + 100) {
                // 当页面接近底部时加载更多
                loadMoreImages();
            }
        }

        // 加载更多图片
        function loadMoreImages() {
            if (loading.value) return;
            loading.value = true;

            // 模拟延迟加载
            setTimeout(() => {
                const nextImages = allImages.value.slice(loaded.value, loaded.value + perLoad);
                images.value = [...images.value, ...nextImages];
                loaded.value += nextImages.length;
                loading.value = false;
            }, 1000);
        }

        // 返回响应式数据和方法
        return {
            images,
            loading,
            loadMoreImages,
        };
    },
});
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