<template>
        <div v-if="page !== 'profile'">
            <Button @click="createProject">Создать</Button>
        </div>
        <div class="notification-container">
            <TransitionGroup name="list" tag="ul">
      <ToastNotification type="success" v-for="(notification, index) in notifications" :key="index" @close="removeNotification(index)">
        {{ notification.message }}
      </ToastNotification>
    </TransitionGroup>
    </div>
    <div v-if="showConfirmModal">
        <ConfirmModal @confirmationClick="deleteProject(project); showNotification()" @closeConfirmModal="toggleConfirmModal"></ConfirmModal>
    </div>
        <div class="project-table">
        <ul>
            <li class="project-item" v-for="project in displayedProjects" :key="project.id">
                <router-link class="project-link" :to="{ name: 'project', params: { id: project.id } }">{{ project.title }}</router-link>
                <div class="delete-icon" v-if="page !== 'profile'" @click="toggleConfirmModalAppear(project)">
                    <i class="fas fa-solid fa-xmark" />
                </div>
            </li>
        </ul>
        <div class="pagination">
            <SecondButton @click="prevPage" :disabled="currentPage === 1"><i class="fa-solid fa-chevron-up fa-rotate-270" /></SecondButton>
            <SecondButton v-for="page in totalPages" :key="page" @click="goToPage(page)" :focus="currentPage === page">{{ page }}</SecondButton>
            <SecondButton @click="nextPage" :disabled="currentPage === totalPages"><i class="fa-solid fa-chevron-up fa-rotate-90" /></SecondButton>
            <div v-if="totalProjects > 50 && page !== 'profile'">
                <label for="pageSize">Projects per page: </label>
                <select id="pageSize" v-model="pageSize" @change="changePageSize" :searchable="true">
                    <option v-for="size in pageSizes" :key="size" :value="size">{{ size }}</option>
                </select>
                <vue-select v-model="pageSize" :options="pageSizes" label="name" />
            </div>
        </div>
        </div>
</template>

<script>
import Button from '@/components/Button.vue';
import ToastNotification from '@/components/Toast/ToastNotification.vue'
import ConfirmModal from '@/components/ConfirmModal.vue'
import SecondButton from '@/components/SecondButton.vue';

export default {
    components: { Button, ToastNotification, ConfirmModal, SecondButton },
    props: {
    page: String
    },
    data() {
        return {
            projects: [],
            user: {name: "", email: "", password: ""},
            pageSize: 10,
            currentPage: 1,
            pageSizes: [10, 20, 50, 100],
            notifications: [],
            showConfirmModal: false,
        }
    },
    mounted() {
        this.user = JSON.parse(localStorage.getItem('user'));
        this.id = Number(localStorage.getItem('projectId')) || 0;
        const storedProjects = JSON.parse(localStorage.getItem('projects')) || [];
        this.projects = storedProjects;
    },
    computed: {
        totalProjects() {
            if (!this.projects) return 0;
            return this.projects.length;
        },
        totalPages() {
            if (!this.projects) return 0;
                const total = this.projects.length;
            if (total < 50) {
                this.pageSize = 10;
            }
            return Math.ceil(total / this.pageSize);
        },
        displayedProjects() {
            if (!this.projects) return [];
            const start = (this.currentPage - 1) * this.pageSize;
            const end = start + this.pageSize;
            return this.projects.slice(start, end);
    }
  },
    methods: {
        createProject() {
            const projectData = {
                title: "Untitled",
                id: this.id,
                notes: "",
                instruction: "",
                author: this.user.email,
                authorName: this.user.name,
                createdDate: new Date().toISOString(),
                lastChangeDate: "",
                lastProjectChangeDateL: ""
            }
            this.id++;
            localStorage.setItem('projectId', this.id.toString());

            const storedProjects = JSON.parse(localStorage.getItem('projects')) || [];
            storedProjects.push(projectData);
            localStorage.setItem('projects', JSON.stringify(storedProjects));
            this.projects = storedProjects;
        },
        deleteProject(project) {
            const storedProjects = JSON.parse(localStorage.getItem('projects')) || [];
            const updatedProjects = storedProjects.filter(p => p.id !== project.id);
            localStorage.setItem('projects', JSON.stringify(updatedProjects));
            this.projects = updatedProjects;
            this.showConfirmModal = !this.showConfirmModal;
        },
        prevPage() {
            this.currentPage--;
        },
        nextPage() {
            this.currentPage++;
        },
        goToPage(page) {
            this.currentPage = page;
        },
        changePageSize(event) {
            this.pageSize = parseInt(event.target.value);
            this.currentPage = 1;
        },
        watch: {
            projects() {
                this.currentPage = 1;
            }
        },
        showNotification() {
        this.notifications.push({ message: 'Страница проекта удалена.' })
    },
    removeNotification(index) {
      this.notifications.splice(index, 1)
    },
    toggleConfirmModalAppear(project) {
          this.showConfirmModal = !this.showConfirmModal;
          this.project = project;
        },
        toggleConfirmModal() {
          this.showConfirmModal = !this.showConfirmModal;
        }
    }
}
</script>

<style>

.project-table {
    border: 1px solid #bfbfbf;
    border-radius: 22px;
    padding: 8px;
}

.project-item {
    width:100%;
    text-decoration: none;
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 8px;
}
.project-link {
    padding:20px;
    width:100%;
    border-bottom: 1px solid #bfbfbf;
    font-size: 20px;
}
.project-link:hover {
    color: lightblue;
    border-bottom: 1px solid var(--sidebar-item-active);
    transition: 0.3s ease;
}
.delete-icon {
    cursor: pointer;
    border-bottom: 1px solid #bfbfbf;
    padding:20px;
    font-size: 20px;
}
.delete-icon:hover {
    color: red;
    border-bottom: 1px solid red;
    transition: 0.3s ease;
}

select {
    background: var(--sidebar-bg-color);
    color: var(--sidebar-item);
    min-height: 32px;
    padding: 1px 15px;
    border-radius: 12px;
    border: 1px solid var(--sidebar-item-active);
    cursor: pointer;
    outline: none;
    font-weight: 500;
    box-shadow: 0px 6px 0px -4px rgba(150, 150, 150, 0.3);
    margin-bottom: 8px;
}
</style>