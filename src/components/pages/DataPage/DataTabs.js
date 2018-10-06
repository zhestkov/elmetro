import { AllData } from "../../data/AllData";
import { makeDataPage } from "../../data/DataPageFabric/DataPageBuilder";
import { DisplayPage } from "../../data/Display";

export const DataTabs = {
  tabs: {
    ALL_DATA: {
      label: "All Data",
      Component: AllData
    },
    PAGE_1: {
      label: "Page 1",
      Component: makeDataPage(1)
    },
    PAGE_2: {
      label: "Page 2",
      Component: makeDataPage(2)
    },
    PAGE_3: {
      label: "Page 3",
      Component: makeDataPage(3)
    },
    PAGE_4: {
      label: "Page 4",
      Component: makeDataPage(4)
    },
    PAGE_5: {
      label: "Page 5",
      Component: makeDataPage(5)
    },
    PAGE_6: {
      label: "Page 6",
      Component: makeDataPage(6)
    },
    PAGE_7: {
      label: "Page 7",
      Component: makeDataPage(7)
    },
    PAGE_8: {
      label: "Page 8",
      Component: makeDataPage(8)
    },
    DISPLAY: {
      label: "Display",
      Component: DisplayPage
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

// import { wrappedContainer } from "../../data/DataPageFabric/DataPageFabric";
// import { AllDataTable } from "../../data/AllData/AllDataTable";
//
// const ALL_DATA_PAGE = "ALL_DATA";
// const PAGE_1 = "PAGE_1";
// const PAGE_2 = "PAGE_2";
// const PAGE_3 = "PAGE_3";
// const PAGE_4 = "PAGE_4";
// const PAGE_5 = "PAGE_5";
// const PAGE_6 = "PAGE_6";
// const PAGE_7 = "PAGE_7";
//
// const WrappedAllData = wrappedContainer();
// const WrappedPage1 = wrappedContainer();
//
// export const DATA_PAGES_MAP = {
//   getTab: type => {
//     if (DATA_PAGES_MAP[type] && DATA_PAGES_MAP[type].Component) {
//       return DATA_PAGES_MAP[type];
//     }
//   },
//   [ALL_DATA_PAGE]: {
//     label: "All Data",
//     Component: WrappedAllData,
//     tabsMap: [
//       {
//         label: "Table",
//         Component: AllDataTable
//       },
//       {
//         label: "Graphics",
//         Component: AllDataTable // TODO: change to ALLDATA_Graphics tab
//       }
//     ]
//   },
//   [PAGE_1]: {
//     label: "Page 1",
//     Component: WrappedPage1,
//     tabsMap: [
//       {
//         label: "Table_1",
//         Component: AllDataTable // TODO: change to Page1_Table tab
//       },
//       {
//         label: "Graphics_1",
//         Component: AllDataTable // TODO: change to Page1_Graphics tab
//       }
//     ]
//   }
// };
