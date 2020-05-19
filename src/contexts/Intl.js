import React, { createContext, useState } from "react";

export const IntlContext = createContext(null);

const languages = {
  en: "en",
  de: "de",
  es: "es",
  fr: "fr",
};
const IntlContextProvider = (props) => {
  const [lang, setLang] = useState("en");

  const setAppLanguage = (lang, history) => {
    setLang(languages[lang] ? lang : "en");
    const newUrl = history.location.pathname.substring(4);
    history.push(`/${languages[lang] ? lang : "en"}/${newUrl}`);
  };

  return (
    <IntlContext.Provider value={{ lang, setLang: setAppLanguage }}>
      {props.children}
    </IntlContext.Provider>
  );
};

export default IntlContextProvider;
