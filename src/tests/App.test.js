import React from "react";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import App from "../App";
import testData from "../../cypress/mocks/testData";
import { act } from "react-dom/test-utils";
import userEvent from "@testing-library/user-event";

// global.fetch = jest.fn(() => Promise.resolve({
//   json: () => Promise.resolve(testData),
// }));

describe("Test application", () => {
  test("filters component", async () => {
    jest.spyOn(global, "fetch").mockImplementation(() =>
      Promise.resolve({
        json: () => Promise.resolve(testData)
      })
    );
    await act(async () => {
      render(<App />);
    })
    const numRange = screen.getByRole("spinbutton", {
      name: /numero do operador/i,
    });
    const filter = screen.getByRole("button", { name: /filtrar/i });
    const filterOption = screen.getByRole("combobox", { name: /coluna/i });
    const removeAllFilters = screen.getByRole("button", {
      name: /remover filtros/i,
    });
    const search = screen.getByRole("textbox");
    const operator = screen.getByRole('combobox', {  name: /operador/i})
    const paramOrderFilter = screen.getByRole('combobox', {  name: /ordenar/i})
    const diretionOrderFilterDesc = screen.getByRole('radio', {  name: /descendente/i})
    const diretionOrderFilterAsc = screen.getByRole('radio', {  name: /ascendente/i})
    const orderBtn = screen.getByRole('button', {  name: /ordenar/i})
    
    userEvent.selectOptions(filterOption, 'diameter')
    userEvent.selectOptions(operator, 'menor que')
    fireEvent.change(numRange, { target: { value: "10200" } });
    fireEvent.click(filter);
    
    userEvent.selectOptions(filterOption, 'rotation_period')
    userEvent.selectOptions(operator, 'maior que')
    fireEvent.change(numRange, { target: { value: "20" } });
    fireEvent.click(filter);
    
    userEvent.selectOptions(filterOption, 'surface_water')
    userEvent.selectOptions(operator, 'igual a')
    fireEvent.change(numRange, { target: { value: "100" } });
    fireEvent.click(filter);
    
    const removeSerachParam = screen.getByRole('button', {  name: /remover\-surface_water/i})
    userEvent.click(removeSerachParam)

    fireEvent.click(removeAllFilters);
    fireEvent.change(search, { target: { value: "oo" } });
    
    userEvent.selectOptions(paramOrderFilter, 'surface_water')
    userEvent.click(diretionOrderFilterDesc)
    userEvent.click(orderBtn)

    userEvent.selectOptions(paramOrderFilter, 'orbital_period')
    userEvent.click(diretionOrderFilterAsc)
    userEvent.click(orderBtn)


    global.fetch.mockRestore();
  });

  test("table component", async () => {
    jest.spyOn(global, "fetch").mockImplementation(() =>
      Promise.resolve({
        json: () => Promise.resolve(testData)
      })
    );
    await act(async () => {
      render(<App />);
    })
    const headerName = await screen.findByRole("columnheader", {
      name: /name/i,
    });

    expect(headerName).toBeInTheDocument();

    global.fetch.mockRestore();
  });
});
