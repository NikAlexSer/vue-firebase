<template>
  <div class="home">
    <div class="main">
      <h1>Личный кабинет</h1>
      <BtnPanelCabinet/>
    </div>
  </div>
</template>

<script>
import firebase from 'firebase'
import BtnPanelCabinet from '@/components/BtnPanelCabinet.vue'
import db from '../main'

export default {
  name: 'Lk',
  components: {
    BtnPanelCabinet
  },
  data() {
    return {
        users: []
    };
  },
  created () {
      db.collection('users').get().then((querySnapshot) => {
        console.log('123213213')
        querySnapshot.forEach((doc) => {
            console.log(doc.data())
            console.log(doc.data().age)
          this.users.push(doc.data().age)
        })
      })
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