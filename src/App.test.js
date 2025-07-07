import React from "react";
import BookingFom from "./components/BookingForm";
import { initializeTimes, updateTimes } from "./components/TimeReducer";
import { render, screen, fireEvent } from "@testing-library/react";

// Mock de fetchAPI
// eslint-disable-next-line no-undef
global.fetchAPI = jest.fn();

// eslint-disable-next-line no-undef
describe("initializeTimes", () => {
  // eslint-disable-next-line no-undef
  test("renvoie un tableau non vide des heures", () => {
    // Simule un retour d’heures disponibles
    // eslint-disable-next-line no-undef
    fetchAPI.mockReturnValue(["17:00", "18:00"]);

    const result = initializeTimes();
    // eslint-disable-next-line no-undef
    expect(result).toEqual(["17:00", "18:00"]);
    // eslint-disable-next-line no-undef
    expect(fetchAPI).toHaveBeenCalled(); // Vérifie qu'elle a été appelée
  });
});

// eslint-disable-next-line no-undef
describe("updateTimes", () => {
  // eslint-disable-next-line no-undef
  test("met à jour les heures disponibles en fonction de la nouvelle date", () => {
    // Étape 1 : on simule une date présélectionnée
    const newDate = new Date("2025-06-15");

    // Étape 2 : on simule le résultat attendu de fetchAPI
    const expectedTimes = ["18:00", "19:30"];
    // eslint-disable-next-line no-undef
    fetchAPI.mockReturnValue(expectedTimes);

    // Étape 3 : on appelle la fonction avec action
    const action = {
      type: "updateTimes",
      NewDate: newDate,
    };

    const result = updateTimes([], action);

    // Étape 4 : vérification
    // eslint-disable-next-line no-undef
    expect(result).toEqual(expectedTimes);
    // eslint-disable-next-line no-undef
    expect(fetchAPI).toHaveBeenCalledWith(newDate);
  });

  // eslint-disable-next-line no-undef
  test("renvoie l'état actuel si l'action n'est pas 'updateTimes'", () => {
    const currentState = ["17:00", "18:00"];
    const action = { type: "autreAction" };

    const result = updateTimes(currentState, action);
    // eslint-disable-next-line no-undef
    expect(result).toEqual(currentState);
  });
});


// eslint-disable-next-line no-undef
describe("Validation du formulaire de réservation", () => {
  const mockProps = {
    AvailableTime: "",
    // eslint-disable-next-line no-undef
    setAvalaibleTime: jest.fn(),
    AvailableTimes: ["17:00", "18:00"],
    // eslint-disable-next-line no-undef
    dispatch: jest.fn(),
    // eslint-disable-next-line no-undef
    submitForm: jest.fn(),
  };

  // Tests pour la validation HTML5
  // eslint-disable-next-line no-undef
  describe("Validation HTML5", () => {
    // eslint-disable-next-line no-undef
    test("le champ date doit être requis", () => {
      render(<BookingFom {...mockProps} />);
      const dateInput = screen.getByLabelText(/choose date/i);
      // eslint-disable-next-line no-undef
      expect(dateInput).toHaveAttribute("required");
    });

    // eslint-disable-next-line no-undef
    test("le champ heure doit être requis", () => {
      render(<BookingFom {...mockProps} />);
      const timeSelect = screen.getByLabelText(/choose time/i);
      // eslint-disable-next-line no-undef
      expect(timeSelect).toHaveAttribute("required");
    });

    // eslint-disable-next-line no-undef
    test("le champ nombre de convives doit avoir min=1 et max=10", () => {
      render(<BookingFom {...mockProps} />);
      const guestsInput = screen.getByLabelText(/number of guests/i);
      // eslint-disable-next-line no-undef
      expect(guestsInput).toHaveAttribute("min", "1");
      // eslint-disable-next-line no-undef
      expect(guestsInput).toHaveAttribute("max", "10");
      // eslint-disable-next-line no-undef
      expect(guestsInput).toHaveAttribute("required");
    });

    // eslint-disable-next-line no-undef
    test("le champ occasion doit être requis", () => {
      render(<BookingFom {...mockProps} />);
      const occasionSelect = screen.getByLabelText(/occasion/i);
      // eslint-disable-next-line no-undef
      expect(occasionSelect).toHaveAttribute("required");
    });
  });

  // Tests pour la validation JavaScript
  // eslint-disable-next-line no-undef
  describe("Validation JavaScript", () => {
    // eslint-disable-next-line no-undef
    test("affiche une erreur si la date est dans le passé", () => {
      render(<BookingFom {...mockProps} />);
      const dateInput = screen.getByLabelText(/choose date/i);

      // Simuler une date passée
      fireEvent.change(dateInput, { target: { value: "2023-01-01" } });
      fireEvent.blur(dateInput);

      // eslint-disable-next-line no-undef
      expect(
        screen.getByText(/la date ne peut pas être dans le passé/i)
      ).toBeInTheDocument();
    });

    // eslint-disable-next-line no-undef
    test("affiche une erreur si le nombre de convives est hors limites", () => {
      render(<BookingFom {...mockProps} />);
      const guestsInput = screen.getByLabelText(/number of guests/i);

      // Tester une valeur trop grande
      fireEvent.change(guestsInput, { target: { value: "11" } });
      fireEvent.blur(guestsInput);

      // eslint-disable-next-line no-undef
      expect(
        screen.getByText(/le nombre de convives doit être entre 1 et 10/i)
      ).toBeInTheDocument();
    });

    // eslint-disable-next-line no-undef
    test("n'affiche pas d'erreur pour des entrées valides", () => {
      render(<BookingFom {...mockProps} />);
      const dateInput = screen.getByLabelText(/choose date/i);
      const guestsInput = screen.getByLabelText(/number of guests/i);

      // Entrer des valeurs valides
      const tomorrow = new Date();
      tomorrow.setDate(tomorrow.getDate() + 1);
      const tomorrowStr = tomorrow.toISOString().split("T")[0];

      fireEvent.change(dateInput, { target: { value: tomorrowStr } });
      fireEvent.change(guestsInput, { target: { value: "4" } });
      fireEvent.blur(dateInput);
      fireEvent.blur(guestsInput);

      // eslint-disable-next-line no-undef
      expect(
        screen.queryByText(/la date ne peut pas être dans le passé/i)
      ).not.toBeInTheDocument();
      // eslint-disable-next-line no-undef
      expect(
        screen.queryByText(/le nombre de convives doit être entre 1 et 10/i)
      ).not.toBeInTheDocument();
    });

    // eslint-disable-next-line no-undef
    test("le bouton submit est désactivé si le formulaire est invalide", () => {
      render(<BookingFom {...mockProps} />);
      const submitButton = screen.getByText(/make your reservation/i);

      // Au départ, le formulaire devrait être invalide
      // eslint-disable-next-line no-undef
      expect(submitButton).toBeDisabled();
    });
  });
});
