const fetchPlanets = async () => {
  try {
    const url = "https://swapi-trybe.herokuapp.com/api/planets/";
    const response = await fetch(url);
    const data = await response.json();
    return data;
  } catch (error) {
    console.log(error);
  }
};

export default fetchPlanets;
