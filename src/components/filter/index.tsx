import gql from 'graphql-tag';
import Chip from '../chip';
import React from 'react';
import { withRouter } from 'react-router-dom';
import styled from 'styled-components';
import { router } from '../../utils/core';
import { IRouterProps } from '../types';
import createChipText from './createChipText';
import { cleanIntegrationKind } from '../../utils/integration';

interface IProps extends IRouterProps {
  queryParams?: any;
  translator?: (key: string, options?: any) => string;
}

const Filters = styled.div`
  font-size: 0.9em;
`;

function Filter({ queryParams = {}, history, translator }: IProps) {
  const onClickClose = paramKey => {
    for (const key of paramKey) {
      router.setParams(history, { [key]: null });
    }
  };

  const renderFilterParam = (paramKey: string, bool: boolean) => {
    if (!queryParams[paramKey]) {
      return null;
    }

    const onClick = () => onClickClose([paramKey]);

    let text = paramKey;
    if (paramKey === 'awaitingResponse') {
      text = 'Awaiting Response';
    }

    const nextText = cleanIntegrationKind(queryParams[paramKey]);

    return (
      <Chip capitalize={true} onClick={onClick}>
        {bool ? text : (translator ? translator(nextText) : nextText)}
      </Chip>
    );
  };

  const renderFilterWithData = (
    paramKey: string,
    type: string,
    fields = '_id name'
  ) => {
    if (queryParams[paramKey]) {
      const id = queryParams[paramKey];

      const graphqlQuery = gql`
          query ${type}Detail($id: String!) {
            ${type}Detail(_id: $id) {
              ${fields}
            }
          }
        `;

      const ChipText = createChipText(graphqlQuery, id);

      return (
        <Chip onClick={onClickClose.bind(null, [paramKey])}>
          <ChipText />
        </Chip>
      );
    }

    return null;
  };

  const renderFilterWithDate = () => {
    if (queryParams.startDate && queryParams.endDate) {
      const onClick = () => onClickClose(['startDate', 'endDate']);

      return (
        <Chip onClick={onClick}>
          {queryParams.startDate} - {queryParams.endDate}
        </Chip>
      );
    }

    return null;
  };

  return (
    <Filters>
      {renderFilterWithData('channelId', 'channel')}
      {renderFilterParam('status', false)}
      {renderFilterParam('participating', true)}
      {renderFilterParam('unassigned', true)}
      {renderFilterParam('awaitingResponse', true)}
      {renderFilterWithData('brandId', 'brand')}
      {renderFilterParam('integrationType', false)}
      {renderFilterWithData('tag', 'tag')}
      {renderFilterWithData('segment', 'segment')}
      {renderFilterParam('kind', false)}
      {renderFilterWithData('brand', 'brand')}
      {renderFilterWithDate()}
      {renderFilterWithData('form', 'form', '_id title')}
    </Filters>
  );
}

export default withRouter<IProps, React.ComponentType<IProps>>(Filter);
