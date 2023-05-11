<template>
  <div class="reportsPage">
    <!-- <h1>This is an REPORTS page "{{ username }}"</h1> -->
    <b-dropdown
      block
      variant="secondary"
      class="m-2 mx-auto"
      menu-class="w-100"
    >
      <template #button-content>
        <em>{{ currDisciplineName }}</em>
      </template>
      <template v-if="username[0] === 's'">
        <b-dropdown-item
          v-for="discipline in getStudentDisciplinesByID(username)"
          :key="discipline.id"
          @click="
            onDisciplineClick(
              discipline.discipline.name,
              discipline.discipline.id,
              $event
            )
          "
        >
          {{ discipline.discipline.name }}
        </b-dropdown-item>
      </template>
      <template v-if="username[0] === 't'">
        <b-dropdown-item
          v-for="discipline in getTeacherDisciplinesByID(username)"
          :key="discipline.id"
          @click="
            onDisciplineClick(
              discipline.discipline.name,
              discipline.discipline.id,
              $event
            )
          "
        >
          {{ discipline.discipline.name }}
        </b-dropdown-item>
      </template>
    </b-dropdown>
    <div class="m-2 mx-auto border p-3 rounded">Таблица</div>
    <!-- <div>
      {{ getStudentDisciplinesByID(username) }}
    </div> -->
  </div>
</template>

<script>
import { mapGetters, mapState } from "vuex";

export default {
  name: "ReportsPage",
  data() {
    return {
      currDisciplineName: localStorage.currDiscName || "Выберите дисциплину",
      currDisciplineID: localStorage.currDiscID || -1,
    };
  },
  computed: {
    ...mapGetters("visits", ["visits", "getVisitsByID"]),
    ...mapGetters("studentDisciplines", [
      "studentDisciplines",
      "getStudentDisciplinesByID",
    ]),
    ...mapGetters("teacherDisciplines", [
      "teacherDisciplines",
      "getTeacherDisciplinesByID",
    ]),
    ...mapState({}),
  },
  methods: {
    onDisciplineClick(disc_name, disc_id, e) {
      console.log("clicked on:", disc_name, "id:", disc_id, "\nEvent:", e);
      localStorage.setItem("currDiscName", disc_name);
      localStorage.setItem("currDiscID", disc_id);
      this.currDisciplineID = disc_id;
      this.currDisciplineName = disc_name;
    },
  },
  props: {
    username: String,
  },
};
</script>

<style scoped>
.reportsPage {
  margin-top: 10px;
}
</style>
