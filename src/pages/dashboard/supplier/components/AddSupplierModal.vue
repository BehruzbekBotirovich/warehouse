<template>
  <a-modal
    v-model:visible="visible"
    title="Add New Supplier"
    width="800px"
    :footer="null"
    @cancel="handleCancel"
  >
    <a-form
      :model="formState"
      :label-col="{ span: 8 }"
      :wrapper-col="{ span: 16 }"
      @finish="onFinish"
    >
      <!-- Full Name and Contact Name Row -->
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        <a-form-item
          label="Full Name"
          name="fullName"
          :rules="[{ required: true, message: 'Please enter full name' }]"
        >
          <a-input
            v-model:value="formState.fullName"
            placeholder="Enter Full Name"
          />
        </a-form-item>

        <a-form-item label="Contact Name" name="contactName">
          <a-input
            v-model:value="formState.contactName"
            placeholder="Enter Contact Name"
          />
        </a-form-item>
      </div>

      <!-- Phone Number -->
      <a-form-item
        label="Phone number"
        name="phone"
        :rules="[{ required: true, message: 'Please enter phone number' }]"
      >
        <a-input
          v-model:value="formState.phone"
          placeholder="US ~ +1 955 000 0000"
          addon-before="+1"
        >
          <template #addonBefore>
            <span class="flex items-center">
              <span class="mr-2">US</span> +1
            </span>
          </template>
        </a-input>
      </a-form-item>

      <!-- Email -->
      <a-form-item
        label="Email-Id"
        name="email"
        :rules="[
          { required: true, message: 'Please enter email' },
          { type: 'email', message: 'Please enter a valid email' }
        ]"
      >
        <a-input
          v-model:value="formState.email"
          placeholder="Enter your Email-ID"
        />
      </a-form-item>

      <!-- State and Pincode Row -->
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        <a-form-item
          label="State"
          name="state"
          :rules="[{ required: true, message: 'Please select state' }]"
        >
          <a-select
            v-model:value="formState.state"
            placeholder="Select your state"
          >
            <a-select-option value="california">California</a-select-option>
            <a-select-option value="texas">Texas</a-select-option>
            <a-select-option value="new-york">New York</a-select-option>
            <a-select-option value="florida">Florida</a-select-option>
            <!-- Add more states as needed -->
          </a-select>
        </a-form-item>

        <a-form-item
          label="Pincode"
          name="pincode"
          :rules="[{ required: true, message: 'Please enter pincode' }]"
        >
          <a-input
            v-model:value="formState.pincode"
            placeholder="Enter Pincode"
          />
        </a-form-item>
      </div>

      <!-- Address -->
      <a-form-item
        label="Address"
        name="address"
        :rules="[{ required: true, message: 'Please enter address' }]"
      >
        <a-textarea
          v-model:value="formState.address"
          placeholder="Enter your Address"
          :rows="3"
        />
      </a-form-item>

      <!-- Submit Button -->
      <a-form-item :wrapper-col="{ offset: 8, span: 16 }">
        <a-button type="primary" html-type="submit" class="w-full md:w-auto">
          Add Supplier
        </a-button>
      </a-form-item>
    </a-form>
  </a-modal>
</template>

<script setup>
import { ref, reactive } from 'vue'
import { message } from 'ant-design-vue'

const visible = ref(false)

const formState = reactive({
  fullName: '',
  contactName: '',
  phone: '',
  email: '',
  state: undefined,
  pincode: '',
  address: ''
})

const showModal = () => {
  visible.value = true
}

const handleCancel = () => {
  visible.value = false
  // Reset form if needed
  // Object.assign(formState, {
  //   fullName: '',
  //   contactName: '',
  //   phone: '',
  //   email: '',
  //   state: undefined,
  //   pincode: '',
  //   address: ''
  // });
}

const onFinish = (values) => {
  console.log('Success:', values)
  message.success('Supplier added successfully!')
  visible.value = false
  // Here you would typically call an API to save the supplier
}

// Expose the showModal function to parent component if needed
defineExpose({
  showModal
})
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