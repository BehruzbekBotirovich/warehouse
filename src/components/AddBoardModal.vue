<template>
    <div class="p-6 w-[400px]">
        <h1 class="font-semibold text-lg mb-4">{{ $t('board_page.add') }}</h1>

        <a-form :model="formState" name="board-form" autocomplete="off" @finish="onFinish"
            @finishFailed="onFinishFailed">
            <a-form-item :label="$t('board_page.name')" name="name" :rules="[requiredField]">
                <a-input v-model:value="formState.name" placeholder="Название доски" />
            </a-form-item>

            <a-form-item class="mt-2">
                <a-button type="primary" :loading="loading" html-type="submit">
                    {{ $t('common.add') }}
                </a-button>
            </a-form-item>
        </a-form>
    </div>
</template>

<script setup>
import { reactive, ref, defineProps, defineEmits } from 'vue'
import { useValidator } from '@/composables'
import { useI18n } from 'vue-i18n'
import useProjectsStore from '@/store/projects.pinia'
import useModal from '@/store/modal.pinia'

const { requiredField } = useValidator()
const { t } = useI18n()
const projectsStore = useProjectsStore()
const modal = useModal()

const loading = ref(false)
const emits = defineEmits(['success'])
const props = defineProps({
    projectId: {
        type: String,
        required: true
    }
})
console.log('projectId', props.projectId)
const formState = reactive({
    name: ''
})

const onFinish = async () => {
    loading.value = true
    try {

        await projectsStore.addBoardToProject(props.projectId, formState.name)
        emits('success')
        modal.close()
    } catch (error) {
        console.error(error)
    } finally {
        loading.value = false
    }
}

const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo)
}
</script>