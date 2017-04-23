// All DOM related stuff
import { toggleModal } from './modules/modal'
import fetchItems from './modules/ajax'
import constants from './constants'
import carousel from './modules/carousel'

const toggleCarousel = () => {
  toggleModal(constants.galleryModal)
}

const renderCarouselItems = (items) => {
  items.forEach((item, index) => {
    const { id, descr, item_type, title } = item
    $(constants.galleryModal).find('.carousel__inner').append(
      '<div id="item-' + id + '" class="carousel__item ' + (index === 0 && 'active') + '">' +
        (
          item_type === 'mihanblog' ?
          '<h3>' + descr + '</h3>' :
          '<img src=' + descr + ' alt=' + title + ' />'
        )
      + '</div >'
    )
  })

  // Init carousel after render
  carousel(constants.galleryModal)
}

const fetchCarouselItems = () => {
  fetchItems({
    url: constants.ajax.url,
    success: (res) => {
      const { tagblog } = res
      renderCarouselItems(tagblog)
    },
    error: (e) => {
      alert('مشکلی در دریافت اطلاعات پیش آمده است')
    }
  })
}

export {
  toggleCarousel,
  fetchCarouselItems
}