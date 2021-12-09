<template>
  <div v-if="entry">
    <div class="entry-title d-flex justify-content-between p-2">
      <div>
        <span class="text-success fs-3 fw-bold">{{ getDayMonthYear.day }}</span>
        <span class="mx-1 fs-3">{{ getDayMonthYear.month }}</span>
        <span class="mx-2 fs-4 fw-light">{{ getDayMonthYear.yearDay }}</span>
      </div>
      <div>
        <button
          class="btn btn-danger mx-2"
          v-if="entry.id"
          @click="onDeleteEntry"
        >
          Delete
          <i class="fa fa-trash-alt"></i>
        </button>

        <input
          type="file"
          class="form-control"
          @change="onSelectedImage"
          ref="imageSelector"
          v-show="false"
          accept="image/png, image/jpeg"
        />

        <button class="btn btn-secondary" @click="onSelectImage">
          Upload
          <i class="fa fa-upload"></i>
        </button>
      </div>
    </div>

    <hr />

    <div class="d-flex flex-column px-3 h-75">
      <textarea placeholder="What's Happening?" v-model="entry.text"></textarea>
    </div>

    <img
      v-if="entry.picture && !localImage"
      :src="entry.picture"
      alt="Image"
      class="img-thumbnail"
    />

    <img
      v-if="localImage"
      :src="localImage"
      alt="Image"
      class="img-thumbnail"
    />
  </div>
  <Fab icon="fa-save" @on:click="saveEntry" />
</template>

<script>
import { defineAsyncComponent } from "vue";
import { mapGetters, mapActions } from "vuex";
import getDayMonthYear from "../helpers/getDayMonthYear";
import uploadImage from "../helpers/uploadImage";
import Swal from "sweetalert2";

export default {
  props: {
    id: {
      type: String,
      required: true,
    },
  },
  components: {
    Fab: defineAsyncComponent(() =>
      import("@/modules/daybook/components/Fab.vue")
    ),
  },
  data() {
    return {
      entry: null,
      localImage: null,
      file: null,
    };
  },
  computed: {
    ...mapGetters("journal", ["getEntryById"]),
    getDayMonthYear() {
      const { day, month, yearDay } = getDayMonthYear(this.entry.date);

      return { day, month, yearDay };
    },
  },
  methods: {
    ...mapActions("journal", ["updateEntry", "createEntry", "deleteEntry"]),
    loadEntry() {

      let entry;
      if (this.id === "new") {
        entry = {
          text: "",
          date: new Date().getTime(),
        };
      } else {
        entry = this.getEntryById(this.id);
        //console.log(entry)
        if (!entry) return this.$router.push({ name: "no-entry" });
      }
      this.entry = entry;
    },

    async saveEntry() {
      new Swal({
        title: "Loading",
        allowOutsideClick: false,
      });

      Swal.showLoading();

      const picture = await uploadImage(this.file);

      this.entry.picture = picture;

      if (this.entry.id) {
        //Update
        await this.updateEntry(this.entry);
      } else {
        //Create
        const id = await this.createEntry(this.entry);

        //redirect to new entry
        this.$router.push({ name: "entry", params: { id } });
      }

      Swal.fire("Save", "Entry save with success", "success");
      this.file = null;
    },

    async onDeleteEntry() {
      //Delete

      const { isConfirmed } = await Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Yes, delete it!",
        cancelButtonText: "No, cancel!",
        reverseButtons: true,
      });

      if (isConfirmed) {
        new Swal({
          title: "Wait please",
          allowOutsideClick: false,
        });
        Swal.showLoading();
        await this.deleteEntry(this.entry.id);
        this.$router.push({ name: "no-entry" });

        Swal.fire("Delete with success", "", "success");
      }
    },

    onSelectedImage(event) {
      console.log(event.target.files[0]);

      const file = event.target.files[0];

      if (!file) {
        this.localImage = null;
        this.file = null;
        return;
      }

      this.file = file;
      const fr = new FileReader();
      fr.onload = () => (this.localImage = fr.result);
      fr.readAsDataURL(file);
    },
    onSelectImage() {
      this.$refs.imageSelector.click();
    },
  },

  created() {
    // console.log(this.$route.params.id)
    this.loadEntry();
  },

  watch: {
    id() {
      this.loadEntry();
    },
  },
};
</script>

<style lang="scss" scoped>
textarea {
  border: none;
  font-size: 20px;
  height: 100px;

  &:hover {
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