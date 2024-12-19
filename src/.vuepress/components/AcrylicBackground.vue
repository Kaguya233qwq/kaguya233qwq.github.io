<template>
    <div class="acrylic-background" :style="{ backgroundImage: 'url(' + backgroundUrl + ')' }">
        <div class="acrylic-overlay"></div>
    </div>
</template>

<script>
export default {
    name: 'AcrylicBackground',
    props: {
        backgroundUrl: {
            type: String,
            required: true
        }
    }
};
</script>

<style scoped>
.acrylic-background {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-size: cover;
    background-position: center;
    z-index: -1;
    /* 保证背景图位于最底层 */
}

.acrylic-overlay {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(255, 255, 255, 0.7);
    /* 半透明的背景 */
    backdrop-filter: blur(2px);
    /* 玻璃模糊效果 */
    -webkit-backdrop-filter: blur(10px);
    /* Safari 兼容性 */
    z-index: -1;
}
</style>