<script setup>
import { useAnimate, useIntervalFn } from '@vueuse/core'
import { useTemplateRef } from 'vue'
import { ref } from 'vue'
import { rand } from '@vueuse/shared'
import { useSound } from '@vueuse/sound'
import sClicked from '../assets/mouse-click-sound-233951.mp3'
import sChecked from '../assets/pencil_check_mark_1-88805.mp3'


const { play } = useSound(sClicked)
const { checked } = useSound(sChecked)

const checkBoxHandler = () => {
  if (checkBox.value) {
    return checked
  } else {
    console.log("No sound");
  }
}

const el = useTemplateRef('el')

const keyframes = ref([
  { clipPath: 'circle(20% at 0% 30%)' },
  { clipPath: 'circle(20% at 50% 80%)' },
  { clipPath: 'circle(20% at 100% 30%)' },
])

const checkBox = ref(false)

const greetings = [
  'Hello',
  'Hi',
  'Yo!',
  'Hey',
  'Hola',
  'こんにちは',
  'Bonjour',
  'Salut!',
  '你好',
  'Привет',
]
const word = ref('Hello')
const { resume, isActive } = useIntervalFn(() => {
  word.value = greetings[rand(0, greetings.length - 1)]
}, 500)

const {
  isSupported,
  animate,

  // actions

  pause,
  reverse,
  finish,
  cancel,

  // states
  pending,
  playState,
  replaceState,
  startTime,
  currentTime,
  timeline,
  playbackRate,
} = useAnimate(el, keyframes, 1000)

console.log('State: ', pending)
</script>

<template>
  <div class="wrapper">
    <h2 ref="el" style="display: inline-block">About Page</h2>
    <h1>{{ word }}</h1>
    <h1>About Page</h1>


    <div>
      <h3>Try Sound effect on check</h3>
      <label for="checkbox">Check it</label>
      <input type="checkbox" name="checkbox" id="checkbox" v-model="checkBox" @click="checkBoxHandler">

      <button @click="play">Play a sound</button>
      <p>checkbox state: <span>{{ checkBox }}</span></p>
    </div>
    <div>
      <h2>Lorem ipsum dolor sit amet consectetur adipisicing elit. Ullam, incidunt accusamus.</h2>

      <p v-motion-roll-right>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Autem nobis architecto et neque
        earum quod quis rerum, rem odit pariatur voluptatibus mollitia nihil assumenda voluptates,
        inventore nisi fugiat, deserunt ab soluta sunt in! Cupiditate itaque optio quasi, odit,
        magni ea architecto atque amet vel et quidem eius enim nesciunt voluptates! Voluptatibus
        iste aspernatur, nesciunt ut sed vero. Sint a amet maiores ea deserunt dolor sit et saepe
        nulla quod. Accusantium ipsam ipsum quidem magni necessitatibus. Minus quia distinctio
        eligendi nostrum? Repellat eaque laboriosam tempore sequi voluptatem quidem, illum dolor,
        aut ducimus optio odit ab sed a quas dolore. Quasi assumenda asperiores eligendi laudantium
        ea, amet qui, reprehenderit commodi tempore, voluptatum eveniet at quos vero impedit
        recusandae labore ratione vitae quae.
      </p>
    </div>

    <div>
      Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quaerat quam accusamus quae officia
      cumque reprehenderit dignissimos. Blanditiis veritatis quibusdam sit voluptatem? Dolore, quas
      repellendus?
    </div>

    <h3>Lorem ipsum dolor sit amet consectetur adipisicing elit. Reiciendis, ratione!</h3>

    <div>
      <div v-motion-slide-visible-bottom>
        Lorem ipsum, dolor sit amet consectetur adipisicing elit. Cupiditate eaque asperiores
        nesciunt! Nihil debitis consequatur corrupti labore! Impedit molestiae ducimus rerum commodi
        vitae ipsam omnis ex at pariatur animi odio consectetur culpa, in quisquam sunt, labore
        doloremque repellendus sapiente debitis quam velit voluptate explicabo accusantium! Alias
        excepturi impedit sunt quia voluptas voluptate omnis consectetur facere. Reiciendis hic
        molestias excepturi repudiandae? Non consectetur facere, in sit perspiciatis sed obcaecati
        quos! Eius fugit reprehenderit consequuntur veritatis quidem quisquam beatae incidunt esse,
        eaque voluptate animi quam. Possimus debitis esse consequatur minima! Aliquam architecto
        quia beatae aperiam dolores est a unde fuga ea reiciendis?
      </div>
    </div>
  </div>
</template>

<style scoped>
.wrapper {
  margin: 2rem 25%;
  justify-content: start;
  align-items: center;
}

div>div>h1 {
  padding: 2rem 0;
}

div>div>p {
  padding: 2rem 0;
}
</style>
