export const getContainer = () => {
  const [container] = document.getElementsByClassName("container");
  return container;
};

export const getDimension = (el) => {
  return el.getBoundingClientRect();
};
