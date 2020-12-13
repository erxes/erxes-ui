import {
  ActionTop as ChooserStyleActionTop, Column as ChooserStyleColumn,
  Columns as ChooserStyleColumns, Footer as ChooserStyleFooter, Select as ChooserStyleSelect
} from './styles/chooser';
import {
  ButtonRelated as MainStyleButtonRelated, CenterContent as MainStyleCenterContent,
  CloseModal as MainStyleCloseModal, Count as MainStyleCount,
  DateContainer as MainStyleDateContainer, DateWrapper as MainStyleDateWrapper,
  FormColumn as MainStyleFormColumn, FormWrapper as MainStyleFormWrapper,
  HomeContainer as MainStyleHomeContainer, InfoWrapper as MainStyleInfoWrapper,
  Limited as MainStyleLimited, Links as MainStyleLinks, ModalFooter as MainStyleModalFooter,
  PopoverButton,
  TabContent as MainStyleTabContent, TopHeader as MainStyleTopHeader
} from './styles/main';

import apolloClient from './apolloClient';
import { AppConsumer, AppProvider } from './appContext';
import { EditorCK } from './containers';

export * from './conformity';
export * from './components';
export * from './layout';
export * from './utils';
export * from './boards';

export {
  apolloClient,
  AppConsumer,
  AppProvider,
  EditorCK,

  // main styles
  ChooserStyleColumns,
  ChooserStyleColumn,
  ChooserStyleFooter,
  ChooserStyleSelect,
  ChooserStyleActionTop,
  MainStyleModalFooter,
  MainStyleInfoWrapper,
  MainStyleLinks,
  MainStyleFormWrapper,
  MainStyleFormColumn,
  MainStyleCenterContent,
  MainStyleHomeContainer,
  MainStyleDateWrapper,
  MainStyleCloseModal,
  MainStyleDateContainer,
  MainStyleTabContent,
  MainStyleButtonRelated,
  MainStyleTopHeader,
  MainStyleCount,
  MainStyleLimited,

  PopoverButton
}
