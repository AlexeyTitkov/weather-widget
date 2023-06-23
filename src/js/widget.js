import { startWidget } from './modules/widgetService.js'
import { cityServiceSearch } from "./modules/cityServiceSearch.js";

export const initWidget = async (app) => {
  const widget = await startWidget();
  app.append(widget)

  cityServiceSearch(widget)
}

initWidget(document.querySelector('#weather-widget'));
