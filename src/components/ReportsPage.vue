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
    <div v-if="username[0] === 't'">
      <b-dropdown
        block
        variant="secondary"
        class="m-2 mx-auto"
        menu-class="w-100"
      >
        <template #button-content>
          <em>{{ currGrpName }}</em>
        </template>
        <template>
          <b-dropdown-item
            v-for="grp in getTeacherGroupsByID"
            :key="grp"
            @click="onGroupClick(grp, $event)"
          >
            {{ grp }}
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
      <div v-if="username[0] === 't'">
        <b-table
          striped
          bordered
          hover
          responsive
          label-sort-asc=""
          label-sort-desc=""
          label-sort-clear=""
          :items="getTeacherTableItems"
          :fields="getTeacherTableFields"
        ></b-table>
      </div>
      <!-- <div>{{ this.visits }}</div> -->
    </div>
    <div v-if="username[0] === 't'">
      <b-button>Внести изменения</b-button>
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
      currGrpName: localStorage.currGrpName || "Выберите группу",
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
    getTeacherGroupsByID() {
      return ["46", "47", "4ПМ", "36", "39", "3ИТ", "26", "27", "17", "19"];
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
      // УДАЛИТЬ ЭТИ КОСТЫЛИ И ЗАМЕНИТЬ НА ФАМИЛИИ НОРМАЛЬНЫЕ
      // currItems.push({});
      // Object.assign(currItems[1], currItems[0]);
      // currItems[1]["name"] = "Петрова А.А.";
      // currItems.push({});
      // Object.assign(currItems[2], currItems[0]);
      // currItems[2]["name"] = "Петров П.П.";
      // currItems.push({});
      // Object.assign(currItems[3], currItems[0]);
      // currItems[3]["name"] = "Сидоров И.А.";
      // currItems.push({});
      // Object.assign(currItems[4], currItems[0]);
      // currItems[4]["name"] = "Сидорова М.К.";
      // currItems.push({});
      // Object.assign(currItems[5], currItems[0]);
      // currItems[5]["name"] = "Филькин С.С.";

      return currItems;
    },
    getTeacherTableFields() {
      let currFields = [];
      // add first in Fields
      currFields.push({ key: "name", label: "ФИО", sortable: true });
      // get all dates from 0 to 10
      let dts = [];
      let tVisitsAll = Object.values(this.visits);
      let tVisits = [];
      for (let i = 0; i < tVisitsAll.length; i++) {
        if (
          tVisitsAll[i].studentDiscipline.discipline.id ==
            this.currDisciplineID &&
          tVisitsAll[i].studentDiscipline.student.group == this.currGrpName
        ) {
          if (dts.find((el) => el == tVisitsAll[i].dt) == -1) {
            dts.push(tVisitsAll[i].dt);
          }
          console.log(
            "Finded?",
            dts.find((el) => el == tVisitsAll[i].dt)
          );
          tVisits.push(tVisitsAll[i]);
        }
      }
      console.log("Dates::", dts);
      console.log("Visits by disc and gr:", tVisits);
      return currFields;
    },
    getTeacherTableItems() {
      let currItems = [];
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
    onGroupClick(g_name, e) {
      console.log("clicked on:", g_name, "\nEvent:", e);
      localStorage.setItem("currGrpName", g_name);
      this.currGrpName = g_name;
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
