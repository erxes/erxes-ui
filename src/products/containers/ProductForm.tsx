import gql from 'graphql-tag';
import * as compose from 'lodash.flowright';
import React from 'react';
import { graphql } from 'react-apollo';

import ButtonMutate from '../../components/ButtonMutate';
import { IButtonMutateProps } from '../../types';
import { withProps } from '../../utils';
import From from '../components/ProductForm';
import { mutations, queries } from '../graphql';
import { IProduct, ProductCategoriesQueryResponse } from '../types';

type Props = {
  product?: IProduct;
  closeModal: () => void;
};

type FinalProps = {
  productCategoriesQuery: ProductCategoriesQueryResponse;
} & Props;

class ProductFormContainer extends React.Component<FinalProps> {
  render() {
    const { productCategoriesQuery } = this.props;

    if (productCategoriesQuery.loading) {
      return null;
    }

    const renderButton = ({
      name,
      values,
      isSubmitted,
      callback,
      object
    }: IButtonMutateProps) => {
      values.unitPrice = Number(values.unitPrice);

      return (
        <ButtonMutate
          mutation={object ? mutations.productEdit : mutations.productAdd}
          variables={values}
          callback={callback}
          refetchQueries={getRefetchQueries()}
          isSubmitted={isSubmitted}
          type="submit"
          uppercase={false}
          successMessage={`You successfully ${object ? 'updated' : 'added'
            } a ${name}`}
        />
      );
    };

    const productCategories = productCategoriesQuery.productCategories || [];

    const updatedProps = {
      ...this.props,
      renderButton,
      productCategories
    };

    return <From {...updatedProps} />;
  }
}

const getRefetchQueries = () => {
  return ['productDetail', 'products', 'productsTotalCount', 'productCategories'];
};

export default withProps<Props>(
  compose(
    graphql<Props, ProductCategoriesQueryResponse>(
      gql(queries.productCategories),
      {
        name: 'productCategoriesQuery'
      }
    )
  )(ProductFormContainer)
);
