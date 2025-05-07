import { defineStore } from 'pinia'

const useModal = defineStore('modal', {
  state: () => ({
    modals: [],
    visibleModal: new Set([]),
    timeOut: null
  }),
  actions: {
    open({ component, props, emits }) {
      const modalKey = Date.now()
      const prps = props ? props : {}
      const emit = emits ? emits : {}
      this.modals.push({
        component: component,
        props: { modalKey, ...prps },
        emits: emit
      })
      this.visibleModal.add(modalKey)
    },
    close(key) {
      this.visibleModal.delete(key)
      this.timeOut = setTimeout(() => {
        const index = this.modals.findIndex(
          (item) => item.props.modalKey === key
        )
        if (index !== -1) {
          this.modals.splice(index, 1)
        }
        clearTimeout(this.timeOut)
      }, 400)
    }
  }
})

export default useModal
