<template>
  <div class="profilePage w-25 mx-auto border p-3 rounded">
    <h1>Профиль</h1>
    <div>Логин: {{ username }}</div>
    <div v-if="username[0] === 's'">
      <div>
        ФИО:
        {{
          getStudentByID(username).user.last_name +
          " " +
          getStudentByID(username).user.first_name +
          " " +
          getStudentByID(username).middleName
        }}
      </div>
      <div>Курс: {{ getStudentByID(username).course }}</div>
      <div>Группа: {{ getStudentByID(username).group }}</div>
      <div v-if="getStudentByID(username).isFreeVisit" class="succ">
        Есть свободное посещение!
      </div>
      <div v-else class="err">НЕТ свободного посещения!</div>
    </div>
    <div v-if="username[0] === 't'">
      PROFILE OF TEACHER PAGE
      <!-- <div>
        ФИО:
        {{
          getStudentByID(username).user.last_name +
          " " +
          getStudentByID(username).user.first_name +
          " " +
          getStudentByID(username).middleName
        }}
      </div>
      <div>Кафедра: {{ getStudentByID(username).department }}</div> -->
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "ProfilePage",
  computed: {
    ...mapGetters("students", ["students", "getStudentByID"]),
    //...mapGetters("students", []),
    // students: function () {
    //   //console.log(this.$store.modules.students.getters.students);
    //   return this.$store.getters.students;
    // },
  },
  props: {
    username: String,
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
.err {
  color: red;
}
.succ {
  color: green;
}
</style>
