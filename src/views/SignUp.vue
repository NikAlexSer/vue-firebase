<template>
    <div class="sign-up">
        <h3>Регистрация</h3>
        <input type="text" v-model="email" placeholder="Email"><br>
        <input type="password" v-model="password" placeholder="Password"><br>
        <button @click="signUp">Регистрация</button>
        <p>Уже есть аккаунт? <router-link to="/login">Войти</router-link></p>
    </div>
</template>

<script>
    import firebase from 'firebase'
    import db from '../main'
    import store from '../store'

    export default {
        name: 'signUp',
        data() {
            return {
                email: '',
                password: ''
            };
        },
        methods: {
            signUp: function() {
                firebase.auth().createUserWithEmailAndPassword(this.email, this.password).then(
                    (user) => {
                        store.commit('currentUser', this.email)
                        localStorage.setItem('currentUser', this.email)
                        db.collection('users').doc(this.email).set({
                            email: this.email,
                            name: '',
                            age: 0,
                            phone: '',
                            interests: [],
                            wanttolearn: []
                        })
                        this.$router.replace('home')
                    },
                    (err) => {
                        alert('Oops. ' + err.message)
                    }
                )
            },
        }
    }
</script>

<style lang="scss" scoped>
    .sign-up {
        margin-top: 40px;
        input {
            margin: 10px 0;
            width: 20%;
            padding: 15px;
        }
        button {
            margin-top: 20px;
            width: 10%;
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
        p {
            margin-top: 40px;
            font-size: 13px;
            a { 
                color: #6db819;
                text-decoration: none;
                cursor: pointer;
                font-size: 1.1em;
                &:hover {
                    color: #528b13;
                }
            }
        }
    }
</style>