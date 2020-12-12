export * from './components';
import ActionBar from './layout/components/ActionBar';
import Header from './layout/components/Header';
import NotFound from './layout/components/NotFound';
import PageContent from './layout/components/PageContent';
import Sidebar from './layout/components/Sidebar';
import Wrapper from './layout/components/Wrapper';
import DetectBrowser from './layout/components/DetectBrowser';
import {
  CenterContent, ContenFooter, Contents, HeightedWrapper, MainContent, PageHeader
} from './layout/styles';
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
  TabContent as MainStyleTabContent, TopHeader as MainStyleTopHeader
} from './styles/main';

export * from './components';

export {

  // layout components
  ActionBar,
  DetectBrowser,
  Header,
  NotFound,
  PageContent,
  Sidebar,
  Wrapper,

  // layout styles
  PageHeader,
  HeightedWrapper,
  Contents,
  MainContent,
  ContenFooter,
  CenterContent,

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

}
