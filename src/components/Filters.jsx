import React, { useContext } from "react";
import {
  Button,
  Col,
  Container,
  FloatingLabel,
  Form,
  Row,
} from "react-bootstrap";
import AppContext from "../context/AppContext";
import "../styles/Filters.css";

const operators = ["maior que", "menor que", "igual a"];
const odernations = [
  "orbital_period",
  "diameter",
  "rotation_period",
  "surface_water",
  "population",
];

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
    <Container>
      <Row md={12}>
        <FloatingLabel label="Pesquisar" className="mb-3">
          <Form.Control
            data-testid="name-filter"
            type="text"
            placeholder="Alderan"
            value={nameFilter}
            name="test"
            onChange={handleNameFilter}
          />
        </FloatingLabel>
      </Row>

      <Row md={4} className="mb-3">
        <FloatingLabel label="Coluna">
          <Form.Select
            name="column"
            id="coluna"
            data-testid="column-filter"
            value={column}
            onChange={handleInputsFilters}
          >
            {collumItens.map((e) => (
              <option key={e} value={e}>
                {e}
              </option>
            ))}
          </Form.Select>
        </FloatingLabel>

        <FloatingLabel label="Operador">
          <Form.Select
            name="comparison"
            id="range"
            data-testid="comparison-filter"
            value={comparison}
            onChange={handleInputsFilters}
          >
            {operators.map((operator) => (
              <option key={operator} value={operator}>
                {operator}
              </option>
            ))}
          </Form.Select>
        </FloatingLabel>

        <FloatingLabel label="Número do Operador">
          <Form.Control
            data-testid="value-filter"
            type="number"
            min="0"
            id="numRange"
            name="value"
            value={value}
            onChange={handleInputsFilters}
          />
        </FloatingLabel>

        <Button
          variant="warning"
          data-testid="button-filter"
          type="button"
          onClick={handleClickFilter}
        >
          Filtrar
        </Button>
      </Row>

      <Row md={4} className="mb-3">
        <FloatingLabel label="Ordenar">
          <Form.Select
            data-testid="column-sort"
            name="odernation"
            id="odernation"
            value={sortParam}
            onChange={handleSortParam}
          >
            {odernations.map((order) => (
              <option key={order} value={order}>
                {order.split("_").join(" ")}
              </option>
            ))}
          </Form.Select>
        </FloatingLabel>

        <Form.Check
          data-testid="column-sort-input-asc"
          type="radio"
          id="ASC"
          name="sortDirection"
          value="ASC"
          onChange={handleSortDirection}
          label="Ascendente"
        />

        <Form.Check
          data-testid="column-sort-input-desc"
          type="radio"
          name="sortDirection"
          id="DESC"
          value="DESC"
          onChange={handleSortDirection}
          label="Descendente"
        />

        <Button
          variant="success"
          data-testid="column-sort-button"
          type="button"
          onClick={handleSort}
        >
          Ordenar
        </Button>
      </Row>

      <Row className="mb-3">
        <Col md={9} className='filters-group'>
          {usedFiltersInput.map((e) => (
            <Col
              md={9}
              className="filter"
              key={e.column}
              data-testid="filter"
            >
              <span>{`${e.column} ${e.comparison} ${e.value}`}</span>
              <Button
                variant="outline-danger"
                onClick={removeOneFilter}
                name={e.column}
                type="button"
              >
                {`Remover ${e.column} filtro`}
              </Button>
            </Col>
          ))}
        </Col>
        <Col md={3} className='remove-filters'>
          <Button
            variant="danger"
            data-testid="button-remove-filters"
            type="button"
            onClick={removeAllFilters}
          >
            Remover Filtros
          </Button>
        </Col>
      </Row>
    </Container>
  );
}

export default Filters;
