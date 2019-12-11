<template>
  <section class="home-main-container">
    <div class="home">
      <Video />
      <div class="center-text">
        <h2>WHAT GETS YOU MOVING?</h2>
        <h3>Sportivity is the easiest way to find activities and people nearby.</h3>
        <router-link class="btn-explore" to="/explore">Explore</router-link>
      </div>
    </div>

    <div class="categories-container">
      <div class="submain-header">
        <h2>Discover</h2>
      </div>
      <div class="categories">
        <CategoryItem :category="category" v-for="category in categories" :key="category.name" />
      </div>
    </div>
  </section>
</template>


<script>
import Video from "../components/Video";
import SocketService from "../services/SocketService";
import CategoryItem from "../components/CategoryItem";

export default {
  name: "home",
  data() {
    return {
      categories: [
        {
          name: "soccer",
          imgUrl:
            "https://upload.wikimedia.org/wikipedia/commons/b/b9/Football_iu_1996.jpg"
        },
        {
          name: "basketball",
          imgUrl:
            "https://cdn.vox-cdn.com/thumbor/bSTk8WcbM2GtJttReLLsHnudFqg=/0x0:4962x3308/1200x800/filters:focal(1577x516:2369x1308)/cdn.vox-cdn.com/uploads/chorus_image/image/65753143/1189031820.jpg.0.jpg"
        },
        {
          name: "volleyball",
          imgUrl:
            "https://img.evbuc.com/https%3A%2F%2Fcdn.evbuc.com%2Fimages%2F76865855%2F260978928425%2F1%2Foriginal.20191015-134331?w=1000&auto=compress&rect=0%2C279%2C2048%2C1024&s=d2523cd3e553bc9f63f2b3088194b70c"
        },
        {
          name: "tennis",
          imgUrl:
            "https://images.unsplash.com/photo-1560012057-4372e14c5085?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=667&q=80"
        },
        {
          name: "workout",
          imgUrl:
            "https://imageresizer.static9.net.au/enWGvmkwg7krLSHuoKpjXZjPnTE=/600x338/smart/https%3A%2F%2Fprod.static9.net.au%2F_%2Fmedia%2FNetwork%2FImages%2F2017%2F04%2F24%2F14%2F02%2F170424coach_workout.jpg"
        },
        {
          name: "dance",
          imgUrl:
            "https://www.thewrap.com/wp-content/uploads/2019/10/Juliet-Doherty-audition-2-PC-JoBee.jpg"
        },
        {
          name: "cycling",
          imgUrl:
            "https://images.unsplash.com/photo-1541625602330-2277a4c46182?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&w=1000&q=80"
        },
        {
          name: "running",
          imgUrl:
            "https://inteng-storage.s3.amazonaws.com/img/iea/V0OyzMNpGQ/sizes/running-band-technique_resize_md.jpg"
        },
        {
          name: "climbing",
          imgUrl:
            "https://contents.mediadecathlon.com/p1342556/k$737ed177d88aa6b117944ff4122dc143/edge-adult-climbing-and-mountaineering-harness-orange-and-yellow.jpg?&f=800x800"
        },
        {
          name: "yoga",
          imgUrl:
            "https://images.unsplash.com/photo-1518611012118-696072aa579a?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60"
        },
        {
          name: "pool",
          imgUrl:
            "https://images2.minutemediacdn.com/image/upload/c_crop,h_1125,w_2000,x_0,y_29/f_auto,q_auto,w_1100/v1557336494/shape/mentalfloss/582807-steevy84-istock-456906257.jpg"
        },
        {
          name: "poker",
          imgUrl:
            "https://www.sciencenews.org/wp-content/uploads/2019/07/071019_MT_poker-ai_feat.jpg"
        }
      ]
    };
  },
  components: {
    CategoryItem,
    Video
  },
  async created() {
    const activities = this.$store.activities;
    const user = this.$store.getters.loggedinUser;
    if (!user) SocketService.activityConnect(activities, user);
  }
};
</script>