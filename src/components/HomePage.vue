<template>
  <div class="homePage">
    <div class="w-75 mx-auto">
      <h3>Мои учебные дисциплины:</h3>
      <div v-if="getUsername[0] === 's'">
        <b-list-group>
          <b-list-group-item
            variant="secondary"
            v-for="discipline in getStudentDisciplinesByID(getUsername)"
            :key="discipline.id"
            href="/reports"
          >
            {{ discipline.discipline.name }}
          </b-list-group-item>
        </b-list-group>
      </div>
      <div v-if="getUsername[0] === 't'">
        <b-list-group>
          <b-list-group-item
            variant="secondary"
            v-for="discipline in getTeacherDisciplinesByID(getUsername)"
            :key="discipline.id"
            href="/reports"
          >
            {{ discipline.discipline.name }}
          </b-list-group-item>
        </b-list-group>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";

export default {
  name: "HomePage",
  data() {
    return {
      tmpUsrName: localStorage.username || "",
    };
  },
  created() {
    this.fetchAllStudents();
    this.fetchAllTeachers();
    this.fetchAllStudentDisciplines();
    this.fetchAllTeacherDisciplines();
  },
  methods: {
    ...mapActions("students", ["fetchAllStudents"]),
    ...mapActions("teachers", ["fetchAllTeachers"]),
    ...mapActions("studentDisciplines", ["fetchAllStudentDisciplines"]),
    ...mapActions("teacherDisciplines", ["fetchAllTeacherDisciplines"]),
  },
  computed: {
    ...mapGetters("studentDisciplines", [
      "studentDisciplines",
      "getStudentDisciplinesByID",
    ]),
    ...mapGetters("teacherDisciplines", [
      "teacherDisciplines",
      "getTeacherDisciplinesByID",
    ]),
    getUsername() {
      console.log("HP:", this.$store.state.username || localStorage.username);
      // костыльно, но если есть возможность - разберись с computed
      return this.$store.state.username || localStorage.username;
    },
  },
  props: {
    username: String,
  },
};
</script>

<style scoped>
.homePage {
  margin-top: 10px;
}
.disciplineRow {
  margin-top: 15px;
}
</style>
