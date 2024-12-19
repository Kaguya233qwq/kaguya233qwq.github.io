<template>
    <div class="Season">
        <canvas id="canvas_season" ref="canvas_season" :style="{ zIndex: zIndex }"></canvas>
    </div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted } from 'vue';

class Falling {
    x: number;
    y: number;
    s: number;
    r: number;
    fn: any;
    that: any;
    img: HTMLImageElement;

    constructor(x: number, y: number, s: number, r: number, fn: any, that: any, img: HTMLImageElement) {
        this.x = x;
        this.y = y;
        this.s = s;
        this.r = r;
        this.fn = fn;
        this.that = that;
        this.img = img;
    }

    draw(cxt: CanvasRenderingContext2D) {
        cxt.save();
        const xc = 40 * this.s / 4;
        cxt.translate(this.x, this.y);
        cxt.rotate(this.r);
        cxt.drawImage(this.img, 0, 0, 40 * this.s, 40 * this.s);
        cxt.restore();
    }

    update() {
        this.x = this.fn.x(this.x, this.y);
        this.y = this.fn.y(this.y, this.y);
        this.r = this.fn.r(this.r);

        if (this.x > window.innerWidth || this.x < 0 || this.y > window.innerHeight || this.y < 0) {
            this.r = this.that.getRandom('fnr');
            if (Math.random() > 0.4) {
                this.x = this.that.getRandom('x');
                this.y = 0;
                this.s = this.that.getRandom('s');
                this.r = this.that.getRandom('r');
            } else {
                this.x = window.innerWidth;
                this.y = this.that.getRandom('y');
                this.s = this.that.getRandom('s');
                this.r = this.that.getRandom('r');
            }
        }
    }
}

class FallingList {
    list: Falling[];

    constructor() {
        this.list = [];
    }

    push(falling: Falling) {
        this.list.push(falling);
    }

    update() {
        for (let i = 0, len = this.list.length; i < len; i++) {
            this.list[i].update();
        }
    }

    draw(cxt: CanvasRenderingContext2D) {
        for (let i = 0, len = this.list.length; i < len; i++) {
            this.list[i].draw(cxt);
        }
    }

    get(i: number) {
        return this.list[i];
    }

    size() {
        return this.list.length;
    }
}

export default defineComponent({
    name: 'Season',
    setup() {
        const staticx = ref(false);
        const stop = ref<number | null>(null);
        const num = ref(50); // Use a default number of falling elements
        const show = ref(true); // Boolean to control showing the animation
        const zIndex = ref(0); // Canvas zIndex style

        // Random generator function
        const getRandom = (option: string): any => {
            let ret: any;
            let random: number;
            switch (option) {
                case 'x':
                    ret = Math.random() * window.innerWidth;
                    break;
                case 'y':
                    ret = Math.random() * window.innerHeight;
                    break;
                case 's':
                    ret = Math.random();
                    break;
                case 'r':
                    ret = Math.random() * 6;
                    break;
                case 'fnx':
                    random = -0.5 + Math.random() * 1;
                    ret = (x: number) => x + 0.5 * random - 1.7;
                    break;
                case 'fny':
                    random = 1.5 + Math.random() * 0.7;
                    ret = (y: number) => y + random;
                    break;
                case 'fnr':
                    random = Math.random() * 0.03;
                    ret = (r: number) => r + random;
                    break;
            }
            return ret;
        };

        // Function to start falling animation
        const startFalling = () => {
            const canvas = document.getElementById('canvas_season') as HTMLCanvasElement;
            staticx.value = true;
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
            const cxt = canvas.getContext('2d')!;
            const fallingList = new FallingList();
            const img = new Image();

            // Get current month to decide the season
            const month = new Date().getMonth() + 1;

            // Set image based on the season
            switch (month) {
                case 3:
                case 4:
                case 5:
                    img.src = '/assets/images/sakura.png';
                    break;
                case 6:
                case 7:
                case 8:
                    img.src = '/assets/images/pop.png';
                    break;
                case 9:
                case 10:
                case 11:
                    img.src = '/assets/images/leaf.png';
                    break;
                case 12:
                case 1:
                case 2:
                    img.src = '/assets/images/snow.png';
                    break;
                default:
                    break;
            }

            // Create falling elements
            for (let i = 0; i < num.value; i++) {
                const randomX = getRandom('x');
                const randomY = getRandom('y');
                const randomR = getRandom('r');
                const randomS = getRandom('s');
                const randomFnx = getRandom('fnx');
                const randomFny = getRandom('fny');
                const randomFnR = getRandom('fnr');

                const falling = new Falling(
                    randomX,
                    randomY,
                    randomS,
                    randomR,
                    { x: randomFnx, y: randomFny, r: randomFnR },
                    { getRandom },
                    img
                );

                falling.draw(cxt);
                fallingList.push(falling);
            }

            // Animation loop
            const animate = () => {
                cxt.clearRect(0, 0, canvas.width, canvas.height);
                fallingList.update();
                fallingList.draw(cxt);
                stop.value = window.requestAnimationFrame(animate);
            };

            stop.value = window.requestAnimationFrame(animate);
        };

        // Function to stop the falling animation
        const stopp = () => {
            if (staticx.value) {
                const child = document.getElementById('canvas_season');
                child?.parentNode?.removeChild(child);
                if (stop.value) window.cancelAnimationFrame(stop.value);
                staticx.value = false;
            } else {
                startFalling();
            }
        };

        // Start falling effect when component is mounted
        onMounted(() => {
            if (show.value) {
                startFalling();
            }
        });

        return {
            staticx,
            stop,
            num,
            show,
            zIndex,
            getRandom,
            startFalling,
            stopp
        };
    }
});
</script>

<style scoped>
#canvas_season {
    pointer-events: none;
    position: fixed;
    top: 0;
    left: 0;
    z-index: -1;
}
</style>