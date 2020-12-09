<template>
<div class="admin">
  <h1>Change Page</h1>
    <div class="heading">
      <h2>Add a Car</h2>
    </div>
    <div class="add">
      <div class="form">
        <input v-model="make" placeholder="Make">
        <input v-model="model" placeholder="Model">
        <input v-model="description" placeholder="Description">
        <p></p>
        <input type="file" name="photo" @change="carfileChanged">
        <button @click="carupload">Upload</button>
      </div>
      <div class="upload" v-if="addCar">
        <h2>{{addCar.make}}</h2>
        <h4>{{addCar.model}}<h4>
        <h4>{{addCar.description}}<h4>
        <img :src="addCar.path" />
      </div>
    </div>

    <div class="heading">
      <h2>Add a Bike</h2>
    </div>
    <div class="add">
      <div class="form">
        <input v-model="make" placeholder="Make">
        <input v-model="model" placeholder="Model">
        <input v-model="description" placeholder="Description">
        <input v-model="size" placeholder="Size">
        <p></p>
        <input type="file" name="photo" @change="bikefileChanged">
        <button @click="bikeupload">Upload</button>
      </div>
      <div class="upload" v-if="addBike">
        <h2>{{addBike.make}}</h2>
        <h4>{{addBike.model}}<h4>
        <h4>{{addBike.description}}<h4>
        <h4>{{addBike.size}}<h4>
        <img :src="addBike.path" />
      </div>
    </div>
    
    <div class="heading">
      <h2>Edit/Delete a Car</h2>
    </div>
    <div class="edit">
      <div class="form">
        <input v-model="findMake" placeholder="Search">
        <div class="suggestions" v-if="carsuggestions.length > 0">
          <div class="suggestion" v-for="s in carsuggestions" :key="s.id" @click="selectCar(s)">{{s.make}}
          </div>
        </div>
      </div>
      <div class="upload" v-if="findCar">
        <input v-model="findCar.make">
        <input v-model="findCar.model">
        <input v-model="findCar.description">
        <p></p>
        <img :src="findCar.path" />
      </div>
      <div class="actions" v-if="findCar">
        <button @click="deleteCar(findCar)">Delete</button>
        <button @click="editCar(findCar)">Edit</button>
      </div>
    </div>

    <div class="heading">
      <h2>Edit/Delete a Bike</h2>
    </div>
    <div class="edit">
      <div class="form">
        <input v-model="findMake" placeholder="Search">
        <div class="suggestions" v-if="bikesuggestions.length > 0">
          <div class="suggestion" v-for="s in bikesuggestions" :key="s.id" @click="selectBike(s)">{{s.make}}
          </div>
        </div>
      </div>
      <div class="upload" v-if="findBike">
        <input v-model="findBike.make">
        <input v-model="findBike.model">
        <input v-model="findBike.description">
        <p></p>
        <img :src="findBike.path" />
      </div>
      <div class="actions" v-if="findBike">
        <button @click="deleteBike(findBike)">Delete</button>
        <button @click="editBike(findBike)">Edit</button>
      </div>
    </div>


</div>
</template>
<style scoped>
.image h2 {
  font-style: italic;
  font-size: 1em;
}

.heading {
  display: flex;
  margin-bottom: 20px;
  margin-top: 20px;
}

.heading h2 {
  margin-top: 8px;
  margin-left: 10px;
}

.add,
.edit {
  display: flex;
}

.circle {
  border-radius: 50%;
  width: 18px;
  height: 18px;
  padding: 8px;
  background: #333;
  color: #fff;
  text-align: center
}

/* Form */
input,
textarea,
select,
button {
  font-family: 'Montserrat', sans-serif;
  font-size: 1em;
}

.form {
  margin-right: 50px;
}

/* Uploaded images */
.upload h2 {
  margin: 0px;
}

.upload img {
  max-width: 300px;
}
/* Suggestions */
.suggestions {
  width: 200px;
  border: 1px solid #ccc;
}

.suggestion {
  min-height: 20px;
}

.suggestion:hover {
  background-color: #5BDEFF;
  color: #fff;
}
</style>

<script>
import axios from 'axios';
export default {
  name: 'Admin',
  data() {
    return {
      make: "",
      model: "",
      description: "",
      size: "",
      file: null,
      addCar: null,
      cars: [],
      addBike: null,
      bikes: [],
      findMake: "",
    findCar: null,
    findBike: null,
    }
  },
  computed: {
    carsuggestions() {
      let cars = this.cars.filter(car => car.make.toLowerCase().startsWith(this.findMake.toLowerCase()));
      return cars.sort((a, b) => a.make > b.make);
    },
    bikesuggestions() {
      let bikes = this.bikes.filter(bike => bike.make.toLowerCase().startsWith(this.findMake.toLowerCase()));
      return bikes.sort((a, b) => a.make > b.make);
    }
  },
  created() {
    this.getCars();
    this.getBikes();
  },
  methods: {
    
  async carupload() {
      try {
        const formData = new FormData();
        formData.append('photo', this.file, this.file.name)
        let r1 = await axios.post('/api/photos', formData);
        let r2 = await axios.post('/api/cars/', {
          make: this.make,
          description: this.description,
          path: r1.data.path
        });
        this.addCar = r2.data;
      } catch (error) {
        console.log(error);
      }
    },
    carfileChanged(event) {
      this.file = event.target.files[0]
    },
    async getCars() {
      try {
        let response = await axios.get("/api/cars/");
        this.cars = response.data;
        return true;
      } catch (error) {
      console.log(error);
    }
},
async bikeupload() {
      try {
        const formData = new FormData();
        formData.append('photo', this.file, this.file.name)
        let r1 = await axios.post('/api/photos', formData);
        let r2 = await axios.post('/api/bikes/', {
          make: this.make,
          description: this.description,
          path: r1.data.path
        });
        this.addBike = r2.data;
      } catch (error) {
        console.log(error);
      }
    },
    bikefileChanged(event) {
      this.file = event.target.files[0]
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
async editCar(car) {
      try {
        await axios.put("/api/cars/" + car._id, {
          make: this.findCar.make,
          description: this.findCar.description,
        });
        this.findCar = null;
        this.getCars();
        return true;
      } catch (error) {
        console.log(error);
      }
    },
      selectCar(car) {
      this.findMake = "";
      this.findCar = car;
    },
async editBike(bike) {
      try {
        await axios.put("/api/bikes/" + bike._id, {
          make: this.findBike.make,
          description: this.findBike.description,
        });
        this.findBike = null;
        this.getBikes();
        return true;
      } catch (error) {
        console.log(error);
      }
    },
      selectBike(bike) {
      this.findMake = "";
      this.findBike = bike;
    },
    async deleteCar(car) {
      try {
        await axios.delete("/api/cars/" + car._id);
        this.findCar = null;
        this.getCars();
        return true;
      } catch (error) {
        console.log(error);
      }
    },
    async deleteBike(bike) {
      try {
        await axios.delete("/api/bikes/" + bike._id);
        this.findBike = null;
        this.getBikes();
        return true;
      } catch (error) {
        console.log(error);
      }
    },
  }
}
</script>