import { createContext, useState } from "react";
import PropTypes from "prop-types";

export const SoccerFieldsContext = createContext();

export const SoccerFieldsProvider = ({ children, initSoccerFields }) => {
  const [soccerFields, setSoccerFields] = useState(initSoccerFields);
  const [selectedSoccerField, setSelectedSoccerField] = useState(null);

  const value = {
    soccerFields,
    setSoccerFields,
    selectedSoccerField,
    setSelectedSoccerField,
  };

  return (
    <SoccerFieldsContext.Provider value={value}>
      {children}
    </SoccerFieldsContext.Provider>
  );
};

SoccerFieldsProvider.propTypes = {
  children: PropTypes.element.isRequired,
  initSoccerFields: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string,
      position: PropTypes.shape({
        lat: PropTypes.number,
        lng: PropTypes.number,
      }),
      color: PropTypes.string,
    })
  ).isRequired,
};
