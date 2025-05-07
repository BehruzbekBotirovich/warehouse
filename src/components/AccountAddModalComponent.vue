<template>
    <div class="p-6 w-[400px]">
        <h1 class="font-semibold text-lg mb-2"> {{ $t('accounts_page.add') }} </h1>
        <a-form :model="formState" name="basic" autocomplete="off" @finish="onFinish" @finishFailed="onFinishFailed">
            <a-form-item :label="$t('Account')" name="account" :rules="[
                requiredField,
                { pattern: /^\d{1,27}$/, message: $t('accounts_page.account_rule') }
            ]">
                <a-input v-model:value="formState.account" />
            </a-form-item>


            <a-form-item :label="$t('MFO')" name="mfo" :rules="[
                requiredField,
                { pattern: /^\d{5}$/, message: t('accounts_page.mfo_rule') }
            ]">
                <a-input v-model:value="formState.mfo" />
            </a-form-item>

            <a-form-item class="mt-2">
                <a-button type="primary" :loading="accountStore.loading" html-type="submit">Qo'shish</a-button>
            </a-form-item>
        </a-form>

    </div>
</template>
<script setup>
import { reactive, defineEmits } from 'vue';
import { useValidator } from '@/composables/index.js'
import { useI18n } from 'vue-i18n'
//stores pinia
import useAccounts from '@/store/accounts.pinia';
import useModal from '@/store/modal.pinia';
const accountStore = useAccounts();
const modal = useModal(); //for close modal after success

const { t } = useI18n();
const { requiredField } = useValidator();

const emits = defineEmits(['success']); //for emit success event to parent

const formState = reactive({
    account: '',
    mfo: '',
});

const onFinish = () => {
    accountStore.createAccount(formState, () => {
        emits('success'); // Сообщаем родителю о завершении
        modal.close(); // Закрываем модалку
    });
};
const onFinishFailed = errorInfo => {
    console.log('Failed:', errorInfo);
};
</script>