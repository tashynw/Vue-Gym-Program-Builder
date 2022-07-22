<template>
  <br><br>
  <div class="h-100 d-flex flex-column justify-content-center align-items-center">
    <label>Select Target Muscle</label>
    <select class="form-select" style="max-width: 600px" v-model='chosenTargetMuscle'>
      <option selected value='Tashyn'>Tashyn</option>
      <option v-for="(muscle,i) in targetMuscles" :key="i" :value='muscle'>{{muscle}}</option>
    </select>
    <br>
    <label>Select Equipment</label>
    <select class="form-select" style="max-width: 600px">
    </select>
    <br>
    <button class="btn btn-primary" @click='handleSearch'>Search</button>
    <br>
    <div class="card mb-3 w-100" v-for="(exercise,i) in resultList" :key="i" style="max-width: 800px; max-height: 200px">
      <div class="row g-0">
        <div class="col-md-4">
          <img
            src="image.png"
            alt="Exercise Image"
            class="img-fluid rounded-start"
            height="300"
          />
        </div>
        <div class="col-md-8">
          <div class="card-body">
            <h5 class="card-title">{{exercise.name}}</h5>
            <p class="card-text">
              <small class="text-muted">{{exercise.target}}</small>
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import axios, { AxiosResponse } from 'axios'
import { ref, Ref } from 'vue'
import { targetMuscles } from '@/models/targetMuscles'
type ExerciseResultType = {
  bodyPart: string,
  equipment: string,
  gifUrl: string,
  id: string,
  name: string,
  target: string
}
const chosenTargetMuscle: Ref<string> = ref('')
const resultList: Ref<ExerciseResultType[]> = ref([])
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
      let results = response.data
      results = results.filter((exercise: ExerciseResultType) => exercise.equipment === 'barbell')
      resultList.value = results
    })
}
</script>
