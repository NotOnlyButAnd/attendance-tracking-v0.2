<template>
  <section class="ui two column centered grid">
    <!-- <div>
      <h1>Страница для авторизации студента на паре</h1>
    </div> -->
    <!-- <div class="column">
      <form class="ui segment large form">
        <div class="field">
          <div class="ui right icon input large">
            <input
              type="text"
              placeholder="Enter your address"
              v-model="address"
              ref="autocomplete"
            />
            <b-button @click="locatorButtonPressed"
              >Получить координаты</b-button
            >
          </div>
        </div>
      </form>
    </div> -->
    <div>
      <h1>Вы успешно отмечены на занятии!</h1>
    </div>
  </section>
</template>

<script>
export default {
  data() {
    return {
      address: "",
    };
  },
  methods: {
    locatorButtonPressed() {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          console.log(position.coords.latitude);
          console.log(position.coords.longitude);
        },
        (error) => {
          console.log(error.message);
        }
      );
    },
  },
};
</script>

<style scoped>
h1 {
  margin: 2em 0;
}
</style>
