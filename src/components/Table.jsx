import React, { useContext } from 'react';
import AppContext from '../context/AppContext';

function Table() {
  const { headerTitles, tableInfo } = useContext(AppContext);
  return (
    <table>
      <thead>
        <tr>
          {headerTitles.map((title) => (
            <th key={ title }>{title.split('_').join(' ').toUpperCase()}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {tableInfo
          ? tableInfo.map(
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
              <tr key={ name }>
                <td data-testid="planet-name">{name}</td>
                <td>{rotationPeriod}</td>
                <td>{orbital}</td>
                <td>{diameter}</td>
                <td>{climate}</td>
                <td>{gravity}</td>
                <td>{terrain}</td>
                <td>{water}</td>
                <td>{population}</td>
                <td>{films}</td>
                <td>{created}</td>
                <td>{edited}</td>
                <td>{url}</td>
              </tr>
            ),
          )
          : null}
      </tbody>
    </table>
  );
}

export default Table;
