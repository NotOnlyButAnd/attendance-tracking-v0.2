<template>
  <div class="profilePage w-75 mx-auto border p-3 rounded">
    <h1>Профиль</h1>
    <div class="profileRow">Логин: {{ username }}</div>
    <div v-if="username[0] === 's'">
      <div class="profileRow">
        ФИО:
        {{
          getStudentByID(username).user.last_name +
          " " +
          getStudentByID(username).user.first_name +
          " " +
          getStudentByID(username).middleName
        }}
      </div>
      <div class="profileRow">Курс: {{ getStudentByID(username).course }}</div>
      <div class="profileRow">Группа: {{ getStudentByID(username).group }}</div>
      <div v-if="getStudentByID(username).isFreeVisit" class="succ profileRow">
        Есть свободное посещение!
      </div>
      <div v-else class="err profileRow">НЕТ свободного посещения!</div>
    </div>
    <div class="profileRow" v-if="username[0] === 't'">
      <div>
        ФИО:
        {{
          getTeacherByID(username).user.last_name +
          " " +
          getTeacherByID(username).user.first_name +
          " " +
          getTeacherByID(username).middleName
        }}
      </div>
      <div class="profileRow">
        Кафедра: {{ getTeacherByID(username).department }}
      </div>
    </div>
    <!-- <div>{{ getStudentByID(username) }}</div>
    <div>{{ getTeacherByID(username) }}</div> -->
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "ProfilePage",
  computed: {
    ...mapGetters("students", ["students", "getStudentByID"]),
    ...mapGetters("teachers", ["teachers", "getTeacherByID"]),
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
.profileRow {
  margin-top: 15px;
}
</style>
