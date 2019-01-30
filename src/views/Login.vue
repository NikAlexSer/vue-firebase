<template>
    <div class="login">
        <h3>Войти</h3>
        <input type="text" v-model="email" placeholder="Email"><br>
        <input type="password" v-model="password" placeholder="Password"><br>
        <button @click="login">Войти</button>
        <p>Нет аккаунта? <router-link to="/sign-up">Создать новый</router-link></p>
    </div>
</template>

<script>
    import firebase from 'firebase'
    import store from '../store'

    export default {
        name: 'login',
        data() {
            return {
                email: '',
                password: ''
            };
        },
        methods: {
            login: function() {
                firebase.auth().signInWithEmailAndPassword(this.email, this.password).then(
                    (user) => {
                        store.commit('currentUser', this.email)
                        localStorage.setItem('currentUser', this.email)
                        this.$router.replace('home')
                    },
                    (err) => {
                        alert('Opps. ' + err.message)
                    }
                )
            }
        }
    }
</script>

<style lang="scss" scoped>
    .login {
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