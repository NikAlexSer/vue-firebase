<template>
  <div class="home">
    <div class="main">
      <h1>Чаты</h1>
      <router-link to="/home">Главная</router-link>
    </div>
    <div class="container">
        <div class="messaging">
            <div class="inbox_msg">
                <div class="inbox_people">
                    <div class="headind_srch">
                        <div class="recent_heading">
                            <h4>Последние</h4>
                        </div>
                    </div>
                    <div v-for="chat in allChats" class="inbox_chat">
                        <div class="chat_list" @click="setActive(chat.to)" :class="chatWith && chatWith === chat.to ? 'active_chat' : ''">
                            <div class="chat_people">
                                <div class="chat_img"> <img src="https://ptetutorials.com/images/user-profile.png" alt="sunil"></div>
                                <div class="chat_ib">
                                    <h5>{{chat.to}}<span class="chat_date">{{chat.createdAt ? (new Date(1000 * chat.createdAt.seconds)).getDate() + '.' +
                                            ((new Date(1000 * chat.createdAt.seconds)).getMonth()+1) + ' - ' + 
                                            (new Date(1000 * chat.createdAt.seconds)).getHours() + ':' +
                                            (new Date(1000 * chat.createdAt.seconds)).getMinutes() + ':' +
                                            (new Date(1000 * chat.createdAt.seconds)).getSeconds() : 'Не было сообщений'
                                            }}</span></h5>
                                    <p>
                                        {{chat.message}}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="mesgs">
                    <div class="msg_history">
                        <div v-for="message in messages" class="message-cont">
                            <div :class="message.authUser === authUser ? 'sent_msg' : 'received_msg'">
                                <div>
                                    <p>{{message.message}}</p>
                                    <span class="time_date">{{(new Date(1000 * message.createdAt.seconds)).getDate() + '.' +
                                        ((new Date(1000 * message.createdAt.seconds)).getMonth()+1) + '.' + 
                                        (new Date(1000 * message.createdAt.seconds)).getFullYear() + ' - ' +
                                        (new Date(1000 * message.createdAt.seconds)).getHours() + ':' +
                                        (new Date(1000 * message.createdAt.seconds)).getMinutes() + ':' +
                                        (new Date(1000 * message.createdAt.seconds)).getSeconds()
                                        }} | {{message.authUser}}
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="type_msg">
                        <div class="input_msg_write">
                        <input @keyup.enter="saveMessage" v-model="message" type="text" class="write_msg" placeholder="Сообщение..." />
                        <button @click="saveMessage" class="msg_send_btn" type="button"><i class="fa fa-paper-plane-o" aria-hidden="true"></i></button>
                        </div>
                    </div>
                </div>
            </div>     
        </div>
    </div>
  </div>
</template>

<script>
import store from '../store'
import { all } from 'q';
import { auth } from 'firebase';


export default {
  name: 'chats',
  data() {
    return {
      message: null,
      messages: [],
      authUser: {},
      to: {},
      allChats: [],
      chatWith: null
    }
  },
  methods: {
    setActive(user) {
        store.commit('chatWith', user)
        this.chatWith = user,
        this.fetchMessages();
    },
    saveMessage() {
      //save to firestore
      db.collection('chat').add({
        message: this.message,
        createdAt: new Date(),
        authUser: this.authUser,
        to: store.state.chatting
      })
      this.message = null
    },
    fetchMessages() {
      db.collection('chat').orderBy('createdAt').onSnapshot((querySnapshot) => {
        let allMessages = [];
        let allChats = [];
        let included = '';
        querySnapshot.forEach(doc => {
            if (doc.data().to === store.state.chatting && doc.data().authUser === store.state.currentUser || doc.data().authUser === store.state.chatting && doc.data().to === store.state.currentUser) {
                 allMessages.push(doc.data())
            }
        });

        let temp = querySnapshot.docs.reverse()
        temp.forEach(doc => {
            allChats.forEach(item => {
                if (item.from === this.authUser) {
                    console.log(included)
                    included = true
                    return
                }
            })
            if (doc.data().to === this.authUser && !included) {
                allChats.push({
                    from: this.authUser,
                    to: doc.data().authUser,
                    message: doc.data().authUser + ' - ' + doc.data().message,
                    createdAt: doc.data().createdAt
                })
            }
            else if (doc.data().authUser === this.authUser  && !included) {
                allChats.push({
                    from: this.authUser,
                    to: doc.data().to,
                    message: doc.data().authUser + ' - ' + doc.data().message,
                    createdAt: doc.data().createdAt
                })
            }
        })

        this.messages = allMessages;
        console.log('ALALALALA', allChats)
        allChats.length ? this.allChats = allChats : ''
       
      })
    }
  },
  created() {
      this.authUser = store.state.currentUser
      this.chatWith = store.state.chatting
      this.chatWith ? this.allChats.push({
            from: this.authUser,
            to: this.chatWith,
            message: 'Empty',
            createdAt: 0
        }) : ''
      console.log(this.allChats)
      this.fetchMessages();
       console.log(this.allChats)
  }
}


