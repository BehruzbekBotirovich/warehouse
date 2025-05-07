import { defineStore } from 'pinia'
import { api } from '@/utils/api/index.js'
import useCore from '@/store/core.pinia.js'

const useProjectsStore = defineStore('projects', {
  state: () => ({
    projects: [],
    employees: [],
    boards: [],
    project_members: [],
  }),

  actions: {
    //projects
    getProjects() {
      const core = useCore()
      // core.loadingMain = true
      api({
        url: '/projects',
        method: 'GET'
      })
        .then(({ data }) => {
          this.projects = data
        })
        .catch((error) => {
          core.switchStatus(error)
        })
        .finally(() => {
          // core.loadingMain = false
        })
    },

    addProject(project) {
      const core = useCore()
      console.log(project);
      // core.loadingMain = true
      api({
        url: '/projects',
        method: 'POST',
        data: project
      })
        .then(({ data }) => {
          this.getProjects()
        })
        .catch((error) => {
          core.switchStatus(error)
        })
        .finally(() => {
          // core.loadingMain = false
        })
    },

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
    
    //boards
    getBoardsForProject(projectId) {
      const core = useCore()
      // core.loadingMain = true
      api({
        url: `/projects/${projectId}/boards`,
        method: 'GET'
      })
        .then(({ data }) => {
          this.boards = data
        })
        .catch((error) => {
          core.switchStatus(error)
        })
        .finally(() => {
          // core.loadingMain = false
        })
    },

    addBoardToProject(projectId, boardName) {
      const core = useCore()
      // core.loadingMain = true
      api({
        url: `/projects/${projectId}/boards`,
        method: 'POST',
        data: {
          name: boardName
        }
      })
        .then(({ data }) => {
          this.getBoardsForProject(projectId)
                  })
        .catch((error) => {
          core.switchStatus(error)
        })
        .finally(() => {
          // core.loadingMain = false
        })
    },

    // globals
    getAllEmployees() {
      const core = useCore()
      // core.loadingMain = true
      api({
        url: '/users',
        method: 'GET'
      })
        .then(({ data }) => {
          this.employees = data
          console.log(data);
        })
        .catch((error) => {
          core.switchStatus(error)
        })
        .finally(() => {
          // core.loadingMain = false
        })
    },
  }
})

export default useProjectsStore