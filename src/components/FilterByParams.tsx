import DataWithLoader from './DataWithLoader';
import EmptyState from './EmptyState';
// TODO
// import { FieldStyle, SidebarCounter, SidebarList } from 'modules/layout/styles';
import React from 'react';
import { withRouter } from 'react-router-dom';
import styled from 'styled-components';
import { IRouterProps } from '../types';
import Filter from './filterableList/Filter';

interface IProps extends IRouterProps {
  fields: any[];
  counts: any;
  paramKey: string;
  icon?: string;
  loading: boolean;
  searchable?: boolean;
  update?: () => void;
}

type State = {
  key: string;
};

const PopoverContent = styled.div`
  > input {
    padding: 10px 20px;
  }
`;

class FilterByParams extends React.Component<IProps, State> {
  constructor(props) {
    super(props);

    this.state = {
      key: ''
    };
  }

  filterItems = e => {
    this.setState({ key: e.target.value });

    const { update } = this.props;

    if (update) {
      update();
    }
  };

  renderItems() {
    const { fields, icon, searchable } = this.props;

    if (fields.length === 0) {
      return <EmptyState icon={icon} text="No templates" size="full" />;
    }

    return (
      <PopoverContent>
        {searchable && <Filter onChange={this.filterItems} />}
      </PopoverContent>
    );
  }

  render() {
    const { fields, loading } = this.props;

    return (
      <DataWithLoader
        loading={loading}
        count={fields.length}
        data={this.renderItems()}
        emptyText="Empty"
        emptyIcon="folder-2"
        size="small"
        objective={true}
      />
    );
  }
}

export default withRouter<IProps>(FilterByParams);
