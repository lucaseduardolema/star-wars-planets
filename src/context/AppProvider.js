import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import AppContext from './AppContext';

function AppProvider({ children }) {
  const [apiData, setApiData] = useState({});
  const [headerTitles, setHeaderTitles] = useState([]);
  const [tableInfo, setTableInfo] = useState([]);
  const [nameFilter, setNameFilter] = useState('');
  const [filterByNumericValues, setFilterByNumericValues] = useState({
    column: 'population',
    comparison: 'maior que',
    value: '0',
  });
  const [collumItens, setCollumItens] = useState([
    'orbital_period',
    'diameter',
    'rotation_period',
    'surface_water',
    'population',
  ]);
  const [usedFiltersInput, setUsedFiltersInput] = useState([]);
  const [sortDirection, setSortDirection] = useState('');
  const [sortParam, setSortParam] = useState('orbital_period');
  const [sortedTableInfo, setSortedTableInfo] = useState([]);

  useEffect(() => {
    const getPlanets = async () => {
      const url = 'https://swapi-trybe.herokuapp.com/api/planets/';
      const response = await fetch(url);
      const data = await response.json();
      const filteredData = {
        ...data,
        results: data.results.map((planet) => {
          delete planet.residents;
          return planet;
        }),
      };
      setApiData(filteredData);
      const titles = Object.keys(filteredData.results[0]);
      setHeaderTitles(titles);
      setTableInfo(filteredData.results);
    };
    getPlanets();
  }, []);

  useEffect(() => {
    const fullTable = apiData.results;
    if (nameFilter.length > 0) {
      const filteredInfo = tableInfo.filter(({ name }) => name.includes(nameFilter));
      setTableInfo(filteredInfo);
    } else {
      setTableInfo(fullTable);
    }
  }, [nameFilter]);

  useEffect(() => {
    if (usedFiltersInput.length === 0) {
      setTableInfo(apiData.results);
    }
  }, [usedFiltersInput]);

  useEffect(() => {
    setTableInfo(sortedTableInfo);
  }, [sortedTableInfo]);

  const handleNameFilter = ({ target: { value } }) => setNameFilter(value);

  const handleInputsFilters = ({ target: { value, name } }) => {
    if (name === 'coluna') {
      setFilterByNumericValues({
        ...filterByNumericValues,
        column: value,
      });
    }
    if (name === 'range') {
      setFilterByNumericValues({
        ...filterByNumericValues,
        comparison: value,
      });
    }
    if (name === 'numRange') {
      setFilterByNumericValues({
        ...filterByNumericValues,
        value,
      });
    }
  };

  const removeCollumItem = () => {
    const itemToRemove = filterByNumericValues.column;
    const filteredCollum = collumItens.filter((item) => item !== itemToRemove);
    setCollumItens(filteredCollum);
  };

  const handleClickFilter = () => {
    let filteredInfo;
    const value = Number(filterByNumericValues.value);
    if (filterByNumericValues.comparison === 'maior que') {
      filteredInfo = tableInfo.filter(
        (e) => Number(e[filterByNumericValues.column]) > value,
      );
    }
    if (filterByNumericValues.comparison === 'menor que') {
      filteredInfo = tableInfo.filter(
        (e) => Number(e[filterByNumericValues.column]) < value,
      );
    }
    if (filterByNumericValues.comparison === 'igual a') {
      filteredInfo = tableInfo.filter(
        (e) => Number(e[filterByNumericValues.column]) === value,
      );
    }
    setTableInfo(filteredInfo);
    removeCollumItem();
    setUsedFiltersInput([...usedFiltersInput, filterByNumericValues]);
  };

  const handleSortDirection = ({ target: { value } }) => {
    setSortDirection(value);
  };

  const handleSortParam = ({ target: { value } }) => {
    setSortParam(value);
  };

  const handleSort = () => {
    const stringsParams = tableInfo.filter((e) => Number.isNaN(Number(e[sortParam])));
    const numberParams = tableInfo.filter((e) => !Number.isNaN(Number(e[sortParam])));
    const sortedTable = numberParams.sort((a, b) => {
      if (sortDirection === 'DESC') {
        return Number(b[sortParam] - a[sortParam]);
      }
      return Number(a[sortParam] - b[sortParam]);
    });
    setSortedTableInfo([...sortedTable, ...stringsParams]);
  };

  const removeAllFilters = () => {
    setTableInfo(apiData.results);
    setUsedFiltersInput([]);
  };

  const removeOneFilter = ({ target: { name } }) => {
    const newFilter = usedFiltersInput.filter(({ column }) => column !== name);
    let newTableFiltered = [];
    for (let i = 0; i < newFilter.length; i += 1) {
      const filter = newFilter[i];
      if (filter.comparison === 'maior que') {
        const element = apiData.results.filter(
          (e) => Number(e[filter.column]) > Number(filter.value),
        );
        newTableFiltered = [...newTableFiltered, ...element];
      }
      if (filter.comparison === 'menor que') {
        const element = apiData.results.filter(
          (e) => Number(e[filter.column]) < Number(filter.value),
        );
        newTableFiltered = [...newTableFiltered, ...element];
      }
      if (filter.comparison === 'igual a') {
        const element = apiData.results.filter(
          (e) => Number(e[filter.column]) === Number(filter.value),
        );
        newTableFiltered = [...newTableFiltered, ...element];
      }
    }
    setTableInfo(newTableFiltered);
    // const newTable = apiData.results.filter((e) )
    setUsedFiltersInput(newFilter);
    setCollumItens([...collumItens, name]);
    // console.log(newTable);
  };

  const context = {
    apiData,
    headerTitles,
    tableInfo,
    handleNameFilter,
    nameFilter,
    filterByNumericValues,
    handleInputsFilters,
    handleClickFilter,
    collumItens,
    usedFiltersInput,
    removeAllFilters,
    removeOneFilter,
    handleSortDirection,
    sortParam,
    handleSortParam,
    handleSort,
  };
  return <AppContext.Provider value={ context }>{children}</AppContext.Provider>;
}

AppProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default AppProvider;
