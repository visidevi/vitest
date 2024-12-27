<template>
  <div>
    <div v-if="post">
      <h2 data-testid="post-title">{{ post.title }}</h2>
      <p data-testid="post-body">{{ post.body }}</p>
    </div>
    <p class="isLoading" v-if="loading" data-testid="loader">Loading...</p>
    <p class="hasError" v-if="error" data-testid="error-message">Error: {{ error }}</p>
  </div>
</template>
<script setup>
import { ref, onMounted } from 'vue'
import axios from 'axios'

const post = ref(null)
const loading = ref(false)
const error = ref(null)
const fetchPost = async () => {
  loading.value = true
  try {
    const response = await axios.get('https://jsonplaceholder.typicode.com/posts/1')
    console.log(response.data)
    post.value = response.data
  } catch (e) {
    error.value = e
  } finally {
    loading.value = false
  }
}
onMounted(() => {
  fetchPost()
})
</script>
