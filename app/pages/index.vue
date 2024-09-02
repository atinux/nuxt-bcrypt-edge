<script setup>
const password = ref('')
const hash = ref('')
async function hashPassword() {
  const res = await $fetch('/api/hash', {
    method: 'POST',
    body: {
      password: password.value,
    },
  })
  hash.value = res.hash
}

const passwordVerify = ref('')
const isValid = ref(false)
async function verifyPassword() {
  const res = await $fetch('/api/verify', {
    method: 'POST',
    body: {
      password: passwordVerify.value,
      hash: hash.value,
    },
  })
  isValid.value = res.isValid
}
</script>

<template>
  <div class="centered">
    <form @submit.prevent="hashPassword">
      <input v-model="password" type="password">
      <button type="submit">
        Hash password
      </button>
    </form>
    <form v-if="hash" @submit.prevent="verifyPassword">
      <p>{{ hash }}</p>
      <input v-model="passwordVerify" type="password">
      <button type="submit">
        Verify password
      </button>
      <p>Valid? {{ isValid }}</p>
    </form>
  </div>
</template>

<style scoped>
.centered {
  position: absolute;
  width: 100%;
  text-align: center;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  margin: 0;
  font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
}
h1 {
  font-size: 32px;
}
@media (min-width: 768px) {
  h1 {
    font-size: 64px;
  }
}
a {
  color: #888;
  text-decoration: none;
  font-size: 18px;
}
a:hover {
  text-decoration: underline;
}
</style>
