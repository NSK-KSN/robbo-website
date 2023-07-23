<template>
    <div class="project-details-page">
      <form class="project-details" @submit.prevent="saveProject">
        <BaseInput class="project-form-item" placeholder="Название" v-model="project.title" type="text" id="title" required />
        <TextareaInput class="project-form-item" placeholder="Инструкция" id="instructions" v-model="project.instruction" />
        <TextareaInput class="project-form-item" placeholder="Заметки" id="notes" v-model="project.notes"/>
        <div class="project-form-item">    
          <span>Автор: </span>
          <router-link :to="`/profile/?showAdditionalContent=true`">{{ project.authorName }}</router-link>
        </div>
        <div class="project-form-item">
            <span>Создан: {{ project.createdDate ? project.createdDate.slice(0, -5).replace('T', ' ') : '' }}</span>
        </div>
        <div class="project-form-item">
            <span>Последнее изменение страницы проекта: {{ project.lastChangeDate ? project.lastChangeDate.slice(0, -5).replace('T', ' ') : '' || project.createdDate ? project.createdDate.slice(0, -5).replace('T', ' ') : ''}}</span>
        </div>
        <div class="project-form-item">
            <span>Последнее изменение проекта: {{ project.createdDate ? project.createdDate.slice(0, -5).replace('T', ' ') : '' }}</span>
        </div>
        <div class="project-form-item">
          <Toggle>Открыть доступ: </Toggle>
        </div>
        <div class="project-form-item">
          <Button type="submit">Сохранить</Button>
        </div>
        <div class="project-form-item">
          <Button type="button" @click="redirectToAppPage">Открыть в Robbo Scratch</Button>
        </div>
      </form>
    </div>
</template>
  
<script>
import Button from '@/components/Button.vue';
import BaseInput from '@/components/BaseInput.vue';
import TextareaInput from '@/components/TextareaInput.vue';
import Toggle from '@/components/Toggle.vue';

export default {
    name: 'ProjectDetails',
    data() {
      return {
        project: {},
      };
    },
    components: {Button, BaseInput, TextareaInput, Toggle},
    mounted() {
        const projectId = this.$route.params.id;
        const storedProjects = JSON.parse(localStorage.getItem('projects')) || [];
        this.project = storedProjects.find(project => String(project.id) === projectId);
        if (this.project === undefined) {
            console.error(`project with ID ${projectId} not found`);
        }
    },
    methods: {
        saveProject() {
            this.project.lastChangeDate = new Date().toISOString();
            const storedProjects = JSON.parse(localStorage.getItem('projects')) || [];
            const projectIndex = storedProjects.findIndex(project => project.id === this.project.id);
            if (projectIndex === -1) {
                console.error(`Project with ID ${this.project.id} not found in localStorage`);
                return;
            }
            storedProjects[projectIndex] = this.project;
            localStorage.setItem('projects', JSON.stringify(storedProjects));
        },
        redirectToAppPage() {
            const projectId = this.project.id;
            this.$router.push(`/scratch/#${projectId}`);
        },
    }
};
</script>

<style>

.project-details {
  width: 100%;
}

.project-form-item {
  width: 100%;
  margin-bottom: 24px;
}

textarea { 
  resize: vertical;
  height: 150px;
}
</style>