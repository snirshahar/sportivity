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

<style scoped lang="scss">
.category-item:before {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  transition: background 0.2s ease;
}
.category-item:hover:before {
  background: rgba(0, 0, 0, 0.2);
}
.category-item {
  position: relative;
  border-radius: 5px;
  overflow: hidden;
  flex: 0 0 22%;
  cursor: pointer;
  height: calc(1140px * calc(22/100));
  margin-bottom: 1.5%;
  margin-left: 1.5%;
  &:hover {
    filter: brightness(100%);
  }
  p {
    color: white;
    margin: 0;
    left: -50%;
    font-weight: bold;
    font-size: 2rem;
    z-index: 1;
  }
  .wrapper {
    position: absolute;
    top: 50%;
    transform: translate(-50%, -50%);
    left: 50%;
  }
}
img {
  width: 100%;
  height: 300px;
}
</style>