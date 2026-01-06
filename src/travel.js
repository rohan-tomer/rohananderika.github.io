import { mount } from 'svelte'
import './main.css'
import Travel from './Travel.svelte'

// Get the current path from the browser
const path = window.location.pathname

const app = mount(Travel, {
  target: document.getElementById('app'),
  props: {
    url: path // Pass the current URL to the router
  }
})

export default app