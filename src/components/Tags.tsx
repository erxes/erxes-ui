import Label from './Label';
import { colors, dimensions } from '../styles';
import React from 'react';
import styled from 'styled-components';
import styledTS from 'styled-components-ts';
// TODO: fix
// import { ITag } from '../../tags/types';

const TagList = styledTS<{ length: number }>(styled.div).attrs({
  className: props => (props.length > 0 ? 'tags' : '')
})`
  > span {
    margin-right: ${dimensions.unitSpacing / 2}px;

    &:last-child {
      margin: 0;
    }
  }
`;

type Props = {
  // TODO: fix
  // tags: ITag[];
  tags: any[];
  size?: string;
  limit?: number;
};

function Tags({ tags, limit }: Props) {
  const length = tags.length;

  return (
    <TagList length={length}>
      {tags.slice(0, limit ? limit : length).map(tag => {
        return (
          <Label key={tag.name} lblColor={tag.colorCode} ignoreTrans={true}>
            <span>{tag.name}</span>
          </Label>
        );
      })}
      {limit && length - limit > 0 && (
        <Label lblColor={colors.colorCoreGray} ignoreTrans={true}>
          <span>{`+${length - limit}`}</span>
        </Label>
      )}
    </TagList>
  );
}

export default Tags;
