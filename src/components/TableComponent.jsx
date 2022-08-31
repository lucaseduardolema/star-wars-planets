import React, { useContext } from "react";
import AppContext from "../context/AppContext";
import Table from "react-bootstrap/Table";
import { Container } from "react-bootstrap";

function TableComponent() {
  const { headerTitles, tableInfo } = useContext(AppContext);
  return (
    <Container fluid>
      <Table striped bordered hover size="sm" variant="dark" responsive>
        <thead>
          <tr className="align-middle text-center">
            {headerTitles.map((title) => (
              <th key={title}>{title.split("_").join(" ").toUpperCase()}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {tableInfo &&
            tableInfo.map(
              ({
                name,
                rotation_period: rotationPeriod,
                orbital_period: orbital,
                diameter,
                climate,
                gravity,
                terrain,
                surface_water: water,
                population,
                films,
                created,
                edited,
                url,
              }) => (
                <tr className="align-middle text-center" key={name}>
                  <td data-testid="planet-name">{name}</td>
                  <td>{rotationPeriod}</td>
                  <td>{orbital}</td>
                  <td>{diameter}</td>
                  <td className="text-capitalize">{climate}</td>
                  <td className="text-capitalize">{gravity}</td>
                  <td className="text-capitalize ">{terrain}</td>
                  <td>{water}</td>
                  <td>{population}</td>
                  <td>
                    {films.map((film) => (
                      <a href={film}>{`${film
                        .slice(38, 45)
                        .split("/")
                        .join(" ")}, `}</a>
                    ))}
                  </td>
                  <td>{created.slice(0, 10).split("-").reverse().join("/")}</td>
                  <td>{edited.slice(0, 10).split("-").reverse().join("/")}</td>
                  <td>
                    <a href={url}>Visit Planet</a>
                  </td>
                </tr>
              )
            )}
        </tbody>
      </Table>
    </Container>
  );
}

export default TableComponent;
