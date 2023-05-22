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
            @click="
              onDiscClick(discipline.discipline.name, discipline.discipline.id)
            "
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
            @click="
              onDiscClick(discipline.discipline.name, discipline.discipline.id)
            "
          >
            {{ discipline.discipline.name }}
          </b-list-group-item>
        </b-list-group>
      </div>
    </div>
    <div v-if="getUsername[0] === 't'" class="w-75 mx-auto homeBlock">
      <h3>Мои учебные группы:</h3>
      <!-- <h5>{{ getTeacherCourses }}</h5> -->
      <div>
        <b-button-group v-for="crs in getTeacherCourses" :key="crs.course">
          <div class="courseGroup w-100 mx-auto border p-3 rounded">
            {{ crs.course }} курс
            <b-button class="courseGroup" v-for="grp in crs.groups" :key="grp">
              {{ grp }}
            </b-button>
          </div>
        </b-button-group>
      </div>
    </div>
    <div v-if="getUsername[0] === 't'" class="w-75 mx-auto homeBlock">
      <b-button>Сгенерировать QR код для пары</b-button>
    </div>
    <!-- <div>{{ getStudentDisciplinesByID(getUsername) }}</div> -->
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
    onDiscClick(d_name, d_id) {
      localStorage.setItem("currDiscName", d_name);
      localStorage.setItem("currDiscID", d_id);
    },
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
    getTeacherGroupsByID() {
      return ["46", "47", "4ПМ", "36", "3ИТ", "39", "27", "26", "17", "19"];
    },
    getTeacherCourses() {
      // по учебным группам из getTeacherGroupsByID получает все имеющиеся курсы
      let crs = [];
      let tmpGr = this.getTeacherGroupsByID;
      //console.log(tmpGr);
      for (let i = 0; i < tmpGr.length; i++) {
        if (!crs.some((el) => el.course == tmpGr[i][0])) {
          let grps = [];
          for (let j = 0; j < tmpGr.length; j++) {
            if (tmpGr[j][0] == tmpGr[i][0]) {
              grps.push(tmpGr[j]);
            }
          }
          let tObj = {};
          tObj["course"] = tmpGr[i][0];
          tObj["groups"] = grps;
          crs.push(tObj);
        }
        //console.log(crs.indexOf(tmpGr[i][0]));
      }
      //console.log(crs);
      return crs;
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
.homeBlock {
  margin-top: 25px;
}
.disciplineRow {
  margin-top: 15px;
}
.courseGroup {
  margin: 2px;
}
</style>
