import type { TabMode } from "@/type/common";
import { createContext, useContext, useState, type ReactNode } from "react";

interface TabContextType {
  activeTab: TabMode;
  setActiveTab: (tab: TabMode) => void;
}

const TabContext = createContext<TabContextType | null>(null);

export const TabProvider = ({ children }: { children: ReactNode }) => {
  const [activeTab, setActiveTab] = useState<TabMode>('about');

  return (
    <TabContext.Provider value={{ activeTab, setActiveTab }}>
      {children}
    </TabContext.Provider>
  );
};

export const useTab = () => {
  const context = useContext(TabContext);
  if (!context) throw new Error('useTab must be used within a TabProvider');
  return context;
};