<template>
  <h5>Click emojis to remove them.</h5>
  <ul v-auto-animate>
    <li v-for="item in items" :key="item" @click="removeItem(item)">
      {{ item }}
    </li>
  </ul>


  <ul v-auto-animate>
    <li class="name-ani" v-for="(item, i) in posts" :key="i" @click="delComment(item.id)">{{ item.name }}</li>
  </ul>

</template>

<script setup>
import { ref, onMounted } from 'vue'
import axios from 'axios'
import { useFetch } from '@vueuse/core'


const items = ref(["😏", "😐", "😑", "😒", "😕"])
function removeItem(toRemove) {
  items.value = items.value.filter((item) => item !== toRemove)
}

const url = 'https://jsonplaceholder.typicode.com/comments'
const posts = ref([])

const delComment = (userId) => {
  posts.value = posts.value.filter((post) => post.id !== userId)
}

// onMounted(() => {
//   axios.get(url)
//     .then((response) => {
//       console.log("REsponse: ", response.data);

//       posts.value = response.data
//     })
//     .catch((error) => {
//       console.error("Error: ", error)
//     })

// })




</script>

<style scoped>
.name-ani {
  font-size: 18px;
  color: chocolate;
}

.wrapper {
  margin-left: 25%;
}

.comm {
  border: 1px solid saddlebrown;
  padding: 1rem;
  width: 700px;
  margin-bottom: 1rem;
}

.name {
  display: flex;
  justify-content: space-between;

  color: blueviolet;
  font-weight: bolder;
  padding-bottom: 0.35rem;
}

.eml {
  font-size: 14px;
  font-weight: bolder;
  padding-bottom: 0.35rem;
}

.del {
  color: red;
  cursor: pointer;
}
</style>
