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
          v-if="hasCurrGrpThisDisc"
          striped
          bordered
          hover
          responsive
          label-sort-asc=""
          label-sort-desc=""
          label-sort-clear=""
          :items="getTeacherTableItems"
          :fields="getTeacherTableFields"
        >
          <template v-if="fields[1].label[0] != '.'" #cell(dt_0)="data">
            <b-form-select
              v-if="isEditG"
              v-model="items[data.index].dt_0"
              :options="['н', 'б', '.']"
              class="form-control"
            ></b-form-select>
            <div v-else>
              {{ data.value }}
            </div>
          </template>
          <template v-if="fields[2].label[0] != '.'" #cell(dt_1)="data">
            <b-form-select
              v-if="isEditG"
              v-model="items[data.index].dt_1"
              :options="['н', 'б', '.']"
              class="form-control"
            ></b-form-select>
            <div v-else>
              {{ data.value }}
            </div>
          </template>
          <template v-if="fields[3].label[0] != '.'" #cell(dt_2)="data">
            <b-form-select
              v-if="isEditG"
              v-model="items[data.index].dt_2"
              :options="['н', 'б', '.']"
              class="form-control"
            ></b-form-select>
            <div v-else>
              {{ data.value }}
            </div>
          </template>
          <template v-if="fields[4].label[0] != '.'" #cell(dt_3)="data">
            <b-form-select
              v-if="isEditG"
              v-model="items[data.index].dt_3"
              :options="['н', 'б', '.']"
              class="form-control"
            ></b-form-select>
            <div v-else>
              {{ data.value }}
            </div>
          </template>
          <template v-if="fields[5].label[0] != '.'" #cell(dt_4)="data">
            <b-form-select
              v-if="isEditG"
              v-model="items[data.index].dt_4"
              :options="['н', 'б', '.']"
              class="form-control"
            ></b-form-select>
            <div v-else>
              {{ data.value }}
            </div>
          </template>
          <template v-if="fields[6].label[0] != '.'" #cell(dt_5)="data">
            <b-form-select
              v-if="isEditG"
              v-model="items[data.index].dt_5"
              :options="['н', 'б', '.']"
              class="form-control"
            ></b-form-select>
            <div v-else>
              {{ data.value }}
            </div>
          </template>
          <template v-if="fields[7].label[0] != '.'" #cell(dt_6)="data">
            <b-form-select
              v-if="isEditG"
              v-model="items[data.index].dt_6"
              :options="['н', 'б', '.']"
              class="form-control"
            ></b-form-select>
            <div v-else>
              {{ data.value }}
            </div>
          </template>
          <template v-if="fields[8].label[0] != '.'" #cell(dt_7)="data">
            <b-form-select
              v-if="isEditG"
              v-model="items[data.index].dt_7"
              :options="['н', 'б', '.']"
              class="form-control"
            ></b-form-select>
            <div v-else>
              {{ data.value }}
            </div>
          </template>
          <template v-if="fields[9].label[0] != '.'" #cell(dt_8)="data">
            <b-form-select
              v-if="isEditG"
              v-model="items[data.index].dt_8"
              :options="['н', 'б', '.']"
              class="form-control"
            ></b-form-select>
            <div v-else>
              {{ data.value }}
            </div>
          </template>
          <template v-if="fields[10].label[0] != '.'" #cell(dt_9)="data">
            <b-form-select
              v-if="isEditG"
              v-model="items[data.index].dt_9"
              :options="['н', 'б', '.']"
              class="form-control"
            ></b-form-select>
            <div v-else>
              {{ data.value }}
            </div>
          </template>
        </b-table>
        <h1 v-else>У выбранной группы нет этого предмета!</h1>
      </div>
      <!-- <div>{{ this.visits }}</div> -->
    </div>
    <div v-if="username[0] === 't'">
      <b-button v-if="!isEditG" @click="editAllCellHandler()">
        Внести изменения
      </b-button>
      <b-button
        v-if="isEditG"
        @click="discardChangesHandler()"
        variant="outline-secondary"
      >
        Отмена
      </b-button>
      <b-button v-if="isEditG" @click="sendChangesHandler()" variant="danger">
        Сохранить изменения
      </b-button>
    </div>
    <!-- <div>
      <b-card class="mt-3" header="Fields">
        <pre class="m-0">{{ fields }}</pre>
      </b-card>
      <b-card class="mt-3" header="Items">
        <pre class="m-0">{{ items }}</pre>
      </b-card>
    </div> -->
  </div>
