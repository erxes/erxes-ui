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
  multiple?: boolean;
  treeView?: boolean;
}

type State = {
  key: string;
  parentFieldIds: { [key: string]: boolean };
};

const PopoverContent = styled.div`
  > input {
    padding: 10px 20px;
  }
`;

const ChildList = styled.ul`
  list-style: none;
  padding-left: 20px;
  position: relative;
`;

const iconWidth = 30;

const ToggleIcon = styled.div`
  position: absolute;
  margin: -${iconWidth}px 0 0 -${iconWidth / 2}px;
  width: ${iconWidth / 2}px;
  height: ${iconWidth}px;
  line-height: ${iconWidth}px;
  text-align: center;
  cursor: pointer;
  z-index: 1;
`;

class FilterByParams extends React.Component<IProps, State> {
  constructor(props) {
    super(props);

    this.state = {
      key: '',
      parentFieldIds: {}
    };
  }

  filterItems = e => {
    this.setState({ key: e.target.value });

    const { update } = this.props;

    if (update) {
      update();
    }
  };

  onClick = (id: string) => {
    const { history, paramKey, multiple } = this.props;

    if (!multiple) {
      setParams(history, { [paramKey]: id });
    } else {
      // multi select
      const value = getParam(history, [paramKey]);
      const params = value ? value.split(',') : [];

      if (params.includes(id)) {
        const index = params.indexOf(id);

        params.splice(index, 1);
      } else {
        params.push(id);
      }

      setParams(history, { [paramKey]: params.toString() });
    }

    removeParams(history, 'page');
  };

  groupByParent = (array: any[]) => {
    const key = 'parentId';

    return array.reduce((rv, x) => {
      (rv[x[key]] = rv[x[key]] || []).push(x);

      return rv;
    }, {});
  };

  onToggle = (id: string, isOpen: boolean) => {
    const parentFieldIds = this.state.parentFieldIds;
    parentFieldIds[id] = !isOpen;

    this.setState({ parentFieldIds });
  };

  renderItems() {
    const {
      history,
      fields,
      counts,
      paramKey,
      icon,
      searchable,
      multiple,
      treeView
    } = this.props;
    const { key } = this.state;

    if (fields.length === 0) {
      return <EmptyState icon={icon} text="No templates" size="full" />;
    }

    const renderFieldItem = field => {
      // filter items by key
      if (key && field.name.toLowerCase().indexOf(key) < 0) {
        return false;
      }

      if (!field._id || !field.name) {
        return null;
      }

      let className = '';
      const _id = field._id;
      const value = getParam(history, [paramKey]);

      if (value === _id) {
        className = 'active';
      } else if (multiple && value && value.includes(_id)) {
        className = 'active';
      }

      return (
        <li key={_id}>
          <a
            href="#param"
            tabIndex={0}
            className={className}
            onClick={this.onClick.bind(this, _id)}
          >
            {icon ? (
              <Icon icon={icon} style={{ color: field.colorCode }} />
            ) : null}{' '}
            <FieldStyle>{field.name}</FieldStyle>
            <SidebarCounter>{counts[_id]}</SidebarCounter>
          </a>
        </li>
      );
    };

    const renderContent = () => {
      if (!treeView) {
        return fields.map(field => {
          return renderFieldItem(field);
        });
      }

      const subFields = fields.filter(f => f.parentId);
      const parents = fields.filter(f => !f.parentId);

      const groupByParent = this.groupByParent(subFields);

      const renderTree = field => {
        const childrens = groupByParent[field._id];

        if (childrens) {
          const isOpen = this.state.parentFieldIds[field._id];

          return (
            <>
              {renderFieldItem(field)}

              <ChildList>
                <ToggleIcon
                  onClick={this.onToggle.bind(this, field._id, isOpen)}
                >
                  <Icon icon={isOpen ? 'angle-down' : 'angle-right'} />
                </ToggleIcon>

                {isOpen &&
                  childrens.map(childField => {
                    return renderTree(childField);
                  })}
              </ChildList>
            </>
          );
        }

        return renderFieldItem(field);
      };

      return parents.map(field => {
        return renderTree(field);
      });
    };

    return (
      <PopoverContent>
        {searchable && <Filter onChange={this.filterItems} />}

        <SidebarList>{renderContent()}</SidebarList>
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
