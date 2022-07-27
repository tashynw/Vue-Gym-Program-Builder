<template>
  <br><br>
  <div style="min-height: 100vh;">
    <div class="h-100 d-flex flex-column justify-content-center align-items-center" style="max-width:95%;margin:0 auto">
      <div class="col-md-4">
        <h3>Select Target Muscle</h3>
        <br>
        <select class="form-select" aria-label="Search Target Muscle" style="max-width: 600px" v-model='chosenTargetMuscle'>
          <option v-for="(muscle,i) in targetMuscles" :key="i" :value='muscle'>{{muscle.replace(/\w+/g,function(w){return w[0].toUpperCase() + w.slice(1).toLowerCase();})}}</option>
        </select>
      </div>
      <br>
      <div class="col-md-4">
        <h3>Select Equipment</h3>
        <br>
        <select class="form-select" style="max-width: 600px" v-model='chosenEquipment'>
          <option selected>All</option>
          <option v-for="(gymEquipment,i) in equipment" :key="i" :value='gymEquipment'>{{gymEquipment.replace(/\w+/g,function(w){return w[0].toUpperCase() + w.slice(1).toLowerCase();})}}</option>
        </select>
      </div>
      <br>
      <va-button class="btn btn-primary" @click='handleSearch'>Search</va-button>
      <br>
      <HomeCarousel v-if="resultList?.length<1"/>
      <div class="card mb-3 w-100" v-for="(exercise,i) in resultList" :key="i" @click="handleShow(exercise)" style="max-width: 800px; max-height: 200px">
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
      <va-pagination v-if="resultList?.length>0" v-model="pageNumber" :pages="Math.floor(resultSize/10)" :visible-pages="2"/>
      <br v-if="resultList?.length>0">
      <va-modal v-model="showModal" v-if="exercise" size="large" no-padding>
        <template #content>
          <va-image :ratio="0.75" :src="exercise.gifUrl" />
          <va-card-actions>
              <va-button flat @click="showModal=false" text-color="#acb5be">Close</va-button>
              <va-button color="primary" @click="addToProgram(exercise)">Add to Program</va-button>
          </va-card-actions>
        </template>
      </va-modal>
    </div>
  </div>
</template>

<script lang="ts" setup>
import axios, { AxiosResponse } from 'axios'
import { ref, Ref, watch } from 'vue'
import { targetMuscles } from '@/models/targetMuscles'
import { equipment } from '@/models/equipment'
import { useToast } from 'vuestic-ui'
import { ExerciseResultType } from '@/types/exercise-types'
import HomeCarousel from '../components/HomeCarousel.vue'
// add toast when added
const { init } = useToast()
const chosenTargetMuscle: Ref<string> = ref('')
const chosenEquipment: Ref<string> = ref('')
const resultList: Ref<ExerciseResultType[]> = ref([])
const showModal: Ref<boolean> = ref(false)
const exercise: Ref<ExerciseResultType|undefined> = ref(undefined)
const pageNumber: Ref<number> = ref(1)
const resultSize: Ref<number> = ref(0)
const fullResults: Ref<ExerciseResultType[]> = ref([])
function handleShow(newExercise: ExerciseResultType): void {
  exercise.value = newExercise
  showModal.value = !showModal.value
}
function addToProgram(exercise: ExerciseResultType): void {
  init('Adding to Program...')
  const exerciseToAdd: ExerciseResultType = JSON.parse(JSON.stringify(exercise))
  const programContents: ExerciseResultType[] = JSON.parse(localStorage.getItem('program'))
  if (programContents?.length < 1) {
    localStorage.setItem('program', JSON.stringify([exerciseToAdd]))
    init({ message: 'Success!', color: 'success' })
    showModal.value = false
    return
  }
  if (isPresent(programContents, exerciseToAdd)) {
    init({ message: 'Already on the program', color: 'danger' })
    showModal.value = false
    return
  }
  programContents.push(exerciseToAdd)
  init({ message: 'Success!', color: 'success' })
  showModal.value = false
  return localStorage.setItem('program', JSON.stringify(programContents))
}
function isPresent(exerciseList: ExerciseResultType[], exercise: ExerciseResultType) {
  for (const exerciseItem of exerciseList) {
    if (exerciseItem.id === exercise.id) return true
  }
  return false
}
watch(pageNumber, () => {
  handlePagination()
}, { immediate: true })
function handlePagination() {
  let newResults: ExerciseResultType[] = fullResults.value
  if (pageNumber.value === 1) newResults = newResults.slice(0, (pageNumber.value * 10))
  else newResults = newResults.slice(((pageNumber.value - 1) * 10), ((pageNumber.value) * 10))
  resultList.value = newResults
}
function handleEquipmentFilter() {
  if (chosenEquipment.value === 'All' || chosenEquipment.value === '') return
  let filteredResults: ExerciseResultType[] = fullResults.value
  filteredResults = filteredResults.filter((exercise) => exercise.equipment === chosenEquipment.value)
  fullResults.value = filteredResults
}
async function handleSearch() {
  await axios.get(`https://exercisedb.p.rapidapi.com/exercises/target/${chosenTargetMuscle.value}`,
    {
      headers: {
        'X-RapidAPI-Key': 'fe107ecc6emsh0dc901e6d2953d3p162ee1jsnf21953933c69',
        'X-RapidAPI-Host': 'exercisedb.p.rapidapi.com'
      }
    }
  )
    .then((response: AxiosResponse): void => {
      fullResults.value = response.data
      handleEquipmentFilter()
      resultList.value = fullResults.value
      resultSize.value = fullResults.value.length
      pageNumber.value = 1
      handlePagination()
    })
}
</script>
