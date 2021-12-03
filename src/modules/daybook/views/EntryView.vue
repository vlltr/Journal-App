<template>
  <div class="entry-title d-flex justify-content-between p-2">
      <div>
          <span class="text-success fs-3 fw-bold">{{ getDayMonthYear.day }}</span>
          <span class="mx-1 fs-3">{{ getDayMonthYear.month }}</span>
          <span class="mx-2 fs-4 fw-light">{{ getDayMonthYear.yearDay }}</span>
      </div>
      <div>
          <button class="btn btn-danger mx-2">
              Delete
              <i class="fa fa-trash-alt"></i>
          </button>

            <button class="btn btn-secondary">
              Upload
              <i class="fa fa-upload"></i>
          </button>
      </div>
  </div>

  <hr>

  <div class="d-flex flex-column px-3 h-75">
      <textarea placeholder="What's Happening?" v-model="entry.text"></textarea>
  </div>

  <Fab icon="fa-save" />

  <img 
    src="https://miro.medium.com/max/1400/1*mtGIfXRPG2FG_zbKJhwWzA.png" 
    alt="Image"
    class="img-thumbnail">
</template>

<script>

import { defineAsyncComponent } from 'vue'
import { mapGetters } from 'vuex'
import getDayMonthYear from '../helpers/getDayMonthYear'

export default {
    props: {
        id: {
            type: String,
            required: true,
        }
    },
    components: {
        Fab: defineAsyncComponent(() => import('@/modules/daybook/components/Fab.vue'))
    },
    data(){
        return { 
            entry: null
         }
    },
    computed:{
        ...mapGetters('journal',['getEntryById']),
        getDayMonthYear() {
            const { day, month, yearDay } = getDayMonthYear(this.entry.date)

            return { day, month, yearDay}
        }
    },
    methods: {
        loadEntry(){
            const entry = this.getEntryById( this.id )
            //console.log(entry)
            if( !entry ) this.$router.push({ name: 'no-entry' })

            this.entry = entry
        }
    },
    created(){
        // console.log(this.$route.params.id)
        this.loadEntry()
    }

}
</script>

<style lang="scss" scoped>

textarea {
    border: none;
    font-size: 20px;
    height: 100px;

    &:hover{
        outline: none;
    }
}

img {
    bottom: 150px;
    box-shadow: 0px 5px 10px rgba($color: #000000, $alpha: 0.2);
    position: fixed;
    right: 20px;
    width: 200px;
}
</style>