<template>
  <div class="category-item" @click="$router.push(`/explore/${category.name}`)">
    <img :src="category.imgUrl" />
    <div class="wrapper">
      <p class="category-name">{{name}}</p>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    category: Object
  },
  computed: {
    name() {
      return this.category.name.toUpperCase();
    }
  }
};
</script>