<template>
<div id="app">
  <!-- <div class="header"> -->
    <!-- <router-link to="/"> -->
    <div id="menu">

    <div id="brand">
      <router-link to="/">
        <img src="/images/logo.png">
      </router-link>
      <h1>Generic Used Car Site</h1>
    </div>
    </div>
    <!-- <div class="header">
    <router-link to="/">
      <div class="logo">
        <img src="/images/logo.png">
      </div>
    </router-link>
    <div class="title">
      <h1>Generic Used Car Site</h1>
    </div>
  </div> -->
  <!-- </div> -->
  <div class="content">
    <router-view />
  </div>
  <div class="footer">
    <router-link to="/admin">Admin</router-link>
    <p> </p>
    <router-link to="/about">About Us</router-link>
    <p> </p>
    <a href="https://github.com/hepnerb/creative4.git">Github Link</a>
  </div>
</div>
</template>

<style>
html {
  box-sizing: border-box;
}
#menu {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-column-gap: 5px;
  grid-template-areas: "none brand side";
  margin-bottom: 50px;
}

body {
  font-family: 'Montserrat', sans-serif;
  font-size: 16px;
  background: #fff;
  padding: 0px;
  margin: 0px;
}
#brand {
  grid-area: brand;
  display: flex;
  justify-content: center;
}
/* Header */
.header {
  display: flex;
  padding: 10px 100px 0px 100px;
  background-color: tan;
  color: black;
}

.title {
  margin-top: 5px;
}

.title h1 {
  font-size: 30px;
}

.content {
  padding: 20px 100px;
  min-height: 500px;
}

/* Footer */
.footer {
  height: 80px;
  padding: 20px 100px 0px 100px;
  background: #e3e3e3;
  font-size: 12px;
}

.footer a {
  color: #000;
}

h1 {
  font-size: 20px;
}

h2 {
  font-size: 14px;
}
</style>
