import {ref} from 'vue'

export const loggedIn = ref(JSON.parse(localStorage.getItem('loggedIn')))
export const toggleLoggedIn = () => (loggedIn.value = !loggedIn.value)