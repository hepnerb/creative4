<template>
<div class="home">
  <div id="titles">
  <h1 style="justify-content: flex-start">Cars </h1>
  </div>
  <section class="image-gallery">
    
    <div class="image" v-for="car in cars" :key="car.id">
      <h2>{{car.make}}</h2>
      <h4>{{car.modelf}}</h4>
      <img :src="car.path" />
      <h4>{{car.description}}
    </div>
  </section>
</div>
</template>

<style scoped>
.image h2 {
  font-style: italic;
}

/* Masonry */
*,
*:before,
*:after {
  box-sizing: inherit;
}

.image-gallery {
  column-gap: 1.5em;
}

.image {
  margin: 0 0 1.5em;
  display: inline-block;
  width: 100%;
}

.image img {
  width: 100%;
}
#titles{
  grid-area: side;
  display: flex;
}

/* Masonry on large screens */
@media only screen and (min-width: 1024px) {
  .image-gallery {
    column-count: 4;
  }
}

/* Masonry on medium-sized screens */
@media only screen and (max-width: 1023px) and (min-width: 768px) {
  .image-gallery {
    column-count: 3;
  }
}

/* Masonry on small screens */
@media only screen and (max-width: 767px) and (min-width: 540px) {
  .image-gallery {
    column-count: 2;
  }
}
</style>

<script>
// @ is an alias to /src
import axios from 'axios';
export default {
  name: 'Home',
  data() {
    return {
     cars: [],
     bikes: [],
    }
  },
  created() {
    this.getCars();
    this.getBikes();
  },
  methods: {
    async getCars() {
      try {
        let response = await axios.get("/api/cars/");
        this.cars = response.data;
        return true;
      } catch (error) {
        console.log(error);
      }
    },
    async getBikes() {
      try {
        let response = await axios.get("/api/bikes/");
        this.bikes = response.data;
        return true;
      } catch (error) {
        console.log(error);
      }
    },
  }
}
</script>
