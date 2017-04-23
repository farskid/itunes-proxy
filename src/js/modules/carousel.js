const carousel = (carouselElem) => {
  const $next = $('.control--next', carouselElem)
  const $prev = $('.control--prev', carouselElem)



  $next.on('click', () => {
    const {activeItem, nextItem} = calculateCarouselItems(carouselElem)
    activeItem.removeClass('active')
    nextItem.addClass('active')
  })

  $prev.on('click', () => {
    const {activeItem, prevItem} = calculateCarouselItems(carouselElem)
    activeItem.removeClass('active')
    prevItem.addClass('active')
  })
}

const calculateCarouselItems = (carouselElem) => {
  const activeItem = $('.carousel__item.active')
  const nextItem = activeItem.next().length ? activeItem.next() : $('.carousel__inner', carouselElem).children('.carousel__item').first()
  const prevItem = activeItem.prev().length ? activeItem.prev() : $('.carousel__inner', carouselElem).children('.carousel__item').last()
  return {
    activeItem,
    nextItem,
    prevItem
  }
}

export default carousel