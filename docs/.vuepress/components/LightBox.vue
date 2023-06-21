<template>
  <span @click="showImage" class="handle-click">
    <slot />
  </span>
  <!-- <vue-easy-lightbox
    ref="lightboxRef"
    scrollDisabled
    :escDisabled="true"
    :moveDisabled="false"
    :zoomScale="0.3"
    :scale="1.3"
    :visible="visible"
    :imgs="imgs"
    @hide="handleHide"
  ></vue-easy-lightbox> -->
  <FsLightbox :toggler="visible" :sources="[imgs]" :onClose="handleHide" />
</template>

<script>
// import VueEasyLightbox from "vue-easy-lightbox"
import FsLightbox from "fslightbox-vue/v3"

export default {
  components: {
    // VueEasyLightbox,
    FsLightbox,
  },
  data() {
    return {
      visible: false,
    }
  },
  props: ["imgs"],
  mounted() {},
  methods: {
    showImage() {
      this.visible = !this.visible
    },
    handleHide() {
      // this.visible = false
    },
  },
}
</script>

<style lang="scss">
.handle-click {
  cursor: pointer;
  color: var(--c-brand);
  font-weight: 500;
  &:hover {
    text-decoration: underline;
  }
}
</style>