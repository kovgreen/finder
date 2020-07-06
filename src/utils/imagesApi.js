export const fetchImages = (query = "", page = 1) => {
  return fetch(
    `https://pixabay.com/api/?q=${query}&page=${page}&key=16070061-e558bf4629394a30a7b45ae97&image_type=photo&orientation=horizontal&per_page=12`
  )
    .then(res => new Promise(resolve => setTimeout(() => resolve(res), 300))) //for testing loader-spinner
    .then(res => res.json())
    .then(data => data.hits);
};

export { fetchImages as default };
