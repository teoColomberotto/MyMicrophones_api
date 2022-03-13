<template>
    <div class="img-container">
        <div v-if="dataUrl" :style="{ background }" class="img-placeholder">
            <img :src="placeholder || dataUrl" alt="" v-bind="$attrs" />
        </div>
        <img :alt="$attrs.alt || ''" :src="dataUrl" v-bind="$attrs" class="img" :style="{ objectFit: objectFit }" />
    </div>
</template>

<script>
export default {
    inheritAttrs: false,
    data() {
        return {
            timeOut: null,
        };
    },
    props: {
        src: {
            type: String,
            required: true,
        },
        objectFit: {
            type: String,
            required: false,
            default: 'cover',
        },
        placeholder: { type: String, default: 'https://via.placeholder.com/150' },
        background: String,
    },

    computed: {
        dataUrl() {
            const { width, height } = this.$attrs;
            if (!width || !height) return '';

            // create placheholder
            const w = 100;
            const canvas = document.createElement('canvas');
            canvas.width = w;
            canvas.height = (height / width) * w;
            return canvas.toDataURL;
        },
    },
    mounted() {
        const { src, srcset, $el } = this;

        const observer = new IntersectionObserver(([entry]) => {
            const img = $el.querySelector('img');
            const placeholder = $el.querySelector('.img-placeholder');

            img.onload = function () {
                delete img.onload;
                $el.classList.add('img--loaded');
                if (placeholder) {
                    this.timeOut = setTimeout(() => {
                        placeholder.remove();
                    }, 300);
                }
            };

            if (entry.isIntersecting) {
                // element is in viewport
                if (srcset) {
                    img.srcset = srcset;
                }
                img.src = src;
                observer.disconnect();
            }
        });
        observer.observe($el);

        this.$once('hook:beforeDestroy', () => {
            observer.disconnect();
            if (this.timeOut) {
                clearTimeout(this.timeOut);
            }
        });
    },
};
</script>

<style scoped>
.image-container {
    display: inline-block;
}
.img-placeholder {
    position: absolute;
    overflow: hidden;
}
.img__placeholder img {
    transform: scale(1.05);
    filter: blur(10px);
}

.img {
    opacity: 0;
    transition: opacity 300ms ease;
}

.img--loaded .img {
    opacity: 1;
}
</style>
