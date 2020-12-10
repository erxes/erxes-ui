// TODO: fix
// import segmentQueries from 'modules/segments/graphql/queries';
// import {
//   FieldsCombinedByType,
//   FieldsCombinedByTypeQueryResponse
// } from 'modules/settings/properties/types';
import React from 'react';
// import { graphql } from 'react-apollo';
// import { withProps } from '../utils';
// import { queries } from '../../settings/team/graphql';
import EditorCK from '../components/EditorCK';
import { IEditorProps } from '../types';

type Props = {
  showMentions?: boolean;
} & IEditorProps;

type FinalProps = {
  // combinedFieldsQuery: FieldsCombinedByTypeQueryResponse;
} & Props;

const EditorContainer = (props: FinalProps) => {
  // const { usersQuery, combinedFieldsQuery } = props;

  // if (usersQuery.loading || combinedFieldsQuery.loading) {
  //   return null;
  // }

  // const combinedFields = combinedFieldsQuery.fieldsCombinedByContentType || [];
  // const users = usersQuery.allUsers || [];
  // const mentionUsers: IMentionUser[] = [];

  // for (const user of users) {
  //   if (user.details && user.details.fullName) {
  //     const avatar = user.details.avatar || '/images/avatar-colored.svg';

  //     mentionUsers.push({
  //       id: user._id,
  //       avatar: isValidURL(avatar) ? avatar : '/images/avatar-colored.svg',
  //       fullName: user.details.fullName
  //     });
  //   }
  // }

  // const insertItems = props.insertItems || generateAttributes(combinedFields);

  return (
    <EditorCK
      {...props}
      mentionUsers={[]}
      // mentionUsers={mentionUsers}
      // insertItems={insertItems}
      insertItems={[]}
    />
  );
};

// export default withProps<Props>(
//   compose(
//     graphql<Props, AllUsersQueryResponse>(gql(queries.allUsers), {
//       name: 'usersQuery',
//       options: () => ({
//         variables: { isActive: true }
//       })
//     }),

//     graphql<Props>(gql(segmentQueries.combinedFields), {
//       name: 'combinedFieldsQuery',
//       options: () => ({
//         variables: {
//           contentType: 'customer'
//         }
//       })
//     })
//   )(EditorContainer)
// );


export default EditorContainer;