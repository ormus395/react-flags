export let slugToName = (slug) => {
  return slug.split("-").join(" ");
};

export let formatNameForLink = (name) => {
  return name.split(" ").join("-");
};

export let debounce = (callback) => {
  setTimeout(callback, 200);
};
