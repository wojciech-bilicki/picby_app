import React, {useState} from 'react';

export interface IntroductionProps {
  activeScreenNumber: number;
  setActiveScreenNumber: React.Dispatch<React.SetStateAction<number>>;
}

export const IntroductionContext = React.createContext<IntroductionProps>(
  {} as IntroductionProps,
);

const IntroductionContextProvider: React.FC = ({children}) => {
  const [activeScreenNumber, setActiveScreenNumber] = useState(1);
  return (
    <IntroductionContext.Provider
      value={{
        activeScreenNumber,
        setActiveScreenNumber,
      }}>
      {children}
    </IntroductionContext.Provider>
  );
};

export default IntroductionContextProvider;
