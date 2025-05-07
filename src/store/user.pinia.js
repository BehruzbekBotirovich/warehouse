import { defineStore } from 'pinia'
import { api } from '@/utils/api/index.js'
import useCore from '@/store/core.pinia.js'

const useUser = defineStore('User', {
  state: () => ({
    user: null,
    branches: {
      content: [],
      total: 15
    }
  }),
  actions: {
    getUserMe() {
      const core = useCore()
      core.loadingMain = true
      api({
        url: '/users/me'
      })
        .then(({ data }) => {
          this.user = data
          console.log(this.user)
        })
        .catch((error) => {
          core.switchStatus(error)
        })
        .finally(() => {
          core.loadingMain = false
        })
    },

    updateMe(data) {
      const core = useCore()
      // core.loadingMain = true
      api({
        url: `/users/${this.user._id}`,
        method: 'PATCH',
        data: data
      })
        .then(({ data }) => {
          this.user = data
          core.setToast({
            locale: 'user.update_success',
            type: 'success'
          })
        })
        .catch((error) => {
          core.switchStatus(error)
        })
        .finally(() => {
          // core.loadingMain = false
        })
    }
  }
})

export default useUser
