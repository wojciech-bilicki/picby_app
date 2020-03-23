import {NavigationRoute, NavigationParams} from 'react-navigation';

interface OmitNavKeyItemsArgs {
  navItems: NavigationRoute<NavigationParams>[];
  omitNavKey: String;
}

export const omitNavItems = ({navItems, omitNavKey}: OmitNavKeyItemsArgs) =>
  navItems.filter(navItem => navItem.key !== omitNavKey);
