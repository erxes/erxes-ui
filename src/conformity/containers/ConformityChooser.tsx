import gql from 'graphql-tag';
import * as compose from 'lodash.flowright';
import React from 'react';
import { graphql } from 'react-apollo';
import { ItemChooser } from '../../boards/components/portable';
import Chooser, { CommonProps } from '../../components/Chooser';
import Alert from '../../utils/Alert';
import { withProps } from '../../utils/core';
import { mutations } from '../graphql';
import { EditConformityMutation, IConformityEdit } from '../types';

type Props = {
  filterStageId?: (
    stageId?: string,
    boardId?: string,
    pipelineId?: string
  ) => void;
  onSelect?: (datas: any[]) => void;
  stageId?: string;
  boardId?: string;
  pipelineId?: string;
  refetchQuery: string;
  chooserComponent?: any;
} & CommonProps;

type FinalProps = {
  editConformityMutation: EditConformityMutation;
} & Props;

const ConformityChooser = (props: FinalProps) => {
  const { editConformityMutation, data, onSelect, chooserComponent } = props;

  const onSelected = relTypes => {
    const relTypeIds = relTypes.map(item => item._id);

    editConformityMutation({
      variables: {
        mainType: data.mainType,
        mainTypeId: data.mainTypeId,
        relType: data.relType,
        relTypeIds
      }
    })
      .then(() => {
        if (onSelect) {
          onSelect(relTypes);
        }
      })
      .catch(error => {
        Alert.error(error.message);
      });
  };

  const extendedProps = {
    ...props,
    onSelect: onSelected
  };

  if (chooserComponent) {
    const Component = chooserComponent;
    return <Component {...extendedProps} />
  }

  if (props.data.options) {
    return <ItemChooser {...extendedProps} />;
  }

  return <Chooser {...extendedProps} />;
};

export default withProps<Props>(
  compose(
    graphql<
      Props,
      EditConformityMutation,
      IConformityEdit & { isSaved?: boolean }
    >(gql(mutations.conformityEdit), {
      name: 'editConformityMutation',
      options: ({ data, refetchQuery }) => {
        return {
          refetchQueries: [
            {
              query: gql(refetchQuery),
              variables: {
                mainType: data.mainType,
                mainTypeId: data.mainTypeId,
                relType: data.relType,
                isSaved: true
              }
            },
            'activityLogs',
            'customers',
            'companies'
          ]
        };
      }
    })
  )(ConformityChooser)
);
