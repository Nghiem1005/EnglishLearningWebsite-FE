import React, { useEffect, useState } from "react";
import Modal from "../../components/Modal/Modal";
import ResultList from "./components/ResultList";
import { useQueryCustom, useDebounce } from "../../hooks";
import { dictionaryService } from "../../services/dictionary";
import HeaderDictionary from "./components/HeaderDictionary";

const DictionaryScreen = ({ isShowModal, setIsShowModal }) => {
  const [value, setValue] = useState("");
  const searchQuery = useDebounce(value, 1000);
  const { isLoading, data, isError, refetch } = useQueryCustom(
    "DICTIONARY",
    () => dictionaryService.getDictionaryByWord({ word: searchQuery, option: {} })
  );


  return (
    <Modal isShowModal={isShowModal} width="max-w-3xl">
      <HeaderDictionary value={value} setValue={setValue} setIsShowModal={setIsShowModal} refetch={refetch}/>
      <ResultList data={data} isLoading={isLoading} isError={isError} />
    </Modal>
  );
};

export default DictionaryScreen;
