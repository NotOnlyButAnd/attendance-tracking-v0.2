<template>
  <div class="profilePage">
    <h1>This is an PROFILE page</h1>
    <div class="oneStudent" v-for="(student, key) in students" :key="key">
      <!-- {{ student }} -->
      {{
        student.user.last_name +
        " " +
        student.user.first_name +
        " " +
        student.middleName
      }}
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "ProfilePage",
  computed: {
    ...mapGetters("students", ["students"]),
    // students: function () {
    //   //console.log(this.$store.modules.students.getters.students);
    //   return this.$store.getters.students;
    // },
  },
};
</script>

<style scoped>
.profilePage {
  margin-top: 10px;
}
.oneStudent {
  margin-top: 10px;
}
</style>
