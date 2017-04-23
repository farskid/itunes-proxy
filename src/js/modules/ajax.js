const fetchItems = (options) => {
  const defaultSettings = {
    dataType: 'json',
    success: (res) => console.info('success', res),
    error: (e) => console.error('error', e)
  }
  $.ajax({...defaultSettings, ...options})
}

export default fetchItems