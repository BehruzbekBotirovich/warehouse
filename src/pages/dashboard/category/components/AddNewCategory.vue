<template>
  <a-modal
    :open="open"
    title="Add New Category"
    width="600px"
    :footer="null"
    @cancel="handleCancel"
  >
    <a-form
      :model="formState"
      :label-col="{ span: 6 }"
      :wrapper-col="{ span: 18 }"
      @finish="onFinish"
    >
      <!-- Category Name -->
      <a-form-item
        label="Category Name"
        name="categoryName"
        :rules="[{ required: true, message: 'Please enter category name' }]"
      >
        <a-input
          v-model:value="formState.categoryName"
          placeholder="Enter Category Name"
        />
      </a-form-item>

      <!-- Category ID -->
      <a-form-item
        label="Category ID"
        name="categoryId"
        :rules="[{ required: true, message: 'Please enter category ID' }]"
      >
        <a-input
          v-model:value="formState.categoryId"
          placeholder="Ex: CAR0056RTY"
        />
      </a-form-item>

      <!-- Description -->
      <a-form-item label="Description" name="description">
        <a-textarea
          v-model:value="formState.description"
          placeholder="Enter description (optional)"
          :rows="4"
        />
      </a-form-item>

      <!-- Submit Button -->
      <a-form-item :wrapper-col="{ offset: 6, span: 18 }">
        <a-button type="primary" html-type="submit" class="w-full">
          Add New Category
        </a-button>
      </a-form-item>
    </a-form>
  </a-modal>
</template>

<script setup>
import { reactive, defineProps, defineEmits } from 'vue'
import { message } from 'ant-design-vue'

const props = defineProps({
  open: Boolean,
  modalKey: Number
})

const emits = defineEmits(['close'])

const formState = reactive({
  categoryName: '',
  categoryId: '',
  description: ''
})

const handleCancel = () => {
  emits('close', props.modalKey)
}

const onFinish = (values) => {
  console.log('Success:', values)
  message.success('Category added successfully!')
  emits('close', props.modalKey)
  // Here you would typically call an API to save the category
}
</script>

<style scoped>
/* Custom styles if needed */
:deep(.ant-modal-title) {
  @apply text-lg font-semibold text-gray-800;
}

:deep(.ant-form-item-label > label) {
  @apply font-medium text-gray-700;
}
</style>