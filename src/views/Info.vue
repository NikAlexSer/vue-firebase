<template>
  <div class="home">
    <div class="main">
      <h1>Личный кабинет</h1>
      <router-link to="/home">Главная</router-link>
    </div>
    <div class="info">
        <div class="info-row">
            <div class="info-row-name">Имя пользователя: </div>
            <div>{{this.user.name ? this.user.name : '-'}}</div>
            <div class="info-edit">
                <input type="text" v-model="user.name" placeholder="Имя">
            </div>
        </div>
        <div class="info-row">
            <div class="info-row-name">Возраст: </div>
            <div>{{this.user.age ? this.user.age : '-'}}</div>
            <div class="info-edit">
                <input type="text" v-model="user.age" placeholder="Возраст">
            </div>
        </div>
        <div class="info-row">
            <div class="info-row-name">Email: </div>
            <div>{{this.user.email ? this.user.email : '-'}}</div>
            <div class="info-edit">
                <input type="text" v-model="user.email" placeholder="Email" disabled>
            </div>
        </div>
        <div class="info-row">
            <div class="info-row-name">Телефон: </div>
            <div>{{this.user.phone ? this.user.phone : '-'}}</div>
            <div class="info-edit">
                <input type="text" v-model="user.phone" placeholder="Телефон">
            </div>
        </div>
        <div class="info-row">
            <div class="info-row-name">Интересы: </div>
            <div><ul>
                <li v-for="item in user.interests">
                    <span>{{item}}</span>
                </li>
                {{user.interests ? '' : '-'}}
            </ul></div>
            <div class="info-edit">
                <div class="interests">
                    Интересы:
                    <div v-for="item in interests">
                        <input type="checkbox" v-model="interestsNew" :value="item" :name="item" :checked="user.interests ? user.interests.indexOf(item) : false">
                        <label :for="item">{{item}}</label>
                    </div>
                </div>
                <div class="wants">
                    Хотел бы изучить:
                    <div v-for="item in wants">
                        <input type="checkbox" v-model="wantsNew" :value="item" :name="item" :checked="user.wanttolearn ? user.wanttolearn.indexOf(item) : false">
                        <label :for="item">{{item}}</label>
                    </div>
                </div>
            </div>
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
        
        <button @click="save">Сохранить</button>
    </div>
  </div>
</template>

<script>
import firebase from 'firebase'
import BtnPanelCabinet from '@/components/BtnPanelCabinet.vue'
import db from '../main'
import store from '../store'

export default {
  name: 'Info',
  data() {
    return {
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
  created () {
    db.collection('users').get().then((querySnapshot) => {
        let currentUser = store.state.currentUser
        let userInfo = ''
        querySnapshot.forEach((doc) => {
            this.id = doc.id
            if (doc.data().email == currentUser) {
                console.log(doc.data().email)
                this.user = userInfo = doc.data();
            }
        }) 
    })
  },
  methods: {
      save() {
          console.log(this.user)
          this.user.interests = this.interestsNew
          this.user.wanttolearn = this.wantsNew
          db.collection('users').doc(this.id).set(this.user)
      }
  }
}
</script>

<style lang="scss" scoped>
  .info {
      margin-top: 30px;
      margin-left: 50px;
      font-size: 18px;
      text-align: left;
      position: relative;
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