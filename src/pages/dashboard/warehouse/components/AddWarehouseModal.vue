<template>
  <a-modal
    :open="visible"
    title="Add New Warehouse"
    width="600px"
    :footer="null"
    @cancel="handleCancel"
  >
    <a-form
      :model="formState"
      :label-col="{ span: 8 }"
      :wrapper-col="{ span: 16 }"
      @finish="onFinish"
    >
      <!-- Warehouse Name -->
      <a-form-item
        label="Warehouse Name"
        name="warehouseName"
        :rules="[{ required: true, message: 'Please enter warehouse name' }]"
      >
        <a-input
          v-model:value="formState.warehouseName"
          placeholder="Enter Warehouse Name"
        />
      </a-form-item>

      <!-- Warehouse ID -->
      <a-form-item
        label="Warehouse ID"
        name="warehouseId"
        :rules="[{ required: true, message: 'Please enter warehouse ID' }]"
      >
        <a-input
          v-model:value="formState.warehouseId"
          placeholder="Ex: BEMA0123"
        />
      </a-form-item>

      <!-- Location -->
      <a-form-item
        label="Location"
        name="location"
        :rules="[{ required: true, message: 'Please enter location' }]"
      >
        <a-textarea
          v-model:value="formState.location"
          placeholder="Enter full address"
          :rows="3"
        />
      </a-form-item>

      <!-- Capacity -->
      <a-form-item
        label="Capacity (in SKUs)"
        name="capacity"
        :rules="[{ required: true, message: 'Please enter capacity' }]"
      >
        <a-input-number
          v-model:value="formState.capacity"
          placeholder="Enter capacity"
          :min="1"
          class="w-full"
        />
      </a-form-item>

      <!-- Submit Button -->
      <a-form-item :wrapper-col="{ offset: 8, span: 16 }">
        <a-button
          type="primary"
          html-type="submit"
          class="w-full"
        >
          Add Warehouse
        </a-button>
      </a-form-item>
    </a-form>
  </a-modal>
</template>

<script setup>
import { ref, reactive } from 'vue';
import { message } from 'ant-design-vue';

const visible = ref(false);

const formState = reactive({
  warehouseName: '',
  warehouseId: '',
  location: '',
  capacity: null
});

const showModal = () => {
  visible.value = true;
};

const handleCancel = () => {
  visible.value = false;
};

const onFinish = (values) => {
  console.log('Success:', values);
  message.success('Warehouse added successfully!');
  visible.value = false;
  // Here you would typically call an API to save the warehouse
};

defineExpose({
  showModal
});
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