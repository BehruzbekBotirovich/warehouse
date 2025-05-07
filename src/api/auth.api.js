import { api } from '@/utils/api/index.js'
import { reformatPhoneNumber } from '@/helpers/index.js'

export function authLoginWithEimzoApi(pkcs7) {
  return api({
    url: 'auth/login/e-imzo',
    method: 'POST',
    data: {
      pkcs7
    }
  })
}

export function authTokenApi(form) {
  return api({
    url: `/auth/token`,
    method: 'POST',
    data: form
  })
}

export function authRegisterApi(form) {
  const data = {
    ...form,
    username: reformatPhoneNumber(form.username),
  }
  return api({
    url: 'auth/sign-up/e-imzo', 
    method: 'POST',
    data
  })
}

export function getMobileQrScannedApi(documentId) {
  return api({
    url: '/auth/e-imzo/mobile/auth-doc',
    pk: documentId,
    open: true,
    hasOsession: false,
    method: 'GET'
  })
}

export function loginWithPasswordApi(form) {
  return api({
    url: 'auth/login',
    method: 'POST',
    data: {
      email: form.email,
      password: form.password
    }
  })
}