import { defineStore } from 'pinia'
import { api } from '@/utils/api/index.js'
import useCore from '@/store/core.pinia.js'
import useModal from './modal.pinia'

const useEmployeesStroe = defineStore('tasks', {
    state: () => ({
        employees: []
    }),

    actions: {
        getAllEmployees() {
            const core = useCore()
            api({
                url: `/users`,
                method: 'GET',
            })
                .then(({ data }) => {
                    this.employees = data
                })
                .catch((error) => {
                    core.switchStatus(error)
                })
        },

        addEmployee(employee) {
            const core = useCore()
            api({
                url: `/users`,
                method: 'POST',
                data: employee
            })
                .then(({ data }) => {
                    this.employees.push(data)
                    useModal().closeModal()
                })
                .catch((error) => {
                    core.switchStatus(error)
                })
        }

    }
})

export default useEmployeesStroe