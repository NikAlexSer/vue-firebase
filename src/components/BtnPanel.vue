<template>
  <div class="btn-cont">
    <button @click="search">Поиск людей</button>
    <button @click="lk">Личный кабинет</button>
  </div>
</template>

<script>

export default {
  name: 'BtnPanel',
  methods: {
    search: function() {
        this.$router.replace('search')
    },
    lk: function() {
        this.$router.replace('cabinet')
    }
  }
}
</script>

<style lang="scss" scoped>
    .btn-cont {
        margin: 0 auto;
    }
    button {
        margin-right: 20px; 
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