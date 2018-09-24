import { Index } from "../../data/AllData";

export const DataTabs = {
  tabs: {
    ALL_DATA: {
      label: "All Data",
      Component: Index
    },
    PAGE_1: {
      label: "Page 1",
      Component: Index
    },
    PAGE_2: {
      label: "Page 2"
    },
    PAGE_3: {
      label: "Page 3"
    },
    PAGE_4: {
      label: "Page 4"
    },
    PAGE_5: {
      label: "Page 5"
    },
    PAGE_6: {
      label: "Page 6"
    },
    PAGE_7: {
      label: "Page 7"
    },
    PAGE_8: {
      label: "Page 8"
    },
    DISPLAY: {
      label: "Display"
    }
  },

  getTab: type => {
    const { tabs } = DataTabs;
    if (tabs[type] && tabs[type].Component) {
      return tabs[type];
    }
    return {
      label: tabs[type].label,
      Component: tabs.ALL_DATA.Component
    };
  }
};
