import React from 'react';
import { useStateContext } from '../../contexts/ContextProvider';
import { ChartsHeader } from '../../components';

const date1 = new Date('2017, 1, 1');



const Financial = () => {
  const { currentMode } = useStateContext();

  return (
    <div className="m-4 md:m-10 mt-24 p-10 bg-white dark:bg-secondary-dark-bg rounded-3xl">
      <ChartsHeader category="Financial" title="AAPLE Historical" />
      <div className="w-full">
      </div>
    </div>
  );
};

export default Financial;
