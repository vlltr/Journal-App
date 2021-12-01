<template>
  <div class="entry-container mb-3 pointer p-2">
      <!--Title-->
      <div class="entry-title d-flex">
        <span class="text-success fs-5 fw-bold">1</span>
        <span class="mx-1 fs-5">Dic</span>
        <span class="mx-2 fs-5 fw-light">2021</span>
      </div>

      <div class="entry-description">
          Officia laborum laboris Lorem nostrud occaecat do eiusmod velit quis in quis cillum qui commodo. Consequat pariatur excepteur sint et anim cillum eu ad officia elit laboris tempor.
      </div>
  </div>
</template>

<script>
export default {

}
</script>

<style lang="scss" scoped>
.entry-container {
    border-bottom: 1px solid #2c3e50;
    transition: 0.2s all ease-in;

    &:hover{
        background: lighten($color: grey, $amount: 45);
        transition: 0.2s all ease-in;
    }

    .entry-description {
        font-size: 12px;
    }
}
</style>