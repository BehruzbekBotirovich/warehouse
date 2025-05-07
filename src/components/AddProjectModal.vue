<template>
    <div class="p-6 w-[500px]">
        <h1 class="font-semibold text-lg mb-4">{{ $t('projects_page.add') }}</h1>

        <a-form :model="formState" name="project-form" autocomplete="off" @finish="onFinish"
            @finishFailed="onFinishFailed">
            <a-form-item :label="$t('projects_page.name')" name="name" :rules="[requiredField]">
                <a-input v-model:value="formState.name" />
            </a-form-item>

            <a-form-item :label="$t('projects_page.description')" name="description">
                <a-textarea v-model:value="formState.description" rows="3" />
            </a-form-item>
            <h3>{{ $t('projects_page.choose_employee') }}</h3>
            <a-form-item name="members" :rules="[requiredField]">
                <a-select v-model:value="formState.members" mode="multiple" :options="employeeOptions"
                    :field-names="{ label: 'label', value: 'value' }" :tagRender="customTagRender"
                    :filter-option="filterOption" show-search>
                    <template #option="{ value }">
                        <div class="flex items-center gap-2">
                            <img :src="employeeOptions.find(e => e.value === value)?.avatar"
                                class="w-5 h-5 rounded-full" alt="avatar" />
                            <div class="flex flex-col">
                                <span class="font-medium text-sm">
                                    {{employeeOptions.find(e => e.value === value)?.label}}
                                </span>
                                <span class="text-gray-500 text-xs">
                                    {{employeeOptions.find(e => e.value === value)?.position}}
                                </span>
                            </div>
                        </div>
                    </template>
                </a-select>
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
import { reactive, ref, computed, defineEmits, h } from 'vue'
import { useI18n } from 'vue-i18n'
import { useValidator } from '@/composables/index.js'
import { api } from '@/utils/api/index.js'
import useProjectsStore from '@/store/projects.pinia'
import useModal from '@/store/modal.pinia'
import { Avatar } from 'ant-design-vue'

const { t } = useI18n()
const { requiredField } = useValidator()

const emits = defineEmits(['success'])
const loading = ref(false)
const modal = useModal()
const projectsStore = useProjectsStore()

const formState = reactive({
    name: '',
    description: '',
    members: []
})

const employeeOptions = computed(() =>
    projectsStore.employees.map(emp => {
        const avatarSrc = emp.avatarUrl
            ? `/uploads/${emp.avatarUrl}`
            : new URL('@/assets/images/def_ava.png', import.meta.url).href
        return {
            value: emp._id,
            label: emp.fullName,
            position: emp.position,
            avatar: avatarSrc
        }
    })
)

function customTagRender({ label, value, closable, onClose }) {
    const emp = employeeOptions.value.find(e => e.value === value)
    return h(
        'div',
        {
            class: 'flex items-center gap-2 px-2 py-1 bg-gray-100 rounded-md',
            style: 'margin-right: 4px;'
        },
        [
            h(Avatar, {
                size: 20,
                src: emp?.avatar,
                alt: emp?.label
            }),
            h('span', null, emp?.label),
            closable &&
            h(
                'span',
                {
                    class: 'ml-1 cursor-pointer text-gray-400',
                    onClick: (e) => {
                        e.preventDefault()
                        e.stopPropagation()
                        onClose()
                    }
                },
                '×'
            )
        ]
    )
}

const filterOption = (input, option) =>
    option.label.toLowerCase().includes(input.toLowerCase())

const onFinish = async () => {
    loading.value = true
    try {
        await api({
            url: '/projects',
            method: 'POST',
            data: {
                name: formState.name,
                description: formState.description,
                members: formState.members
            }
        })
        projectsStore.getProjects()
        emits('success')
        modal.close()
    } catch (err) {
        console.error(err)
    } finally {
        loading.value = false
    }
}

const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo)
}
</script>