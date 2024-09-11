
let score = 0;

const addPoints = (points) => {
  score += points;
};

const getScore = () => score;

export { addPoints, getScore };
