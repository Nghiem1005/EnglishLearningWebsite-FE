import React from 'react';
import { ChartsHeader } from '../../components';
import { useStateContext } from '../../contexts/ContextProvider';

const ColorMapping = () => {
  const { currentMode } = useStateContext();

  return (
    <div className="m-4 md:m-10 mt-24 p-10 bg-white dark:bg-secondary-dark-bg rounded-3xl">
      <ChartsHeader category="Color Mappping" title="USA CLIMATE - WEATHER BY MONTH" />
      <div className="w-full">
      </div>
    </div>
  );
};

export default ColorMapping;
