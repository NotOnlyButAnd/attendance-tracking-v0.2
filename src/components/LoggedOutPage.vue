<template>
  <div>
    <h1>Вы вышли из системы!</h1>
    <div>
      <b-table :items="items" :fields="fields">
        <!-- <template #cell(name)="data">
          <b-form-input
            v-if="items[data.index].isEdit && selectedCell === 'name'"
            type="text"
            v-model="items[data.index].name"
          ></b-form-input>
          <span v-else @click="editCellHandler(data, 'name')">{{
            data.value
          }}</span>
        </template> -->
        <template #cell(department)="data">
          <b-form-select
            v-if="items[data.index].isEdit && selectedCell === 'department'"
            v-model="items[data.index].department"
            :options="['Development', 'Marketing', 'HR', 'Accounting']"
            class="form-control"
          ></b-form-select>
          <span v-else @click="editCellHandler(data, 'department')">{{
            data.value
          }}</span>
        </template>
        <template #cell(age)="data">
          <b-form-input
            v-if="items[data.index].isEdit && selectedCell === 'age'"
            type="number"
            v-model="items[data.index].age"
          ></b-form-input>
          <span v-else @click="editCellHandler(data, 'age')">{{
            data.value
          }}</span>
        </template>
        <template #cell(dateOfBirth)="data">
          <b-form-datepicker
            v-if="items[data.index].isEdit && selectedCell === 'dateOfBirth'"
            v-model="items[data.index].dateOfBirth"
          ></b-form-datepicker>
          <span v-else @click="editCellHandler(data, 'dateOfBirth')">{{
            data.value
          }}</span>
        </template>
      </b-table>
      <pre>
      {{ items }}
    </pre
      >
    </div>
  </div>
</template>

<script>
export default {
  name: "App",
  components: {},
  data() {
    return {
      fields: [
        { key: "name", label: "Name" },
        { key: "department", label: "Department" },
        { key: "age", label: "Age" },
        { key: "dateOfBirth", label: "Date Of Birth" },
        { key: "edit", label: "" },
      ],
      items: [
        {
          age: 40,
          name: "Dickerson",
          department: "Development",
          dateOfBirth: "1984-05-20",
        },
        {
          age: 21,
          name: "Larsen",
          department: "Marketing",
          dateOfBirth: "1984-05-20",
        },
        {
          age: 89,
          name: "Geneva",
          department: "HR",
          dateOfBirth: "1984-05-20",
        },
        {
          age: 38,
          name: "Jami",
          department: "Accounting",
          dateOfBirth: "1984-05-20",
        },
      ],
      selectedCell: null,
    };
  },
  mounted() {
    this.items = this.items.map((item) => ({ ...item, isEdit: false }));
  },
  methods: {
    editCellHandler(data, name) {
      this.items = this.items.map((item) => ({ ...item, isEdit: false }));
      this.items[data.index].isEdit = true;
      this.selectedCell = name;
    },
  },
};
</script>

<style>
thead,
tbody,
tfoot,
tr,
td,
th {
  text-align: left;
  width: 100px;
  vertical-align: middle;
}
pre {
  text-align: left;
  color: #d63384;
}
</style>
