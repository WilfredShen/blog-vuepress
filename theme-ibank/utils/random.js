export const shuffle = list => {
  if (!list.length) return list;
  let currentIndex = list.length;
  while (currentIndex--) {
    const randomIndex = Math.floor(Math.random() * (currentIndex + 1));
    [list[currentIndex], list[randomIndex]] = [list[randomIndex], list[currentIndex]];
  }
  return list;
};
