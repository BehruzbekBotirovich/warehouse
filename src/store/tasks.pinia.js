import { defineStore } from 'pinia'
import { api } from '@/utils/api/index.js'
import useCore from '@/store/core.pinia.js'
import useModal from './modal.pinia'

const useTasksStore = defineStore('tasks', {
    state: () => ({
        board_tasks: [],
        project_members: [],
        current_task: null,
        loading: true,
        my_tasks: [],
    }),

    actions: {
        //tasks for current board
        getBoardTasks(boardId, params = {}) {
            const core = useCore()
            api({
                url: `/boards/${boardId}`,
                method: 'GET',
                params: {
                    ...params
                }
            })
                .then(({ data }) => {
                    this.board_tasks = data
                })
                .catch((error) => {
                    core.switchStatus(error)
                })
                .finally(() => {
                    // core.loadingMain = false
                })
        },


        changeTaskStatus(taskId, status, boardId) {
            const core = useCore()
            api({
                url: `/tasks/${taskId}/status`,
                method: 'PATCH',
                data: {
                    status: status
                }
            })
                .then(({ data }) => {
                    this.getBoardTasks(boardId)
                    core.setToast({
                        locale: 'task.change_success',
                        type: 'success'
                    })
                    const message = data.message; // Сообщение для отправки в Telegram
                })
                .catch((error) => {
                    core.switchStatus(error)
                })
        },

        getOneTask(taskId) {
            this.loading = true
            const core = useCore()
            // core.loadingMain = true
            api({
                url: `/tasks/${taskId}`,
                method: 'GET'
            })
                .then(({ data }) => {
                    this.current_task = data
                })
                .catch((error) => {
                    core.switchStatus(error)
                })
                .finally(() => {
                    this.loading = false
                    // core.loadingMain = false
                })
        },

        updateTask(taskId, payload, boardId) {
            const core = useCore()
            const modal = useModal()

            api({
                url: `/tasks/${taskId}`,
                method: 'PATCH',
                data: payload
            })
                .then(() => {
                    this.getBoardTasks(boardId)
                    modal.close()
                    core.setToast({
                        locale: 'task.update_success',
                        type: 'success'
                    })
                })
                .catch((error) => {
                    core.switchStatus(error)
                })
        },


        addNewTask(task, boardId) {
            const modal = useModal()
            const core = useCore()

            const filteredFormData = new FormData()

            for (const [key, value] of task.entries()) {
                // Проверка для обычных значений
                const isEmptyString = typeof value === 'string' && value.trim() === ''
                const isEmptyArray = Array.isArray(value) && value.length === 0

                // Не добавляем пустые строки, null, undefined, пустые массивы
                if (value !== null && value !== undefined && !isEmptyString && !isEmptyArray) {
                    // Дополнительно: фильтруем priority, если он не из списка допустимых
                    if (key === 'priority') {
                        const allowed = ['muhim', 'shoshilinch', 'yuqori', 'normal', 'past']
                        if (allowed.includes(value)) {
                            filteredFormData.append(key, value)
                        }
                    } else {
                        filteredFormData.append(key, value)
                    }
                }
            }
            console.log(...filteredFormData);

            api({
                url: `/boards/${boardId}/tasks`,
                method: 'POST',
                data: filteredFormData
            })
                .then(({ data }) => {
                    this.getBoardTasks(boardId)
                    core.setToast({
                        locale: 'task.add_success',
                        type: 'success'
                    })
                    modal.close()
                })
                .catch((error) => {
                    core.switchStatus(error)
                })
        },

        // get all employees
        getMembersOfProject(projectId) {
            const core = useCore()
            // core.loadingMain = true
            api({
                url: `/projects/${projectId}/members`,
                method: 'GET'
            })
                .then(({ data }) => {
                    this.project_members = data
                })
                .catch((error) => {
                    core.switchStatus(error)
                })
                .finally(() => {
                    // core.loadingMain = false
                })
        },

        // delete task --> just archive it 
        deleteTask(taskId, boardId) {
            const core = useCore()
            api({
                url: `/tasks/${taskId}`,
                method: 'DELETE'
            })
                .then(() => {
                    this.getBoardTasks(boardId)
                    core.setToast({
                        locale: 'task.delete_success',
                        type: 'success'
                    })
                })
                .catch((error) => {
                    core.switchStatus(error)
                })
        },

        getMyTasks() {
            const core = useCore()
            // core.loadingMain = true
            api({
                url: `/users/me/tasks`,
                method: 'GET'
            })
                .then(({ data }) => {
                    this.my_tasks = data
                    core.setToast({
                        locale: 'task.get_success',
                        type: 'success'
                    })
                })
                .catch((error) => {
                    core.switchStatus(error)
                })
                .finally(() => {
                    // core.loadingMain = false
                })
        },

        async sendTelegramMessage(message) {
            this.error = null;

            const botToken = '7812173829:AAGsGjYvtjXNWGyi7JrXHFcJ9AN02OXFtSk';
            const chatId = '5331352357'; // Укажите ваш chatId

            const url = `https://api.telegram.org/bot${botToken}/sendMessage`;

            try {
                const response = await fetch(url, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        chat_id: chatId,
                        text: message,
                    }),
                });

                const data = await response.json();

                if (data.ok) {
                    console.log('Сообщение отправлено:', data.result.message_id);
                } else {
                    throw new Error('Ошибка отправки сообщения');
                }
            } catch (error) {
                this.error = error.message;
                console.error('Ошибка отправки сообщения:', error);
            } finally {
                this.isLoading = false;
            }
        }
    }
})

export default useTasksStore