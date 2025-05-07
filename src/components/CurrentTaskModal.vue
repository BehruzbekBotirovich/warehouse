<template>

    <div class="flex h-full w-[950px]">
        <!-- Левая часть: форма -->
        <div class="w-2/3 p-6 bg-white rounded-lg shadow-md border overflow-y-auto">
            <h2 class="text-xl font-semibold mb-6">Vazifani o'zgartirish</h2>

            <a-form layout="vertical" @submit.prevent="handleSubmit">
                <a-form-item label="* Sarlavha kiriting">
                    <a-input v-model:value="form.title" required />
                </a-form-item>

                <a-form-item label="Vazifa izohini kiriting">
                    <a-textarea v-model:value="form.description" rows="5" />
                </a-form-item>

                <a-form-item>
                    <h3>{{$t('task.linked_employees')}}</h3>
                    <a-select v-model:value="form.assignees" mode="multiple" placeholder="Tayinlash"
                        :options="userOptions" show-search allow-clear />
                </a-form-item>

                <a-form-item>
                    <h3>{{ $t('task.priority') }}</h3>
                    <div class="flex flex-wrap gap-2">
                        <a-tag v-for="priority in priorities" :key="priority.value"
                            :color="form.priority === priority.value ? priority.color : 'default'"
                            @click="form.priority = priority.value"
                            class="cursor-pointer px-4 py-1 border rounded-full hover:opacity-80">
                            {{ priority.label }}
                        </a-tag>
                    </div>
                </a-form-item>
                <div>
                    <h3>{{ $t('task.time_limit') }}</h3>
                    <a-tag class="flex w-fit items-center gap-1" color="blue"
                        size="small">
                        <icon-clock />
                        {{ dayjs(tasksStore.current_task?.startDate).format('MMM D  HH:mm') }} -
                        {{ dayjs(tasksStore.current_task?.dueDate).format('MMM D    HH:mm') }}
                    </a-tag>
                </div>
                <div class="flex gap-2 items-center">
                    <a-form-item label="Vaqt oraligi ozgatirish" class="w-3/4 pt-6">
                        <a-range-picker v-model:value="form.dateRange" show-time format="YYYY-MM-DD HH:mm"
                            class="w-full" />
                    </a-form-item>

                    <a-form-item label="Davomiyligi (soatda)" class="w-1/4 pt-6">
                        <a-input-number v-model:value="form.duration" :min="1" class="w-full" />
                    </a-form-item>
                </div>

                <div class="flex justify-end gap-2 mt-4">
                    <a-button @click="handleCancel">Bekor qilish</a-button>
                    <a-button type="primary" html-type="submit">Saqlash</a-button>
                </div>
            </a-form>
        </div>

        <!-- Правая часть: История изменений -->
        <div class="w-1/3 border-l  bg-gray-50 text-gray-400">
            <h3 class="font-semibold text-xl  p-4 pb-0">История</h3>
            <div class="border-b-2 w-full px-4 py-1">
                <div>
                    <div class="font-semibold  mr-3">Created by {{ tasksStore.current_task?.createdBy?.fullName }} ({{
                        tasksStore.current_task?.createdBy?.role }})</div>

                    on <span class="text-green">{{ new Date(tasksStore.current_task?.createdAt).toLocaleString('en-US',
                        {
                            year: 'numeric',
                            month: '2-digit',
                            day: '2-digit',
                            hour: '2-digit',
                            minute: '2-digit',
                            hour12: false
                        }) }}</span>
                </div>
            </div>
            <div v-for="(entry, index) in tasksStore.current_task?.history" :key="entry._id"
                class="border-b-2 w-full px-4 py-1">
                <div>
                    <span class="font-semibold  mr-3">{{ entry.by.fullName }} ({{ entry.by.role }})</span>
                    <span>{{ new Date(entry?.timestamp).toLocaleString('en-US', {
                        year: 'numeric',
                        month: '2-digit',
                        day: '2-digit',
                        hour: '2-digit',
                        minute: '2-digit',
                        hour12: false
                    }) }}</span>
                </div>
                <p class="text-sm text-gray-800 mb-0">{{ entry.action }}:
                    <span>{{ entry.statusChange?.fromStatus }} --> {{ entry.statusChange?.toStatus }} </span>
                </p>
            </div>
        </div>
    </div>

</template>

<script setup>
import { ref, reactive, computed, onMounted } from 'vue'
import useTasksStore from '@/store/tasks.pinia'
import { priorities } from '../constants'
import dayjs from 'dayjs'

const props = defineProps({
    element: Object,
    status: String,
    boardId: String
})

const tasksStore = useTasksStore()
const form = reactive({
    title: '',
    description: '',
    assignees: [],
    priority: null,
    dateRange: [],
    duration: null,
})

onMounted(async () => {
    await tasksStore.getOneTask(props.element)
    const task = tasksStore.current_task

    form.title = task?.title || ''
    form.description = task?.description || ''
    form.assignees = task?.assignedTo?.map(a => a._id) || []
    form.priority = task?.priority || null

    // Преобразуем строки дат в объекты Date
    if (task?.startDate) {
        form.dateRange[0] = new Date(task.startDate) // Преобразуем в объект Date
    }
    if (task?.dueDate) {
        form.dateRange[1] = new Date(task.dueDate) // Преобразуем в объект Date
    }
})

const userOptions = computed(() =>
    tasksStore.project_members.map(member => ({
        label: member.fullName,
        value: member._id
    }))
)

const handleSubmit = () => {
    const payload = {
        title: form.title,
        description: form.description?.trim() || undefined,
        estimatedHours: typeof form.duration === 'number' ? form.duration : undefined,
        priority: form.priority || undefined,
        assignedTo: [...form.assignees],
        startDate: form.dateRange?.[0]?.toISOString() || undefined,
        dueDate: form.dateRange?.[1]?.toISOString() || undefined,
        status: props.status,
        boardId: props.boardId
    }

    tasksStore.updateTask(tasksStore.current_task._id, payload, props.boardId)
}

</script>

<style scoped>
.ant-tag {
    user-select: none;
    transition: all 0.2s;
}
</style>