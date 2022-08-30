import React, { useContext } from 'react';
import AppContext from '../context/AppContext';

function Filters() {
  const {
    handleNameFilter,
    nameFilter,
    filterByNumericValues: { column, comparison, value },
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
  } = useContext(AppContext);
  return (
    <div>
      <div>
        <h1>Projeto Star Wars</h1>
        <input
          data-testid="name-filter"
          type="text"
          placeholder="Pesquisar"
          value={ nameFilter }
          name="test"
          onChange={ handleNameFilter }
        />
      </div>

      <label htmlFor="coluna">
        Coluna
        <select
          name="coluna"
          id="coluna"
          data-testid="column-filter"
          value={ column }
          onChange={ handleInputsFilters }
        >
          {collumItens.map((e) => (
            <option key={ e } value={ e }>
              {e}
            </option>
          ))}
        </select>
      </label>

      <label htmlFor="range">
        Operador
        <select
          name="range"
          id="range"
          data-testid="comparison-filter"
          value={ comparison }
          onChange={ handleInputsFilters }
        >
          <option value="maior que">maior que</option>
          <option value="menor que">menor que</option>
          <option value="igual a">igual a</option>
        </select>
      </label>

      <label htmlFor="numRange">
        Numero do Operador
        <input
          data-testid="value-filter"
          type="number"
          min="0"
          id="numRange"
          name="numRange"
          value={ value }
          onChange={ handleInputsFilters }
        />
      </label>

      <button
        data-testid="button-filter"
        type="button"
        onClick={ handleClickFilter }
      >
        Filtrar
      </button>

      {usedFiltersInput.map((e) => (
        <div key={ e.column } data-testid="filter">
          <span>{`${e.column} ${e.comparison} ${e.value}`}</span>
          <button
            onClick={ removeOneFilter }
            name={ e.column }
            type="button"
          >
            { `Remover-${e.column}` }
          </button>
        </div>
      ))}

      <div>
        <label htmlFor="odernation">
          Ordenar
          <select
            data-testid="column-sort"
            name="odernation"
            id="odernation"
            value={ sortParam }
            onChange={ handleSortParam }
          >
            <option value="orbital_period">orbital_period</option>
            <option value="diameter">diameter</option>
            <option value="rotation_period">rotation_period</option>
            <option value="surface_water">surface_water</option>
            <option value="population">population</option>
          </select>
        </label>

        <label htmlFor="ASC">
          Ascendente
          <input
            data-testid="column-sort-input-asc"
            type="radio"
            id="ASC"
            name="sortDirection"
            value="ASC"
            onChange={ handleSortDirection }
          />
        </label>

        <label htmlFor="DESC">
          Descendente
          <input
            data-testid="column-sort-input-desc"
            type="radio"
            name="sortDirection"
            id="DESC"
            value="DESC"
            onChange={ handleSortDirection }
          />
        </label>

        <button
          data-testid="column-sort-button"
          type="button"
          onClick={ handleSort }
        >
          Ordenar
        </button>
      </div>

      <button
        data-testid="button-remove-filters"
        type="button"
        onClick={ removeAllFilters }
      >
        Remover Filtros
      </button>
    </div>
  );
}

export default Filters;
