import { createContext } from "react";

interface ModeContextType {
  onSwitchMode: () => void;
}

const ModeContext = createContext<Partial<ModeContextType>>({})

export default ModeContext;