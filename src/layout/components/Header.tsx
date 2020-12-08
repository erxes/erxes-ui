import BreadCrumb from '../../components/breadCrumb';
import Filter from '../../components/filter';
import Submenu from '../../components/subMenu';
import React from 'react';
import { IBreadCrumbItem, ISubMenuItem } from '../../components/types';
import { PageHeader } from '../styles';
import { setTitle } from '../../utils/core';

type Props = {
  breadcrumb?: IBreadCrumbItem[];
  submenu?: ISubMenuItem[];
  queryParams?: any;
  title: string;
  additionalMenuItem?: React.ReactNode;
  translator?: (key: string, options?: any) => string;
};

class Header extends React.Component<Props> {
  setTitle() {
    const { title, translator } = this.props;

    setTitle(
      title,
      title === `${translator ? translator('Team Inbox'): 'Team Inbox'}` && document.title.startsWith('(1)')
    );
  }

  componentDidUpdate() {
    this.setTitle();
  }

  componentDidMount() {
    this.setTitle();
  }

  render() {
    const { breadcrumb, submenu, queryParams, additionalMenuItem, translator } = this.props;

    return (
      <PageHeader>
        {breadcrumb && <BreadCrumb breadcrumbs={breadcrumb} />}
        {submenu && (
          <Submenu items={submenu} additionalMenuItem={additionalMenuItem} translator={translator} />
        )}
        {queryParams && <Filter queryParams={queryParams} translator={translator} />}
      </PageHeader>
    );
  }
}

export default Header;
