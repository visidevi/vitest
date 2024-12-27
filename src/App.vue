<script setup>
import { ref } from 'vue'
import NotificationToast from './components/NotificationToast.vue'
import PostCard from './components/PostCard.vue'

const message = ref('')
const status = ref('')
const clearNotification = () => {
  message.value = ''
  status.value = ''
}
</script>

<template>
  <NotificationToast status="success" :message @clear-notification="clearNotification" />
  <PostCard />
</template>

<style scoped>
header {
  line-height: 1.5;
}

.logo {
  display: block;
  margin: 0 auto 2rem;
}

@media (min-width: 1024px) {
  header {
    display: flex;
    place-items: center;
    padding-right: calc(var(--section-gap) / 2);
  }

  .logo {
    margin: 0 2rem 0 0;
  }

  header .wrapper {
    display: flex;
    place-items: flex-start;
    flex-wrap: wrap;
  }
}
</style>
