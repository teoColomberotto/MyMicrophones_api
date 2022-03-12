<template>
    <div :class="notification.type" class="notification">
        <div class="notification-type-icon" v-if="notification.type !== 'message'">
            <font-awesome-icon :icon="typeIcon" size="lg" class="type-icon" />
        </div>
        <div class="notification-message">{{ notification.message }}</div>
        <div class="notification-icon" v-if="dismissible" @click="closeNotification">
            <font-awesome-icon icon="fa-solid fa-xmark" size="lg" class="icon-close" />
        </div>
    </div>
</template>

<script>
export default {
    props: {
        notification: {
            type: Object,
            required: true,
        },
        duration: {
            type: Number,
            required: false,
            default: 5000,
        },
        dismissible: {
            type: Boolean,
            required: false,
            default: true,
        },
    },
    data() {
        return {
            timeout: null,
        };
    },

    computed: {
        typeIcon() {
            if (this.notification.type === 'message') {
                return null;
            }
            if (this.notification.type === 'alert') {
                return 'fa-solid fa-circle-exclamation';
            }
            if (this.notification.type === 'success') {
                return 'fa-solid fa-check';
            }
            if (this.notification.type === 'warning') {
                return 'fa-solid fa-triangle-exclamation';
            }
            if (this.notification.type === 'danger') {
                return 'fa-solid fa-triangle-exclamation';
            }
            return null;
        },
    },

    created() {
        this.timeout = setTimeout(() => {
            this.$store.dispatch('notifications/removeNotification', this.notification);
        }, this.duration);
    },

    beforeDestroy() {
        clearTimeout(this.timeout);
    },

    methods: {
        closeNotification() {
            this.$store.dispatch('notifications/removeNotification', this.notification);
        },
    },
};
</script>

<style scoped>
.notification {
    margin: 1rem auto;
    padding: 1rem;
    max-width: 40rem;
    border-radius: 12px;
    display: flex;
    align-content: center;
    justify-content: space-between;
}

.notification-icon {
    margin-right: 0.5rem;
}

.icon-close {
    color: var(--main-color);
    opacity: 20%;
}
.icon-close:hover {
    color: var(--main-color);
    opacity: 100%;
}
icon-close:active {
    transform: scale(0.9);
}

.message {
    background-color: var(--main-black);
    color: var(--main-color);
}
.alert {
    background-color: blue;
    color: var(--main-white);
}
.success {
    background-color: green;
    color: var(--main-white);
}
.warning {
    background-color: yellow;
    color: var(--main-black);
}
.danger {
    background-color: red;
    color: var(--main-white);
}
</style>
