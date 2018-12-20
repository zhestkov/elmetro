import { AllData } from "../../data/AllData";
import { makeDataPage } from "../../data/DataPageFabric/DataPageBuilder";
import { DisplayTab } from "../../data/Display";

export const DataTabs = {
  tabs: {
    ALL_DATA: {
      label: "Все данные",
      Component: AllData
    },
    PAGE_1: {
      label: "Страница 1",
      Component: makeDataPage(1)
    },
    PAGE_2: {
      label: "Страница 2",
      Component: makeDataPage(2)
    },
    PAGE_3: {
      label: "Страница 3",
      Component: makeDataPage(3)
    },
    PAGE_4: {
      label: "Страница 4",
      Component: makeDataPage(4)
    },
    PAGE_5: {
      label: "Страница 5",
      Component: makeDataPage(5)
    },
    PAGE_6: {
      label: "Страница 6",
      Component: makeDataPage(6)
    },
    PAGE_7: {
      label: "Страница 7",
      Component: makeDataPage(7)
    },
    PAGE_8: {
      label: "Страница 8",
      Component: makeDataPage(8)
    },
    DISPLAY: {
      label: "Табло",
      Component: DisplayTab
    }
  },

  getTab: type => {
    const { tabs } = DataTabs;
    if (tabs[type] && tabs[type].Component) {
      return tabs[type];
    }
    return null;
  }
};