</script>


<style scopped>
.message-cont {
    display: block;
    width: 100%;
}
.main {
    padding-bottom: 20px;
    border-bottom: 1px solid #2c3e50;
  }


  .container{max-width:1170px; margin:auto;}
img{ max-width:100%;}
.inbox_people {
  background: #f8f8f8 none repeat scroll 0 0;
  float: left;
  overflow: hidden;
  width: 40%; border-right:1px solid #c4c4c4;
}
.inbox_msg {
  border: 1px solid #c4c4c4;
  clear: both;
  overflow: hidden;
}
.top_spac{ margin: 20px 0 0;}


.recent_heading {float: left; width:40%;}
.srch_bar {
  display: inline-block;
  text-align: right;
  width: 60%; padding:
}
.headind_srch{ padding:10px 29px 10px 20px; overflow:hidden; border-bottom:1px solid #c4c4c4;}

.recent_heading h4 {
  color: #05728f;
  font-size: 21px;
  margin: auto;
}
.srch_bar input{ border:1px solid #cdcdcd; border-width:0 0 1px 0; width:80%; padding:2px 0 4px 6px; background:none;}
.srch_bar .input-group-addon button {
  background: rgba(0, 0, 0, 0) none repeat scroll 0 0;
  border: medium none;
  padding: 0;
  color: #707070;
  font-size: 18px;
}
.srch_bar .input-group-addon { margin: 0 0 0 -27px;}

.chat_ib h5{ font-size:15px; color:#464646; margin:0 0 8px 0;}
.chat_ib h5 span{ font-size:13px; float:right;}
.chat_ib p{ font-size:14px; color:#989898; margin:auto}
.chat_img {
  float: left;
  width: 11%;
}
.chat_ib {
  float: left;
  padding: 0 0 0 15px;
  width: 88%;
}

.chat_people{ overflow:hidden; clear:both;}
.chat_list {
  border-bottom: 1px solid #c4c4c4;
  margin: 0;
  padding: 18px 16px 10px;
}
.inbox_chat { height: 550px; overflow-y: scroll;}

.active_chat{ background:#ebebeb;}

.incoming_msg_img {
  display: inline-block;
  width: 6%;
}
.received_msg {
  display: inline-block;
  padding: 0 0 0 10px;
  vertical-align: top;
  width: 92%;
 }
 .received_withd_msg p {
  background: #ebebeb none repeat scroll 0 0;
  border-radius: 3px;
  color: #646464;
  font-size: 14px;
  margin: 0;
  padding: 5px 10px 5px 12px;
  width: 100%;
}
.time_date {
  color: #747474;
  display: block;
  font-size: 12px;
  margin: 8px 0 0;
}
.received_withd_msg { 
    width: 57%;
    display: block;
}
.mesgs {
  float: left;
  padding: 30px 15px 0 25px;
  width: 60%;
}

 .sent_msg p {
  background: #528b13 none repeat scroll 0 0;
  border-radius: 3px;
  font-size: 14px;
  margin: 0; color:#fff;
  padding: 5px 10px 5px 12px;
  width:100%;
}
.received_msg p {
  background: #6db819 none repeat scroll 0 0;
  border-radius: 3px;
  font-size: 14px;
  margin: 0; color:#fff;
  padding: 5px 10px 5px 12px;
  width:100%;
}
.outgoing_msg{ overflow:hidden; margin:26px 0 26px;}
.sent_msg {
  float: right;
  width: 51%;
}
.received_msg {
    float: left;
     width: 51%;
}
.input_msg_write input {
  background: rgba(0, 0, 0, 0) none repeat scroll 0 0;
  border: medium none;
  color: #4c4c4c;
  font-size: 15px;
  min-height: 48px;
  width: 100%;
}

.type_msg {border-top: 1px solid #c4c4c4;position: relative;}
.msg_send_btn {
  background: #05728f none repeat scroll 0 0;
  border: medium none;
  border-radius: 50%;
  color: #fff;
  cursor: pointer;
  font-size: 17px;
  height: 33px;
  position: absolute;
  right: 0;
  top: 11px;
  width: 33px;
}
.messaging { padding: 0 0 50px 0;}
.msg_history {
  height: 516px;
  overflow-y: auto;
}
</style>