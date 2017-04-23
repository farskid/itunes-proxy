const showModal = (modalElem) => {
  $(modalElem).addClass('in')
  // Dispatch a custom modal event
  $(document).trigger('modal-in')
}

const hideModal = (modalElem) => {
  $(modalElem).removeClass('in')
}

const toggleModal = (modalElem) => {
  if ($(modalElem).hasClass('in')) hideModal($(modalElem))
  else showModal($(modalElem))
}

export {
  showModal,
  hideModal,
  toggleModal
}