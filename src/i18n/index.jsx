
// src/utils/i18n.js
import { useState, useEffect, useContext, createContext } from 'react';

// 创建一个 context 来存储当前语言和翻译内容
const IntlContext = createContext();



export const useIntl = () => {
  return useContext(IntlContext);
};

export const IntlProvider = ({ children }) => {

  const [ language, setLanguage ] = useState('zh-TW')
  const [ messages, setMessages ] = useState({});
  const [ loading, setLoading ] = useState(false);

  // 用于加载语言文件
  const loadMessages = async (lang) => {
    try {
      setLoading(true);
      const module = await import(`./locales/${lang}.json`);

      return module.default;
    } catch (error) {
      console.error(`Unable to load language file: ${lang}`, error);
      return {}; // Fallback to empty object if file not found
    } finally {
      setLoading(false);
    }
  };

  // 切换语言
  const changeLanguage = (lang) => {
    setLanguage(lang);
  };


  // 自定义 formatMessage 函数
  const formatMessage = (id, variables = {}) => {
    const message = messages[ id ];

    if (!message) {
      // console.warn(`Message ID "${id}" not found.`);
      return id; // 如果找不到对应的 id，则返回 id 本身作为 fallback
    }

    // 替换占位符，例如 {key}, {key2}
    return message.replace(/{(\w+)}/g, (_, variable) => {
      return variables[ variable ] !== undefined ? variables[ variable ] : `{${variable}}`;
    });
  };

  useEffect(() => {

    const htmlElement = document.documentElement;

    const fetchMessages = async () => {
      const loadedMessages = await loadMessages(language);
      setMessages(loadedMessages);
    };
    fetchMessages();

    htmlElement.setAttribute('lang', language)

  }, [ language ]);

  return (
    <IntlContext.Provider value={{ language, changeLanguage, t: formatMessage, languageLoading: loading }}>
      {children}
    </IntlContext.Provider>
  );
};
