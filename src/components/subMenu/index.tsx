import React from "react";
import styled from "styled-components";
import MenuItem from "./MenuItem";

export interface ISubMenuItem {
  title: string;
  link?: string;
}

const Items = styled.ul`
  display: inline-block;
  padding: 0;
  margin: 0;
  list-style: none;
  font-size: 14px;
`;

function Submenu({
  items,
  additionalMenuItem,
  translator,
}: {
  items?: ISubMenuItem[];
  additionalMenuItem?: React.ReactNode;
  translator?: (kye: string, options?: any) => string;
}) {
  if (items) {
    return (
      <Items>
        {items.map((b) => (
          <MenuItem to={b.link || ""} key={b.title}>
            { translator ? translator(b.title) : b.title}
          </MenuItem>
        ))}
        {additionalMenuItem}
      </Items>
    );
  }

  return null;
}

export default Submenu;
