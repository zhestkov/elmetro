export class Pages {
  static PAGE_REG_INFO = "info";
  static PAGE_REG_DATA = "data";
  static PAGE_REG_SETTINGS = "settings";

  static REG_INFO_TITLE = "Информация";
  static REG_DATA_TITLE = "Данные";
  static REG_SETTINGS_TITLE = "Настройки";

  list = [
    {
      id: Pages.PAGE_REG_INFO,
      title: Pages.REG_INFO_TITLE,
      sidebar: true,
      url: `/${Pages.PAGE_REG_INFO}`,
      path: `/${Pages.PAGE_REG_INFO}`
    },
    {
      id: Pages.PAGE_REG_DATA,
      title: Pages.REG_DATA_TITLE,
      sidebar: true,
      url: `/${Pages.PAGE_REG_DATA}`,
      path: `/${Pages.PAGE_REG_DATA}`
    },
    {
      id: Pages.PAGE_REG_SETTINGS,
      title: Pages.REG_SETTINGS_TITLE,
      sidebar: true,
      url: `/${Pages.PAGE_REG_SETTINGS}`,
      path: `/${Pages.PAGE_REG_SETTINGS}`
    }
  ];
}
