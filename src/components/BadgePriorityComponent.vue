<script setup>
import { ref } from 'vue'

const props = defineProps({
    status: {
        type: String,
        default: 'default'
    },
    type: {
        type: String,
        default: 'default'
    },
    content: {
        type: String
    }
})

const statusList = {
    Urgent: 'red',
    High: 'orange',
    Medium: 'yellow',
    Normal: 'green',
    Low: 'blue'
}

</script>

<template>
    <a-tag :bordered="false" class="m-0 badge" :class="statusList[status]">

        <svg width="14px" height="14px" viewBox="0 0 24 25" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
                d="M4 5.32534C4.00002 5.19236 4.02656 5.06072 4.07807 4.93812C4.12959 4.81552 4.20503 4.70443 4.3 4.61134C5.38984 3.54298 6.84585 2.93007 8.37166 2.89737C9.89746 2.86468 11.3784 3.41465 12.513 4.43534L12.864 4.76334C13.5934 5.40244 14.5302 5.75477 15.5 5.75477C16.4698 5.75477 17.4066 5.40244 18.136 4.76334L18.385 4.53634C18.995 4.05334 19.912 4.43934 19.995 5.21234L20 5.32534V14.3253C20 14.4583 19.9734 14.59 19.9219 14.7126C19.8704 14.8352 19.795 14.9463 19.7 15.0393C18.6102 16.1077 17.1542 16.7206 15.6283 16.7533C14.1025 16.786 12.6216 16.236 11.487 15.2153L11.136 14.8873C10.4295 14.2683 9.52777 13.9177 8.58872 13.8969C7.64967 13.876 6.73323 14.1863 6 14.7733V21.3253C5.99972 21.5802 5.90212 21.8254 5.72715 22.0107C5.55218 22.196 5.31305 22.3076 5.05861 22.3225C4.80416 22.3374 4.55362 22.2547 4.35817 22.0911C4.16271 21.9275 4.0371 21.6954 4.007 21.4423L4 21.3253V5.32534Z"
                fill="currentColor" />
        </svg>


        <template v-if="content">
            {{ content }}
        </template>
        <template v-else>
            {{ $t(`priority_component.${status}`) }}
        </template>
    </a-tag>
</template>

<style lang="scss" scoped>
.badge {
    display: flex;
    gap: 2px;
    font-weight: 600;
    font-family: 'Gilroy', 'sans-serif';
    padding: 5px 8px;
    font-size: 12px;
    line-height: 14px;
    border: none !important;
}

.circle {
    border-radius: 10px !important;
}

.outline {
    background: transparent !important;
}

.orange {
    background-color: rgba(255, 165, 0, 0.1);
    color: rgb(255, 153, 0);
}

.blue {
    color: rgb(89, 105, 255);
    background-color: rgba(89, 105, 255, 0.1);
}

.yellow {
    color: rgb(255, 204, 0);
    background-color: rgba(255, 204, 0, 0.1);
}

.red {
    color: rgb(255, 59, 48);
    background-color: rgba(255, 59, 48, 0.1);
}

.green {
    background-color: rgba(52, 199, 89, 0.1);
    color: rgb(52, 199, 89);
}

.grey {
    color: rgb(155, 162, 177);
    background-color: rgba(155, 162, 177, 0.1);
}
</style>
