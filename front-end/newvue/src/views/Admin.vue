<template>
<div class="admin">
  <h1>The Admin Page!</h1>
    <div class="heading">
      <div class="circle">1</div>
      <h2>Add a Car</h2>
    </div>
    <div class="add">
      <div class="form">
        <input v-model="title" placeholder="Title">
        <input v-model="description" placeholder="Description">
        <p></p>
        <input type="file" name="photo" @change="fileChanged">
        <button @click="upload">Upload</button>
      </div>
      <div class="upload" v-if="addCar">
        <h2>{{addCar.title}}</h2>
        <h4>{{addCar.description}}<h4>
        <img :src="addCar.path" />
      </div>
    </div>
    <div class="heading">
      <div class="circle">2</div>
      <h2>Edit/Delete a Car</h2>
    </div>
    <div class="edit">
      <div class="form">
        <input v-model="findTitle" placeholder="Search">
        <div class="suggestions" v-if="suggestions.length > 0">
          <div class="suggestion" v-for="s in suggestions" :key="s.id" @click="selectCar(s)">{{s.title}}
          </div>
        </div>
      </div>
      <div class="upload" v-if="findCar">
        <input v-model="findCar.title">
        <input v-model="findCar.description">
        <p></p>
        <img :src="findCar.path" />
      </div>
      <div class="actions" v-if="findCar">
        <button @click="deleteCar(findCar)">Delete</button>
        <button @click="editCar(findCar)">Edit</button>
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
      title: "",
      description: "",
      file: null,
      addCar: null,
      cars: [],
      findTitle: "",
    findCar: null,
    }
  },
  computed: {
    suggestions() {
      let cars = this.cars.filter(car => car.title.toLowerCase().startsWith(this.findTitle.toLowerCase()));
      return cars.sort((a, b) => a.title > b.title);
    }
  },
  created() {
    this.getCars();
  },
  methods: {
    
  async upload() {
      try {
        const formData = new FormData();
        formData.append('photo', this.file, this.file.name)
        let r1 = await axios.post('/api/photos', formData);
        let r2 = await axios.post('/api/cars', {
          title: this.title,
          description: this.description,
          path: r1.data.path
        });
        this.addCar = r2.data;
      } catch (error) {
        console.log(error);
      }
    },
    fileChanged(event) {
      this.file = event.target.files[0]
    },
    async getCars() {
      try {
        let response = await axios.get("/api/cars");
        this.cars = response.data;
        return true;
      } catch (error) {
      console.log(error);
    }
},
async editCar(car) {
      try {
        await axios.put("/api/cars/" + car._id, {
          title: this.findCar.title,
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
      this.findTitle = "";
      this.findCar = car;
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
  }
}
</script>