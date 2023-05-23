<template>
  <div class="GenerateQRPage" v-if="username[0] === 't'">
    Привет, {{ username }}! Это страница для создания QR кода
  </div>
</template>

<script>
export default {
  name: "GenerateQR",
  props: {
    username: String,
  },
};
</script>

<style scoped>
.GenerateQRPage {
  margin-top: 10px;
}
</style>
