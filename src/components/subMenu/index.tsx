import React from "react";
import styled from "styled-components";
import MenuItem from "./MenuItem";
import { ISubMenuItem } from "../types";
import { __ } from "../../utils";

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
}: {
  items?: ISubMenuItem[];
  additionalMenuItem?: React.ReactNode;
}) {
  if (items) {
    return (
      <Items>
        {items.map((b) => (
          <MenuItem to={b.link || ""} key={b.title}>
            {__(b.title)}
          </MenuItem>
        ))}
        {additionalMenuItem}
      </Items>
    );
  }

  return null;
}

export default Submenu;
