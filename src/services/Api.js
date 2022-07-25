function fetchPic(value, page, response) {
  return fetch(
    `https://pixabay.com/api/?key=27573462-7cfd1b03d2f186a851a1b1b26&q=${value}&page=${page}&image_type=photo&per_page=12&orientation=horizontal`
  ).then(res => {
    response(res.ok);
    console.log(res);
    return res.json();
  });
}

const api = {
  fetchPic,
};

export default api;
