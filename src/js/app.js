import jQuery from  "jquery"
import exposeToWindow from './expose'

import {toggleCarousel, fetchCarouselItems} from './DOM'


exposeToWindow('app', {
  jQuery,
  toggleCarousel,
  init: () => {
    const $ = jQuery
    window.$ = jQuery

    $(document).on('modal-in', () => {
      fetchCarouselItems()
    })
  }
})