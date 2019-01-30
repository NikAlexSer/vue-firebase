<template>
  <div class="home">
    <div class="main">
      <h1>Поиск людей</h1>
      <router-link to="/home">Главная</router-link>
    </div>
    <div v-for="user in users" class="info">
        <div class="info-row">
            <div class="info-row-name">Имя пользователя и email: </div>
            <div>{{user.name ? user.name : '-'}} </div>
            <span>-</span>  
            <div>{{user.email ? user.email : '-'}}</div>
        </div>
        <div class="info-row">
            <div class="info-row-name">Интересы: </div>
            <div><ul>
                <li v-for="item in user.interests">
                    <span>{{item}}</span>
                </li>
                {{user.interests ? '' : '-'}}
            </ul></div>
        </div>
        <div class="info-row">
            <div class="info-row-name">Хотел бы изучить: </div>
            <div><ul>
                <li v-for="item in user.wanttolearn">
                    <span>{{item}}</span>
                </li>
                 {{user.wanttolearn ? '' : '-'}}
            </ul></div>
        </div>
        <button @click="chatWith(user.email)">Чат</button>
    </div>
  </div>
</template>

<script>
import firebase from 'firebase'
import db from '../main'
import store from '../store'

export default {
  name: 'Info',
  data() {
    return {
        users: [],
        id: '',
        user: {
            name: '',
            age: '',
            email: '',
            phone: '',
            interests: [],
            wanttolearn: []
        },
        interests: [
            'Кино', 'Музыка', 'Спорт', 'JS', 'Паяние', 'Токарное дело'
        ],
        interestsNew: [],
        wants: [
            'Катание на лыжах', 'Игра на гитаре', 'Vue', 'Катание на борде', 'Электроника', 'Вождение'
        ],
        wantsNew: []
    };
  },
  methods: {
      chatWith(email) {
          store.commit('chatWith', email)
          this.$router.replace('chats')
      }
  },
  created () {
    db.collection('users').get().then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
            this.users.push(doc.data())
        }) 
        console.log(this.users[0])
    })
  },
}
</script>

<style lang="scss" scoped>
  .info {
      margin-top: 30px;
      padding-left: 50px;
      font-size: 18px;
      text-align: left;
      position: relative;
      border-bottom: 1px solid #2c3e50;
      .info-row {
          margin-bottom: 15px;
          .info-row-name {
            margin-right: 30px;
            font-size: 20px;
            width: 30%;
          }
          div {
              display: inline-block;
              
          }
      }
      .info-edit {
          width: 30%;
          float: right;
          input {
              display: block;
              font-size: 16px;
              padding: 5px;
              width: 90%;
          }
          div {
              display: block;
              input {
                  display: inline-block;
                  width: 10%;
              }
          }
          .interests, .wants {
              margin-bottom: 20px;
          }
      }
  }
  .main {
    border-bottom: 1px solid #2c3e50;
  }
  button {
    margin-top: 20px;
    margin-bottom: 20px;
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