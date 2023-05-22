<template>
  <div class="reportsPage">
    <!-- <h1>This is an REPORTS page "{{ username }}"</h1> -->
    <div>
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
    </div>
    <div class="m-2 mx-auto border p-3 rounded">
      <div v-if="username[0] === 's'">
        <b-table
          striped
          bordered
          hover
          responsive
          label-sort-asc=""
          label-sort-desc=""
          label-sort-clear=""
          :items="getTableItems"
          :fields="getTableFields"
        ></b-table>
      </div>
    </div>
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
      tableFields: [],
      tableItems: [],
      currFirstIndDt: 0,
      currLastIndDt: 10,
      currPage: 1,
      currName: "",
    };
  },
  computed: {
    ...mapGetters("visits", ["visits", "getVisitsByID"]),
    ...mapGetters("students", ["getStudentByID"]),
    ...mapGetters("studentDisciplines", [
      "studentDisciplines",
      "getStudentDisciplinesByID",
    ]),
    ...mapGetters("teacherDisciplines", [
      "teacherDisciplines",
      "getTeacherDisciplinesByID",
    ]),
    ...mapState({}),
    getStudentName() {
      let tObj = this.getStudentByID(this.username);
      return (
        tObj.user.last_name +
        " " +
        tObj.user.first_name[0] +
        "." +
        tObj.middleName[0] +
        "."
      );
    },
    getTableFields() {
      let currFields = [];
      // add first in Fields
      currFields.push({ key: "name", label: "ФИО", sortable: true });
      // get all dates from 0 to 10
      let dts = [];
      let tVisits = Object.values(this.getVisitsByID(this.username));
      for (let i = 0; i < tVisits.length; i++) {
        //dts.push(tVisits[i].dt);
        if (
          tVisits[i].studentDiscipline.discipline.id == this.currDisciplineID
        ) {
          dts.push(this.getNormDt(tVisits[i].dt));
        } else {
          //dts.push("....-..-..");
        }
      }
      for (let i = dts.length; i < 10; i++) {
        dts.push("....-..-..");
      }
      // add dates to fields
      for (let i = 0; i < dts.length; i++) {
        currFields.push({
          key: `dt-${i}`,
          label: dts[i],
          sortable: false,
        });
      }
      return currFields;
    },
    getTableItems() {
      let currItems = [];
      // add first in Items
      currItems.push({ name: this.getStudentName });
      // get all states from 0 to 10
      let states = [];
      let tVisits = Object.values(this.getVisitsByID(this.username));
      for (let i = 0; i < tVisits.length; i++) {
        //states.push(tVisits[i].state);
        if (
          tVisits[i].studentDiscipline.discipline.id == this.currDisciplineID
        ) {
          states.push(tVisits[i].state);
        } else {
          //states.push("-");
        }
      }
      for (let i = states.length; i < 10; i++) {
        states.push("-");
      }
      // add dates to fields
      for (let i = 0; i < 10; i++) {
        currItems[0][`dt-${i}`] = states[i];
      }
      return currItems;
    },
  },
  methods: {
    onDisciplineClick(disc_name, disc_id, e) {
      console.log("clicked on:", disc_name, "id:", disc_id, "\nEvent:", e);
      localStorage.setItem("currDiscName", disc_name);
      localStorage.setItem("currDiscID", disc_id);
      this.currDisciplineID = disc_id;
      this.currDisciplineName = disc_name;
    },
    getNormDt(dt) {
      return (
        dt[8] +
        dt[9] +
        "." +
        dt[5] +
        dt[6] +
        ".\n" +
        dt[0] +
        dt[1] +
        dt[2] +
        dt[3]
      );
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
.dropitem {
  color: #a5a5a5;
}
</style>
