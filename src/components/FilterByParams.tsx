import React from 'react';
import { withRouter } from 'react-router-dom';
import styled from 'styled-components';
import { getParam, removeParams, setParams } from '../utils/router';
import { FieldStyle, SidebarCounter, SidebarList } from '../layout/styles';
import { IRouterProps } from '../types';
import DataWithLoader from './DataWithLoader';
import EmptyState from './EmptyState';
import Filter from './filterableList/Filter';
import Icon from './Icon';

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
    const { history, fields, counts, paramKey, icon, searchable } = this.props;
    const { key } = this.state;

    if (fields.length === 0) {
      return <EmptyState icon={icon} text="No templates" size="full" />;
    }

    return (
      <PopoverContent>
        {searchable && <Filter onChange={this.filterItems} />}
        <SidebarList>
          {fields.map(field => {
            // filter items by key
            if (key && field.name.toLowerCase().indexOf(key) < 0) {
              return false;
            }

            const onClick = () => {
              setParams(history, { [paramKey]: field._id });
              removeParams(history, 'page');
            };

            if (!field._id || !field.name) {
              return null;
            }

            return (
              <li key={field._id}>
                <a
                  href="#param"
                  tabIndex={0}
                  className={
                    getParam(history, [paramKey]) === field._id
                      ? 'active'
                      : ''
                  }
                  onClick={onClick}
                >
                  {icon ? (
                    <Icon icon={icon} style={{ color: field.colorCode }} />
                  ) : null}{' '}
                  <FieldStyle>{field.name}</FieldStyle>
                  <SidebarCounter>{counts[field._id]}</SidebarCounter>
                </a>
              </li>
            );
          })}
        </SidebarList>
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
