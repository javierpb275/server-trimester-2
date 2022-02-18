const getPaginationOptions = (query) => {
  const limit = query.limit ? Number(query.limit) : 10;
  const skip = query.skip ? Number(query.skip) : 0;
  const sort = query.sort ? query.sort : "-createdAt";
  return { limit, skip, sort };
};

const getMatch = (query) => {
  const match = {};
  const keys = Object.keys(query);
  const filteredKeys = keys.filter((key) => {
    return key !== "sort" && key !== "skip" && key !== "limit";
  });
  filteredKeys.forEach((key) => {
    if (!isNaN(Number(query[key]))) {
      query[key] = Number(query[key]);
    } else if (query[key] === "true" || query[key] === "false") {
      if (query[key] === "true") {
        query[key] = true;
      } else {
        query[key] = false;
      }
    }
    return (match[key] = query[key]);
  });
  return match;
};

module.exports = {
  getPaginationOptions,
  getMatch
}
