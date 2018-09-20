export class Pages {
  static PAGE_REG_INFO = "info";
  static PAGE_REG_DATA = "data";
  static PAGE_REG_SETTINGS = "settings";

  list = [
    {
      id: Pages.PAGE_REG_INFO,
      title: "Reg. Info",
      sidebar: true,
      url: `/${Pages.PAGE_REG_INFO}`,
      path: `/${Pages.PAGE_REG_INFO}`
    },
    {
      id: Pages.PAGE_REG_DATA,
      title: "Reg. Data",
      sidebar: true,
      url: `/${Pages.PAGE_REG_DATA}`,
      path: `/${Pages.PAGE_REG_DATA}`
    },
    {
      id: Pages.PAGE_REG_SETTINGS,
      title: "Reg. Settings",
      sidebar: true,
      url: `/${Pages.PAGE_REG_SETTINGS}`,
      path: `/${Pages.PAGE_REG_SETTINGS}`
    }
  ];
}
