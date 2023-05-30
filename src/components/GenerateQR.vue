<template>
  <div class="GenerateQRPage" v-if="username[0] === 't'">
    <!-- Привет, {{ username }}! Это страница для создания QR кода -->
    <div class="w-75 mx-auto border p-3 rounded">
      <b-form @submit="onSubmit" @reset="onReset" v-if="show">
        <b-form-group
          class="GenerateQRPage"
          id="input-group-1"
          label="Дисциплина:"
          label-for="input-1"
        >
          <b-form-input
            id="input-1"
            v-model="form.discipline"
            placeholder="Введите название дисциплины"
            required
          ></b-form-input>
        </b-form-group>

        <b-form-group
          class="GenerateQRPage"
          id="input-group-2"
          label="Преподаватель:"
          label-for="input-2"
        >
          <b-form-input
            id="input-2"
            v-model="form.teacher"
            placeholder="Введите логин"
            required
          ></b-form-input>
        </b-form-group>

        <b-form-group
          class="GenerateQRPage"
          id="input-group-3"
          label="Номер пары:"
          label-for="input-3"
        >
          <b-form-select
            id="input-3"
            v-model="form.classNum"
            :options="classNums"
            required
          ></b-form-select>
        </b-form-group>

        <b-form-group
          class="GenerateQRPage"
          id="input-group-4"
          label="Время начала:"
          label-for="input-4"
        >
          <b-input-group class="mb-3">
            <b-form-input
              id="example-input-4"
              v-model="form.dtTimeBegin"
              type="text"
              placeholder="HH:mm:ss"
            ></b-form-input>
            <b-input-group-append>
              <b-form-timepicker
                id="input-4"
                v-model="form.dtTimeBegin"
                placeholder="Введите время начала пары"
                :hour12="false"
                required
              ></b-form-timepicker>
            </b-input-group-append>
          </b-input-group>
        </b-form-group>

        <b-form-group
          class="GenerateQRPage"
          id="input-group-5"
          label="Время конца:"
          label-for="input-5"
        >
          <b-input-group class="mb-3">
            <b-form-input
              id="example-input-5"
              v-model="form.dtTimeEnd"
              type="text"
              placeholder="HH:mm:ss"
            ></b-form-input>
            <b-input-group-append>
              <b-form-timepicker
                id="input-5"
                v-model="form.dtTimeEnd"
                placeholder="Введите время конца пары"
                :hour12="false"
                required
              ></b-form-timepicker>
            </b-input-group-append>
          </b-input-group>
        </b-form-group>

        <b-form-group
          class="GenerateQRPage"
          id="input-group-6"
          label="Дата:"
          label-for="input-6"
        >
          <b-form-datepicker
            id="datepicker-dateformat2"
            v-model="form.dateTime"
            :date-format-options="{
              year: 'numeric',
              month: 'numeric',
              day: 'numeric',
            }"
            locale="ru"
            placeholder="Выберите дату"
          ></b-form-datepicker>
        </b-form-group>

        <b-button class="GenerateQRPage" type="submit" variant="primary"
          >Сгенерировать</b-button
        >
        <!-- <b-button class="GenerateQRPage" type="reset" variant="danger"
          >Сбросить</b-button
        > -->
      </b-form>
      <b-card class="mt-3" header="Form Data Result">
        <pre class="m-0">{{ form }}</pre>
      </b-card>
      <div>
        {{ getCurrWeekType }}
      </div>
      <div>
        {{ getCurrClassOrder }}
      </div>
    </div>
    <!-- Проверка: время текущее между временами начала и конца или нет? -->
    <!-- <h5>Time start: {{ setTimeStart }}</h5>
    <h5>Time end: {{ setTimeEnd }}</h5>
    <h3>
      Is time {{ currDateTime }} between {{ setTimeStart }} and
      {{ setTimeEnd }} ?
    </h3>
    <h1>{{ currDateTime >= setTimeStart && currDateTime <= setTimeEnd }}</h1> -->
    <!-- /Проверка -->
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "GenerateQR",
  data() {
    return {
      form: {
        discipline: "",
        teacher: "",
        classNum: null,
        dtTimeBegin: "",
        dtTimeEnd: "",
        dateTime: "",
      },
      classNums: [1, 2, 3, 4, 5, 6, 7, 8, 9],
      show: true,
      classNumber: 2,
      currDateTime: new Date(),
      dtTimeBegin: new Date(),
      dtTimeEnd: new Date(),
    };
  },
  methods: {
    onSubmit(event) {
      event.preventDefault();
      alert(JSON.stringify(this.form));
    },
    onReset(event) {
      event.preventDefault();
      // Reset our form values
      this.form.discipline = "";
      this.form.teacher = "";
      this.form.classNum = null;
      this.form.dtTimeBegin = "";
      this.form.dtTimeEnd = "";
      // Trick to reset/clear native browser form validation state
      this.show = false;
      this.$nextTick(() => {
        this.show = true;
      });
    },
  },
  computed: {
    ...mapGetters("weekTypes", [
      "weekTypes",
      "getWeekTypeByID",
      "getWeekTypeByDT",
    ]),
    ...mapGetters("classOrders", [
      "classOrders",
      "getClassOrderByID",
      "getClassOrderByTime",
    ]),
    getCurrWeekType() {
      console.log("СЧИТАЕМ ДАТУ");
      let currDt = new Date();
      // проверено ниже - работает норм
      //currDt.setDate(currDt.getDate() - 3);
      return this.getWeekTypeByDT(currDt);
    },
    getCurrClassOrder() {
      console.log("СЧИТАЕМ НОМЕР ПАРЫ");
      let currDt = new Date();
      // проверено ниже - работает норм
      //currDt.setHours(10, 57, 0);
      // eslint-disable-next-line vue/no-side-effects-in-computed-properties
      this.form.classNum = this.getClassOrderByTime(currDt).number;
      // eslint-disable-next-line vue/no-side-effects-in-computed-properties
      this.form.dtTimeBegin = this.getClassOrderByTime(currDt).timeBegin;
      // eslint-disable-next-line vue/no-side-effects-in-computed-properties
      this.form.dtTimeEnd = this.getClassOrderByTime(currDt).timeEnd;
      return this.getClassOrderByTime(currDt);
    },
    // getNormDtTime(timeStr) {
    //   return timeStr;
    // },
    setTimeStart() {
      this.dtTimeBegin.setHours(9, 30, 0);
      console.log(this.dtTimeBegin);
      return this.dtTimeBegin;
    },
    setTimeEnd() {
      this.dtTimeEnd.setHours(10, 50, 0);
      console.log(this.dtTimeEnd);
      return this.dtTimeEnd;
    },
  },
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
