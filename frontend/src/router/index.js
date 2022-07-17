import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/Home/HomeView.vue'
import AboutView from "../views/AboutView.vue"
import AddOfferView from "../views/AddOffer/AddOfferView.vue"
import SearchResults from "../views/SearchResults.vue"

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/about',
    name: 'about',
    component: AboutView
  },
  {
    path: "/addOffer",
    name: "addOffer",
    component: AddOfferView
  },
  {
    path: "/searchResults",
    name: "searchResults",
    component: SearchResults
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
