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
    <h1>Nuxt + Bcrypt + Cloudflare Workers</h1>
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
    <p>
      <a href="https://hub.nuxt.com">Deployed with NuxtHub</a>
      •
      <a href="https://github.com/atinux/nuxt-bcrypt-edge">Source code</a>
    </p>
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
a {
  color: #888;
  text-decoration: none;
}
a:hover {
  text-decoration: underline;
}
</style>
