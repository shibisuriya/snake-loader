export const getContainer = () => {
  const [container] = document.getElementsByClassName("container");
  return container;
};

export const getDimension = (el) => {
  return el.getBoundingClientRect();
};

export const dummyAPI = (url) => {
  return new Promise((resolve, reject) => {
    const min = 5,
      max = 10;
    const randomNumber = generateRandomNumber(min, max);
    setTimeout(() => {
      resolve({
        dummyUrl: 'https://www.google.com'
      });
    }, randomNumber * 1000);
  });
};

const generateRandomNumber = (min, max) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
};
