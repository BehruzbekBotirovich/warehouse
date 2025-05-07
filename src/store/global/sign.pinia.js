import { defineStore } from 'pinia'
import useModal from '@/store/global/modal.pinia.js'
import { shallowRef } from 'vue'
// import SignWithEimzoModalComponent from '@/components/sign/SignWithEimzoModalComponent.vue'
import useCore from '@/store/core.pinia.js'
import { api } from '@/utils/api/index.js'

function signWithEimzo(url, pkcs7, callback) {
  const core = useCore()
  core.loadingUrl.add('signing')
  const apiUrl = url?.split(' ')[1] ? url?.split(' ')[1] : url?.split(' ')[0]
  const method = url?.split(' ')[1] ? url?.split(' ')[0] : 'POST'
  api({
    url: apiUrl,
    data: {
      pkcs7
    },
    method
  })
    .then(({ data }) => {
      callback(data)
    })
    .catch((error) => {
      core.switchStatus(error)
    })
    .finally(() => {
      core.loadingUrl.delete('signing')
    })
}

function signWithQrCode(url, obj, callback) {
  const core = useCore()
  core.loadingUrl.add('signing')
  const apiUrl = url?.split(' ')[1] ? url?.split(' ')[1] : url?.split(' ')[0]
  const method = url?.split(' ')[1] ? url?.split(' ')[0] : 'POST'
  api({
    url: apiUrl,
    data: obj,
    method
  })
    .then(({ data }) => {
      callback(data)
    })
    .catch((error) => {
      core.switchStatus(error)
    })
    .finally(() => {
      core.loadingUrl.delete('signing')
    })
}

function sendOtpToApprove(url, callback) {
  const core = useCore()
  core.loadingUrl.add('signing')
  core.loadingUrl.add('approve')
  const apiUrl = url?.split(' ')[1] ? url?.split(' ')[1] : url?.split(' ')[0]
  const method = url?.split(' ')[1] ? url?.split(' ')[0] : 'POST'
  api({
    url: apiUrl,
    method
  })
    .then(({ data }) => {
      callback(data)
    })
    .catch((error) => {
      core.switchStatus(error)
    })
    .finally(() => {
      core.loadingUrl.delete('signing')
      core.loadingUrl.delete('approve')
    })
}

function approveWithOtp(url, obj, successCallback, errorCallback) {
  const core = useCore()
  core.loadingUrl.add('signing')
  const apiUrl = url?.split(' ')[1] ? url?.split(' ')[1] : url?.split(' ')[0]
  const method = url?.split(' ')[1] ? url?.split(' ')[0] : 'POST'
  api({
    url: apiUrl,
    data: obj,
    method
  })
    .then(({ data }) => {
      successCallback(data)
    })
    .catch((error) => {
      if (errorCallback) {
        errorCallback(error)
      }
      core.switchStatus(error)
    })
    .finally(() => {
      core.loadingUrl.delete('signing')
    })
}

function resendOtp(otpKey, callback) {
  const core = useCore()
  core.loadingUrl.add('resent-otp')
  api({
    url: '/user/resend-otp',
    method: 'POST',
    data: {
      otpKey
    }
  })
    .then(({ data }) => {
      callback(data)
    })
    .catch((error) => {
      core.switchStatus(error)
    })
    .finally(() => {
      core.loadingUrl.delete('resent-otp')
    })
}

const useSign = defineStore('Sign', {
  state: () => ({
    documentObj: {},
    otpData: {},
    otpStatus: null,
    finished: false
  }),
  actions: {
    sign({
      title = null,
      document = {},
      eimzoUrl = null,
      qrCodeUrl = null,
      hasNotification = false,
      successCallback = null
    }) {
      const modal = useModal()
      const core = useCore()
      this.documentObj = document
      modal.open({
        component: shallowRef(SignWithEimzoModalComponent),
        props: {
          title: title,
          documentHash: this.documentObj
        },
        emits: {
          sign: (data) => {
            if (data?.pkcs7) {
              if (!eimzoUrl) {
                successCallback?.(data)
              } else {
                signWithEimzo(eimzoUrl, data.pkcs7, () => {
                  successCallback?.()

                  if (!hasNotification) {
                    core.setToast({
                      locale: 'notification_component.the_document_was_successfully_signed',
                      type: 'success'
                    })
                  }

                  modal.close(data.modalKey)
                })
              }
            } else if (data?.documentId) {
              if (!qrCodeUrl) {
                successCallback?.(data)
              } else {
                signWithQrCode(
                  qrCodeUrl,
                  {
                    documentId: data?.documentId,
                    ...this.documentObj
                  },
                  () => {
                    successCallback?.()

                    if (!hasNotification) {
                      core.setToast({
                        locale: 'notification_component.the_document_was_successfully_signed',
                        type: 'success'
                      })
                    }
                    modal.close(data.modalKey)
                  }
                )
              }
            }
          }
        }
      })
    },
    approve({
      title = null,
      sendOtpUrl = null,
      approveOtpUrl = null,
      document = {},
      hasNotification = false,
      callback = null
    }) {
      const modal = useModal()
      const core = useCore()
      this.documentObj = document
      sendOtpToApprove(sendOtpUrl, (data) => {
        this.otpData = data
        modal.open({
          props: {
            title
          },
          emits: {
            send: (valueObj) => {
              approveWithOtp(
                approveOtpUrl,
                {
                  otpKey: this.otpData?.otpKey,
                  otpValue: valueObj?.otp,
                  ...this.documentObj
                },
                (data) => {
                  if (!hasNotification) {
                    core.setToast({
                      locale: 'notification_component.the_document_has_been_successfully_verified',
                      type: 'success'
                    })
                  }
                  if (callback) {
                    callback(data)
                    modal.close(valueObj?.modalKey)
                  }
                },
                (error) => {
                  this.otpStatus = 'error'
                }
              )
            },
            resent: () => {
              resendOtp(this.otpData?.otpKey, (otpData) => {
                this.otpData = otpData
              })
            }
          }
        })
      })
    }
  }
})

export default useSign