</template>

<script>
import { mapGetters, mapState, mapActions } from "vuex";
import axios from "axios";

export default {
  name: "ReportsPage",
  data() {
    return {
      currDisciplineName: localStorage.currDiscName || "Выберите дисциплину",
      currGrpName: localStorage.currGrpName || "Выберите группу",
      currDisciplineID: localStorage.currDiscID || -1,
      forRequests: {},
      items: [],
      itemsBackup: [],
      fields: [],
      fieldsBackup: [],
      selectedCell: null,
      isEditG: false,
      currFirstIndDt: 0,
      currLastIndDt: 10,
      currPage: 1,
      currName: "",
    };
  },
  computed: {
    ...mapGetters("visits", ["visits", "getVisitsByID"]),
    ...mapGetters("students", ["studentsSt", "getStudentByID"]),
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
      let tmpTeacherDisc = this.getTeacherDisciplinesByID(this.username);
      let tmpTeacherDiscIDs = [];
      for (let key in tmpTeacherDisc) {
        tmpTeacherDiscIDs.push(tmpTeacherDisc[key].discipline.id);
      }
      // console.log("Curr teacher disciplines ids:", tmpTeacherDiscIDs);
      let tmpGroupsNamesByDiscs = [];
      // ВОЗМОЖНО СЛОМАЕТСЯ, СЛЕДИ ЗА ГРУППАМИ
      for (let key in this.studentDisciplines) {
        let currDiscID = this.studentDisciplines[key].discipline.id;
        let currGrp = this.studentDisciplines[key].student.group;
        if (
          tmpTeacherDiscIDs.find((i) => i === currDiscID) &&
          !tmpGroupsNamesByDiscs.find((i) => i === currGrp)
        ) {
          tmpGroupsNamesByDiscs.push(currGrp);
        }
      }
      //return ["46", "47", "4ПМ", "36", "3ИТ", "39", "27", "26", "17", "19"];
      return tmpGroupsNamesByDiscs;
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
    getTeacherTableFields() {
      let currFields = [];
      // add first in Fields
      currFields.push({ key: "name", label: "ФИО", sortable: true });
      // get all dates from 0 to 10
      let dts = [];
      let tVisitsAll = Object.values(this.visits);
      // console.log("VISITS ALL", tVisitsAll);
      let tVisits = [];
      for (let i = 0; i < tVisitsAll.length; i++) {
        if (
          tVisitsAll[i].studentDiscipline.discipline.id ==
            this.currDisciplineID &&
          tVisitsAll[i].studentDiscipline.student.group == this.currGrpName
        ) {
          if (!dts.find((el) => el == tVisitsAll[i].dt)) {
            dts.push(tVisitsAll[i].dt);
          }
          // console.log(
          //   "Finded? dt=",
          //   tVisitsAll[i].dt,
          //   "; curr dts=",
          //   dts,
          //   dts.find((el) => el == tVisitsAll[i].dt)
          // );
          tVisits.push(tVisitsAll[i]);
        }
      }
      // делаем нормальные даты
      for (let i = 0; i < dts.length; i++) {
        dts[i] = this.getNormDt(dts[i]);
      }
      // console.log("Dates:", dts);
      // console.log("Visits by disc and gr:", tVisits);
      // дополняем до 10
      for (let i = dts.length; i < 10; i++) {
        dts.push("....-..-..");
      }
      // add dates to fields
      for (let i = 0; i < dts.length; i++) {
        currFields.push({
          key: `dt_${i}`,
          label: dts[i],
          sortable: false,
        });
      }
      // console.log("Get fields...");
      // eslint-disable-next-line vue/no-side-effects-in-computed-properties
      this.fields = currFields;
      return currFields;
    },
    getTeacherTableItems() {
      let currItems = [];
      // получаем всех студентов данной группы
      let tStudentsAll = this.studentsSt;
      // console.log("all studs: ", tStudentsAll);
      let indx = 0;
      // собираем читаемые ФИО всех студентов выбранной группы
      for (let key in tStudentsAll) {
        // если студент в выбранной группе то добавляем что надо
        if (tStudentsAll[key].group === this.currGrpName) {
          // console.log(this.getStudentFullNameByLogin(key));
          // создаем новую строку, добавляем в первую колонку ФИО
          currItems.push({
            name: this.getStudentFullNameByLogin(key),
            usrnm: key,
          });
          let states = [];
          // КОСТЫЛЬ для получения айдишников посещений
          let visitsIDs = [];
          // КОСТЫЛЬ для получения айдишников посещений
          let tVisits = Object.values(this.getVisitsByID(key));
          // console.log("curr visits: ", tVisits);
          for (let i = 0; i < tVisits.length; i++) {
            //states.push(tVisits[i].state);
            if (
              tVisits[i].studentDiscipline.discipline.id ==
              this.currDisciplineID
            ) {
              visitsIDs.push(tVisits[i].id);
              if (tVisits[i].state) {
                states.push(tVisits[i].state);
              } else {
                // НУЖНО ДЛЯ ТОГО ЧТОБЫ div в изменениях таблицы отрисовывался
                states.push(" . ");
              }
            } else {
              //states.push("-");
            }
          }
          for (let i = states.length; i < 10; i++) {
            visitsIDs.push(-1);
            states.push("-");
          }
          // console.log("curr states:", states);
          // add dates to fields
          for (let i = 0; i < 10; i++) {
            currItems[indx][`dt_${i}`] = states[i];
          }
          currItems[indx][`visitIDs`] = Array.from(visitsIDs);
          indx++;
        }
      }
      // console.log("Get items...");
      // eslint-disable-next-line vue/no-side-effects-in-computed-properties
      this.items = currItems;
      this.addIsEditableToItems();
      return currItems;
    },
    hasCurrGrpThisDisc() {
      // получаем все дисциплины выбранной группы
      let tStudDiscAll = this.studentDisciplines;
      let currGrpDiscIDS = [];
      for (let key in tStudDiscAll) {
        if (tStudDiscAll[key].student.group === this.currGrpName) {
          if (
            !currGrpDiscIDS.find((i) => i === tStudDiscAll[key].discipline.id)
          )
            currGrpDiscIDS.push(tStudDiscAll[key].discipline.id);
        }
      }
      // console.log("t stud disc: ", tStudDiscAll);
      // console.log("curr grp disciplines ids: ", currGrpDiscIDS);
      // console.log(
      //   "HAS ",
      //   currGrpDiscIDS,
      //   " ",
      //   this.currDisciplineID,
      //   " ??? :",
      //   currGrpDiscIDS.find((i) => i == this.currDisciplineID)
      // );
      if (currGrpDiscIDS.find((i) => i == this.currDisciplineID)) {
        return true;
      } else return false;
    },
  },
  methods: {
    ...mapActions("visits", ["fetchAllVisits"]),
    discardChangesHandler() {
      // console.log("Отмена...");
      // достаем данные из бэкапа, или делаем запрос опять на выгрузку обычную
      this.items = Array.from(this.itemsBackup);
      this.fields = Array.from(this.fieldsBackup);
      //this.getTeacherTableItems;
      this.isEditG = false;
    },
    sendChangesHandler() {
      alert("ОК, отправляем на сервер!");
      //console.log("Send fields: ", this.fields);
      //console.log("Send items: ", this.items);
      // составляем данные для запроса:
      // получаем teacherDiscipline (id) для авторизованного препода
      let tTeachDiscAll = this.getTeacherDisciplinesByID(this.username);
      //console.log("TDISC ALL: ", tTeachDiscAll);
      let currTeachDisc = -1;
      for (let key in tTeachDiscAll) {
        if (tTeachDiscAll[key].discipline.id == this.currDisciplineID) {
          currTeachDisc = tTeachDiscAll[key].id;
        }
      }
      //console.log("CURR TEACH DISC ID: ", currTeachDisc);
      // пробегаемся по всем студентам
      for (let i = 0; i < this.items.length; i++) {
        // получаем studentDiscipline (id) для текущего студента
        let tStudDiscAll = this.getStudentDisciplinesByID(this.items[i].usrnm);
        //console.log("SDISC ALL: ", tStudDiscAll);
        let currStudDisc = -1;
        for (let key in tStudDiscAll) {
          if (tStudDiscAll[key].discipline.id == this.currDisciplineID) {
            currStudDisc = tStudDiscAll[key].id;
          }
        }
        //console.log("CURR STUD DISC ID : ", currStudDisc);
        //console.log("ITEM: ", this.items[i]);
        let cntr = 0;
        // пробегаемся по всем 10 датам в текущем item
        for (let key in this.items[i]) {
          // рассматриваем только именно стэйты с датами
          if (key[0] == "d" && key[1] == "t") {
            // если в текущем поле не "-" то обновляем иначе ничего не делаем
            if (this.items[i][key] != "-") {
              //console.log("key: ", key, " val: ", this.items[i][key]);
              // получим дату (строку) для текущего ключа
              let tDtStr = "";
              for (let j = 0; j < this.fields.length; j++) {
                if (this.fields[j].key == key) {
                  tDtStr = this.getDumbDt(this.fields[j].label);
                  break;
                }
              }
              //console.log("dt: ", tDtStr);
              //console.log("visit id: ", this.items[i].visitIDs[cntr], "cntr: ");
              // ИТОГО ПОЛУЧАЕМ ТЕЛО ЗАПРОСА
              let tReq = {};
              //tReq["id"] = this.items[i].visitIDs[cntr];
              tReq["dt"] = tDtStr;
              tReq["state"] = this.items[i][key];
              tReq["studentDiscipline"] = currStudDisc;
              tReq["teacherDiscipline"] = currTeachDisc;
              //console.log("FINAL req body (not needed id): ", tReq);
              // здесь делаем PATCH запрос
              this.sendPatchVisit(this.items[i].visitIDs[cntr], tReq);
            }
            cntr++;
          }
        }
      }
      this.fetchAllVisits();
      this.isEditG = false;

      this.fetchAllVisits();
    },
    sendPatchVisit(visitId, reqData) {
      // eslint-disable-next-line no-unused-vars
      return new Promise((resolve, reject) => {
        axios({
          url: process.env.VUE_APP_MY_API_URL + "visits/update/" + visitId,
          data: reqData,
          method: "PATCH",
        })
          .then((response) => {
            //console.log("RESPONSE (sendPatchVisit):", response);
            //console.log("visits: ", this.visits);
            resolve(response);
          })
          .catch((err) => {
            //console.log("ERR (sendPatchVisit):", err);
            reject(err);
          });
      });
    },
    editAllCellHandler() {
      // console.log("CLICKED ON edit button.. Before: ", this.isEditG);
      // кладем бэкапы массивов
      this.itemsBackup = Array.from(this.items);
      this.fieldsBackup = Array.from(this.fields);
      this.isEditG = !this.isEditG;
      // console.log("After: ", this.isEditG);
    },
    // DEPRECATED
    editCellHandler(data, name) {
      // console.log("CLOCKED ON ", name);
      this.items = this.items.map((item) => ({ ...item, isEdit: false }));
      this.items[data.index].isEdit = true;
      this.selectedCell = name;
    },
    // END DEPRECATED
    addIsEditableToItems() {
      this.items = this.items.map((item) => ({ ...item, isEdit: false }));
    },
    getStudentFullNameByLogin(usrname) {
      let tObj = this.getStudentByID(usrname);
      return (
        tObj.user.last_name +
        " " +
        tObj.user.first_name[0] +
        "." +
        tObj.middleName[0] +
        "."
      );
    },
    onDisciplineClick(disc_name, disc_id) {
      //console.log("clicked on:", disc_name, "id:", disc_id, "\nEvent:", e);
      localStorage.setItem("currDiscName", disc_name);
      localStorage.setItem("currDiscID", disc_id);
      this.currDisciplineID = disc_id;
      this.currDisciplineName = disc_name;
    },
    onGroupClick(g_name) {
      //console.log("clicked on:", g_name, "\nEvent:", e);
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
    getDumbDt(dt) {
      return (
        dt[7] +
        dt[8] +
        dt[9] +
        dt[10] +
        "-" +
        dt[3] +
        dt[4] +
        "-" +
        dt[0] +
        dt[1]
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
.mySpan {
  height: 100 px;
  width: 100 px;
}
</style>
