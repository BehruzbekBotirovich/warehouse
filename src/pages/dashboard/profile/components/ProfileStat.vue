<template>
    <div class="bg-white rounded-xl shadow p-6 w-full max-w-xl">
        <div v-for="item in stats" :key="item.key"
            class="flex justify-between items-start border-b last:border-b-0 py-2">
            <div class="flex items-center gap-2 text-gray-700">
                <component :is="item.icon" class="text-lg" />
                <span>{{ $t(`stats.${item.key}`) }}:</span>
            </div>
            <div class="font-semibold text-right text-black" v-html="item.value" />
        </div>
    </div>
</template>

<script setup>
import {
    ClockCircleOutlined,
    CalendarOutlined,
    QuestionCircleOutlined,
    CheckCircleOutlined,
    FileTextOutlined,
} from '@ant-design/icons-vue'

const stats = [
    { key: 'workTime', value: '208 soat', icon: ClockCircleOutlined },
    { key: 'workDays', value: '26 kun', icon: CalendarOutlined },
    { key: 'unassignedTasks', value: '14', icon: QuestionCircleOutlined },
    { key: 'completedVolume', value: '4 soat', icon: CheckCircleOutlined },
    { key: 'expectedVolume', value: '33 soat', icon: FileTextOutlined },
    { key: 'daysLate', value: '<strong>26 ish kunidan 14 kun kechikgan</strong>', icon: ClockCircleOutlined },
    { key: 'hoursLate', value: '<strong>208 soat dan 33 soat 21 daqiqa kechikgan</strong>', icon: ClockCircleOutlined },
]
</script>