<template>
  <div class="home">
    <div class="main">
      <h1>Главная</h1>
      <BtnPanel/>
    </div>
    <div class="news">
      <h2>Новости</h2>
      <button @click="logout">Выйти (в окно)</button>
    </div>
  </div>
</template>

<script>
import firebase from 'firebase'
import BtnPanel from '@/components/BtnPanel.vue'

export default {
  name: 'Home',
  components: {
    BtnPanel
  },
  methods: {
    logout: function() {
      firebase.auth().signOut().then(() => {
        this.$router.replace('login')
      })
    }
  }
}
</script>

<style lang="scss" scoped>
  .main {
    padding-bottom: 20px;
    border-bottom: 1px solid #2c3e50;
  }
  .news {
    margin-top: 50px;
  }
  button {
    margin-top: 20px;
    width: 15%;
    cursor: pointer;
    background: #6db819;
    border: 0;
    border-radius: 2px;
    color: #fff;
    cursor: pointer;
    display: inline-block;
    font-weight: 700;
    letter-spacing: 0;
    line-height: 1.22222222em;
    position: relative;
    text-decoration: none;
    font-size: 15px;
    padding: 10px 0 10px;
    &:hover {
      background: #528b13;
    }
  }
</style>