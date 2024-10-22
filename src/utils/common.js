export const updateFavourites = (id, favourites) => {
  if (favourites.includes(id)) {
    return favourites.filter((carId) => carId !== id);
  } else {
    return [...favourites, id];
  }
};

export const checkFavourites = (id, favourites) => {
  return favourites?.includes(id) ? "#fa3e5f" : "grey";
};
