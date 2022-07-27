<template>
  <br><br>
  <div style="min-height: 100vh;">
    <div class="h-100 d-flex flex-column justify-content-center align-items-center" style="max-width:95%;margin:0 auto">
      <h1>Gym Program</h1>
      <br><br>
      <HomeCarousel v-if="programList?.length<1"/>
      <div class="card mb-3 w-100" v-for="(exercise,i) in programList" :key="i" @click="handleShow(exercise)" style="max-width: 800px; max-height: 200px">
        <div class="row g-0">
          <div class="col-md-4">
            <img
              src="https://thumbs.dreamstime.com/b/cartoon-background-gym-room-hand-drawn-fitness-center-interior-fitness-79995047.jpg"
              alt="Exercise Image"
              class="img-fluid rounded-start"
              width="125"
              height="125"
            />
          </div>
          <div class="col-md-8">
            <div class="card-body">
              <h5 class="card-title">{{exercise.name.replace(/\w+/g,function(w){return w[0].toUpperCase() + w.slice(1).toLowerCase();})}}</h5>
              <p class="card-text">
                <small class="text-muted">{{exercise.target.replace(/\w+/g,function(w){return w[0].toUpperCase() + w.slice(1).toLowerCase();})}}</small>
              </p>
              <p class="card-text">
                <va-badge :text="exercise.equipment" color="success" />
              </p>
            </div>
          </div>
        </div>
      </div>
      <va-modal v-model="showModal" v-if="exercise" size="large" no-padding>
        <template #content>
          <va-image :ratio="0.75" :src="exercise.gifUrl" />
          <va-card-actions>
            <va-button flat @click="showModal=false" text-color="#acb5be">Close</va-button>
            <va-button @click="removeExercise(exercise)" color="danger">Remove Exercise</va-button>
          </va-card-actions>
        </template>
      </va-modal>
    </div>
  </div>
</template>
<script setup lang="ts">
import { ExerciseResultType } from '@/types/exercise-types'
import { ref, Ref } from 'vue'
import { useToast } from 'vuestic-ui'
import HomeCarousel from '../components/HomeCarousel.vue'
const { init } = useToast()
const exercise: Ref<ExerciseResultType|undefined> = ref(undefined)
const showModal: Ref<boolean> = ref(false)
const programList: Ref<ExerciseResultType[]> = ref(JSON.parse(localStorage.getItem('program')))
function handleShow(newExercise: ExerciseResultType): void {
  exercise.value = newExercise
  showModal.value = !showModal.value
}
function removeExercise(exerciseToDelete: ExerciseResultType) {
  init('Removing...')
  let program: ExerciseResultType[] = programList.value
  program = program.filter((exercise) => exercise !== exerciseToDelete)
  localStorage.setItem('program', JSON.stringify(program))
  programList.value = program
  init({ message: 'Success!', color: 'success' })
  showModal.value = false
}
</script>
