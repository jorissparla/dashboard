import React, { useState, useEffect } from "react";
import { useMutation } from "react-apollo";
import { MUTATION_UPDATE_CARD_KEYWORDS } from "pages/SupportCards";

const SupportCardTags = ({ id, keywords, readOnly }) => {
  const [keywordsArray, setKeywordsArray] = useState(keywords ? keywords.split(";").map((x) => x.trim()) : []);
  const [newKeyword, setNewkeyword] = useState("");
  const [updateTags] = useMutation(MUTATION_UPDATE_CARD_KEYWORDS);

  useEffect(() => {});

  // console.log("🤳", id, keywordsArray);

  const handleInputChange = (e) => {
    setNewkeyword(e.target.value);
  };

  const SaveKeywords = async (k) => {
    const keywords = k.filter((x) => x !== "").join(";");
    const input = { id, keywords };
    updateTags({ variables: { input } });
  };

  const handleKeyDown = (e) => {
    e.stopPropagation();
    if (e.keyCode === 13) {
      const foundKeyword = keywordsArray.find((k) => k === newKeyword);
      if (!foundKeyword) {
        const newKeywords = [...keywordsArray, newKeyword];
        setKeywordsArray((prev) => newKeywords);
        SaveKeywords(newKeywords);
      }
      setNewkeyword("");

      e.preventDefault();
    }
  };

  const handleRemove = (item) => {
    const k = keywordsArray.filter((k) => k !== item);
    setKeywordsArray(k);
    SaveKeywords(k);
  };
  if (readOnly) {
    return (
      <div className="flex w-full justify-end px-4 items-center">
        <div className="w-full flex items-center flex-wrap">
          {keywordsArray.map((keyword, index) => (
            <span
              key={index}
              className="mx-1 inline-flex items-center px-3 py-0.5 rounded-full text-sm font-medium leading-5 bg-indigo-100 text-indigo-800"
            >
              {keyword}
            </span>
          ))}
        </div>
      </div>
    );
  }
  return (
    <div className="flex w-full justify-end px-4 items-center">
      <label htmlFor="kw" className="mr-3 pr-3 block text-sm font-semibold leading-5 text-gray-700">
        Keywords
      </label>
      <div className="mt-1 mr-2 relative rounded-md shadow-sm w-96">
        <input
          type="text"
          name="kw"
          className="form-input block w-full sm:text-sm sm:leading-5"
          placeholder="Type and press enter to add keyword.."
          onChange={handleInputChange}
          value={newKeyword}
          onKeyDown={handleKeyDown}
        />
      </div>
      <div className="w-full flex items-center flex-wrap">
        {keywordsArray.map((keyword, index) => (
          <span
            key={index}
            className="mx-1 inline-flex items-center px-3 py-0.5 rounded-full text-sm font-medium leading-5 bg-indigo-100 text-indigo-800"
          >
            {keyword}
            <button
              onClick={() => handleRemove(keyword)}
              type="button"
              className="flex-shrink-0 -mr-0.5 ml-1.5 inline-flex text-indigo-500 focus:outline-none focus:text-indigo-700"
            >
              <svg className="h-2 w-2" stroke="currentColor" fill="none" viewBox="0 0 8 8">
                <path strokeLinecap="round" strokeWidth="1.5" d="M1 1l6 6m0-6L1 7" />
              </svg>
            </button>
          </span>
        ))}
      </div>
    </div>
  );
};

export default SupportCardTags;
