import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/Home/HomeView.vue'
import AddOfferView from "../views/AddOffer/AddOfferView.vue"
import SearchResults from "../views/SearchResults.vue"
import OfferDetails from "../views/OfferDetails/OfferDetails.vue"

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
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
  },
  {
    path: "/offer/:id",
    name: "offer",
    component: OfferDetails,
    props: true
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
