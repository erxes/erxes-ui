import React from "react";
import { Link } from "react-router-dom";
import EmptyState from "../EmptyState";
import Icon from "../Icon";
import Spinner from "../Spinner";
import Filter from "./Filter";
import {
  AvatarImg,
  FlexRow,
  IconWrapper,
  PopoverBody,
  PopoverFooter,
  PopoverHeader,
  PopoverList,
  ChildList,
  ToggleIcon,
} from "./styles";
import { SidebarList } from "../../layout/styles";

type Props = {
  items?: any[];
  links?: any[];
  showCheckmark?: boolean;
  selectable?: boolean;
  loading?: boolean;
  className?: string;
  treeView?: boolean;

  // hooks
  onClick?: (items: any[], id: string) => void;
  onSearch?: (e: React.FormEvent<HTMLElement>) => void;
  onExit?: (items: any[]) => void;
};

type State = {
  key: string;
  items: any[];
  parentIds: { [key: string]: boolean };
};

class FilterableList extends React.Component<Props, State> {
  constructor(props) {
    super(props);

    this.state = {
      key: "",
      items: props.items,
      parentIds: {},
    };
  }

  componentWillUnmount() {
    // onExit hook
    const { onExit } = this.props;

    if (onExit) {
      onExit(this.state.items);
    }
  }

  componentWillReceiveProps(nextProps) {
    if (JSON.stringify(this.props.items) !== JSON.stringify(nextProps.items)) {
      this.setState({
        items: nextProps.items,
      });
    }
  }

  filterItems = (e) => {
    this.setState({ key: e.target.value });
  };

  toggleItem = (id: string) => {
    const items = this.state.items;
    const item = items.find((i) => i._id === id);

    items[items.indexOf(item)].selectedBy =
      item.selectedBy === "all" ? "none" : "all";

    this.setState({ items });

    // onClick hook
    const { onClick } = this.props;

    if (onClick) {
      onClick(items, id);
    }
  };

  groupByParent = (array: any[]) => {
    const key = "parentId";

    return array.reduce((rv, x) => {
      (rv[x[key]] = rv[x[key]] || []).push(x);

      return rv;
    }, {});
  };

  onToggle = (id: string, isOpen: boolean) => {
    const parentIds = this.state.parentIds;
    parentIds[id] = !isOpen;

    this.setState({ parentIds });
  };

  renderItem(item) {
    const { showCheckmark = true } = this.props;
    const { key } = this.state;

    if (key && item.title.toLowerCase().indexOf(key.toLowerCase()) < 0) {
      return false;
    }

    const onClick = () => this.toggleItem(item._id);

    return (
      <FlexRow key={item._id}>
        <li
          className={showCheckmark ? item.selectedBy : ""}
          style={item.style}
          onClick={onClick}
        >
          {item.iconClass ? (
            <i
              className={`icon ${item.iconClass}`}
              style={{ color: item.iconColor }}
            />
          ) : null}{" "}
          {item.avatar ? <AvatarImg src={item.avatar} /> : null}
          <span>{item.title || "[undefined]"}</span>
        </li>
        {item.additionalIconClass && (
          <IconWrapper
            onClick={
              item.additionalIconOnClick &&
              item.additionalIconOnClick.bind(this, item._id)
            }
          >
            <Icon icon={item.additionalIconClass} size={12} />
          </IconWrapper>
        )}
      </FlexRow>
    );
  }

  renderTree(parent, subFields?) {
    const groupByParent = this.groupByParent(subFields);
    const childrens = groupByParent[parent._id];

    if (childrens) {
      const isOpen = this.state.parentIds[parent._id];

      return (
        <SidebarList key={`parent-${parent._id}`}>
          {this.renderItem(parent)}

          <ChildList>
            <ToggleIcon onClick={this.onToggle.bind(this, parent._id, isOpen)}>
              <Icon icon={isOpen ? "angle-down" : "angle-right"} />
            </ToggleIcon>

            {isOpen &&
              childrens.map((childparent) =>
                this.renderTree(childparent, subFields)
              )}
          </ChildList>
        </SidebarList>
      );
    }

    return this.renderItem(parent);
  }

  renderItems() {
    const { loading, treeView } = this.props;
    const { items } = this.state;

    if (loading) {
      return <Spinner objective={true} />;
    }

    if (items.length === 0) {
      return (
        <EmptyState
          text="There aren’t any data at the moment."
          icon="clipboard-blank"
        />
      );
    }

    if (!treeView) {
      return items.map((item) => this.renderItem(item));
    }

    const parents = items.filter((item) => !item.parentId);
    const subFields = items.filter((item) => item.parentId);

    return parents.map((parent) => this.renderTree(parent, subFields));
  }

  render() {
    const { className, onSearch, selectable, links } = this.props;

    return (
      <div className={className}>
        <PopoverHeader>
          <Filter onChange={onSearch || this.filterItems} />
        </PopoverHeader>

        <PopoverBody>
          <PopoverList selectable={selectable}>
            {this.renderItems()}
          </PopoverList>
        </PopoverBody>
        {links && (
          <PopoverFooter>
            <PopoverList>
              {links.map((link) => (
                <li key={link.href}>
                  <Link onClick={link.onClick} to={link.href}>
                    {link.title}
                  </Link>
                </li>
              ))}
            </PopoverList>
          </PopoverFooter>
        )}
      </div>
    );
  }
}

export default FilterableList;
