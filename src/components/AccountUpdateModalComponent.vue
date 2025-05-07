<template>
    <div class="p-6 w-[400px]">
        <h1 class="font-semibold text-lg mb-2"> {{ $t('accounts_page.edit') }} </h1>
        <a-form :model="formState" name="basic" autocomplete="off" @finish="onFinish" @finishFailed="onFinishFailed">
            <a-form-item :label="$t('Account')" name="account" :rules="[
                requiredField,
                {pattern: /^\d{1,27}$/, message: $t('accounts_page.account_rule') }
            ]">
                <a-input v-model:value="formState.account" size="large" />
            </a-form-item>

            <a-form-item :label="$t('MFO')" name="mfo" :rules="[
                requiredField,
                { pattern: /^\d{5}$/, message: $t('accounts_page.mfo_rule') }
            ]">
                <a-input v-model:value="formState.mfo" size="large" />
            </a-form-item>

            <a-form-item class="mt-2">
                <a-button :loading="accountStore.loading" type="primary" html-type="submit"> {{
                    $t('transactions_page.approve') }} </a-button>
            </a-form-item>
        </a-form>
    </div>
</template>
<script setup>
import { reactive } from 'vue';
import { useValidator } from '@/composables/index.js'
//stores pinia
import useAccounts from '@/store/accounts.pinia';
import useModal from '@/store/modal.pinia';
const modal = useModal(); //for close modal after success


const emits = defineEmits(['success']); //for emit success event to parent
const { requiredField } = useValidator()

const props = defineProps({
    action: String,
    account: Object
})

const accountStore = useAccounts();

const formState = reactive({
    account: props.account.account,
    mfo: props.account.mfo,
});

const onFinish = values => {
    accountStore.updateAccount(props.account.id, formState, () => {
        emits('success');
        modal.close();
    });
};
const onFinishFailed = errorInfo => {
    console.log('Failed:', errorInfo);
};
</script>