import { userCatalog } from "./views/CatalogsView";

export const sortCatalogsAlphabetically = (userCatalogs: userCatalog[]) => {
  userCatalogs.sort((a, b) => (a.name > b.name ? 1 : b.name > a.name ? -1 : 0));
};