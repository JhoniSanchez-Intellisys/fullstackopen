const dummy = (blogs) => {
  return blogs !== null ? 1 : 1;
};

const totalLikes = (blogs) => {
  let total = [];
  blogs.map((el) => {
    total.push(el.likes);
  });
  return total.reduce((accumulator, current) => accumulator + current, 0);
};

const favoriteBlog = (blogs) => {
  let total = [];
  blogs.forEach((el) => {
    console.log(total);
    total.push(el.likes);
  });

  let max = total.sort(function (a, b) {
    return a - b;
  });

  let max1 = max[max.length-1];

  console.log(max);
  const real = blogs.filter((el) => el.likes === max1);
  return real;
};

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
};
