import axios from "axios";

export const dictionaryService = {
  getDictionaryByWord: async ({ word, option }) => {
    try {
      const res = await axios(
        `https://api.dictionaryapi.dev/api/v2/entries/en/${word}`,
        option
      );
      return res.data;
    } catch (error) {
      console.log(error);
    }
  },
};
