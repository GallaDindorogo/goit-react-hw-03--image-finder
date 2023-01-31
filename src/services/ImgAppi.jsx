import axios from 'axios';

const KEY = '31994022-24f6d7612a194f8b404d57867';
const instance = axios.create({
  baseURL: `https://pixabay.com/api/?key=${KEY}`,
  params: {
    per_page: 12,
    orientation: 'horizontal',
    image_type: 'photo',
  },
});

const fetchImg = async (q, page = 1) => {
  const { data } = await instance.get('', {
    params: {
      q,
      page,
    },
  });
  return data;
};

export default fetchImg;
