<script setup>
import { onMounted, ref } from 'vue';

var startTime = Date.now();
var frame = 0;
var fps = ref(0);

onMounted(() => {
    const ellipse = document.getElementById("ellipse");

    function tick() {
        var time = Date.now();
        frame++;
        if (time - startTime > 1000) {
            fps.value = (frame / ((time - startTime) / 1000)).toFixed(1);
            startTime = time;
            frame = 0;
        }
        window.requestAnimationFrame(tick);
    }
    tick();

    document.addEventListener("pointermove", function (event) {
        if (fps.value > 40) {
            const { clientX, clientY } = event;

            ellipse.animate({
                left: `${clientX}px`,
                top: `${clientY}px`
            }, { duration: 3000, fill: "forwards" });
        }
    }, false);

    document.addEventListener("mouseleave", function (event) {
        ellipse.animate({
            left: `50%`,
            top: `50%`
        }, { duration: 5000, fill: "forwards" });

    }, false);
})
</script>

<template>
    <div id="ellipse"></div>
    <!--<p class="fps">
        {{ fps }}</p>-->
</template>

<style scoped>
@keyframes rotate {
    from {
        rotate: 0deg;
    }

    50% {
        scale: 1 1.5;
    }

    to {
        rotate: 360deg;
    }
}

#ellipse {
    height: 34vmax;
    aspect-ratio: 1;
    position: fixed;
    left: 50%;
    top: 50%;
    translate: -50% -50%;
    border-radius: 50%;
    background: linear-gradient(225deg, #0047FF 0%, #FF00B8 100%);
    filter: blur(8vmax);
    animation: rotate 20s infinite linear;
    opacity: 0.8;
    z-index: -20;
}

.fps {
    position: fixed;
    bottom: 10px;
    right: 10px;
}
</style>