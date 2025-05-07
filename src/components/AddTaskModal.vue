<template>
    <div class="flex h-full w-[900px]">
        <!-- Левая часть: форма -->
        <div class="w-2/3 p-6 bg-white rounded-lg shadow-md border overflow-y-auto">
            <h2 class="text-xl font-semibold mb-6">Vazifa qo'shish</h2>

            <a-form layout="vertical" @submit.prevent="handleSubmit">
                <a-form-item label="* Sarlavha kiriting">
                    <a-input v-model:value="form.title" required />
                </a-form-item>

                <a-form-item label="Vazifa izohini kiriting">
                    <a-textarea v-model:value="form.description" rows="5" />
                </a-form-item>

                <a-form-item label="Biriktirilgan xodimlar" class="pt-6">
                    <a-select v-model:value="form.assignees" mode="multiple" placeholder="Tayinlash"
                        :options="userOptions" show-search allow-clear />
                </a-form-item>

                <a-form-item label="Muhimlik darajasi">
                    <div class="flex flex-wrap gap-2 pt-6">
                        <a-tag v-for="priority in priorities" :key="priority.value"
                            :color="form.priority === priority.value ? priority.color : 'default'"
                            @click="form.priority = priority.value"
                            class="cursor-pointer px-4 py-1 border rounded-full hover:opacity-80" :class="{
                                'bg-red-100 text-red-600 border-red-300': priority.value === 'muhim' && form.priority === 'muhim',
                                'bg-orange-100 text-orange-600 border-orange-300': priority.value === 'shoshilinch' && form.priority === 'shoshilinch',
                                'bg-yellow-100 text-yellow-600 border-yellow-300': priority.value === 'yuqori' && form.priority === 'yuqori',
                                'bg-blue-100 text-blue-600 border-blue-300': priority.value === 'normal' && form.priority === 'normal',
                                'bg-gray-100 text-gray-600 border-gray-300': priority.value === 'past' && form.priority === 'past'
                            }">
                            {{ priority.label }}
                        </a-tag>
                    </div>
                </a-form-item>

                <div class="flex gap-2 items-center">
                    <a-form-item label="Vaqt oraligi" class="pt-9 w-3/4">
                        <a-range-picker v-model:value="form.dateRange" show-time format="YYYY-MM-DD HH:mm"
                            class="w-full" />
                    </a-form-item>

                    <a-form-item label="Vazifa davomiyligi ish soatida" class="pt-9 w-1/4">
                        <a-input-number v-model:value="form.duration" :min="1" :max="100" class="w-full" />
                    </a-form-item>
                </div>

                <!-- <a-form-item label="Rasm yuklash">
                    <input type="file" accept="image/*" @change="handleFileUpload" />
                </a-form-item> -->
                <!-- 
                <div v-if="imagePreview" class="mt-2">
                    <img :src="imagePreview" alt="Task Preview" class="w-32 h-32 object-cover rounded-md" />
                </div> -->

                <div class="flex justify-end gap-2 mt-4">
                    <a-button @click="handleCancel">Bekor qilish</a-button>
                    <a-button type="primary" html-type="submit">Saqlash</a-button>
                </div>
            </a-form>
        </div>

        <!-- Правая часть -->
        <div class="w-1/3 border-l p-4 flex flex-col justify-center items-center bg-gray-50 text-gray-400">
            <p>Ma'lumot yo'q</p>
        </div>
    </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import useTasksStore from '@/store/tasks.pinia'
import { priorities } from '@/constants'

const props = defineProps({
    status: {
        type: String,
        default: 'Created'
    },
    boardId: {
        type: String,
        required: true
    }
})
console.log('props', props.status)
const tasksStore = useTasksStore()

const form = ref({
    title: '',
    description: '',
    assignees: [],
    priority: null,
    dateRange: [],
    duration: null,
    // taskImg: null
})

const imagePreview = ref(null)

const handleFileUpload = (e) => {
    const file = e.target.files[0]
    if (file) {
        form.value.taskImg = file
        imagePreview.value = URL.createObjectURL(file)
    }
}

const userOptions = computed(() => {
    return tasksStore.project_members.map(member => ({
        label: member.fullName,
        value: member._id
    }))
})

const handleSubmit = () => {
    const payload = new FormData()

    payload.append('title', form.value.title)

    if (form.value.description?.trim()) {
        payload.append('description', form.value.description)
    }

    if (typeof form.value.duration === 'number' && !isNaN(form.value.duration)) {
        payload.append('estimatedHours', form.value.duration)
    }

    if (form.value.priority) {
        const allowed = ['muhim', 'shoshilinch', 'yuqori', 'normal', 'past']
        if (allowed.includes(form.value.priority)) {
            payload.append('priority', form.value.priority)
        }
    }

    payload.append('status', props.status)

    if (form.value.dateRange && form.value.dateRange.length === 2) {
        payload.append('startDate', form.value.dateRange[0].toISOString())
        payload.append('dueDate', form.value.dateRange[1].toISOString())
    }


    if (Array.isArray(form.value.assignees) && form.value.assignees.length > 0) {
        form.value.assignees.forEach(id => {
            payload.append('assignedTo', id)
        })
    }

    // if (form.value.taskImg) {
    //     payload.append('taskImg', form.value.taskImg)
    // }

    tasksStore.addNewTask(payload, props.boardId)
}


const handleCancel = () => {
    // Закрытие через emit, если требуется
}
</script>

<style scoped>
.ant-tag {
    user-select: none;
    transition: all 0.2s;
}
</style>