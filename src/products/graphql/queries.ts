const productFields = `
  _id
  name
  type
  code
  categoryId
  vendorId
  description
  unitPrice
  sku
  getTags {
    _id
    name
    colorCode
  }
  tagIds
  createdAt
  category {
    _id
    code
    name
  }
  attachment {
    name
    url
    type
    size
  }
  vendor {
    _id
    primaryName
    primaryPhone
    primaryEmail
    code
  }
`;

const products = `
  query products($type: String, $categoryId: String, $tag: String, $searchValue: String, $perPage: Int, $page: Int $ids: [String], $excludeIds: Boolean) {
    products(type: $type, categoryId: $categoryId, tag: $tag, searchValue: $searchValue, perPage: $perPage, page: $page ids: $ids, excludeIds: $excludeIds) {
      ${productFields}
    }
  }
`;

const productCategories = `
  query productCategories {
    productCategories {
      _id
      name
      order
      code
      parentId
      description

      isRoot
      productCount
    }
  }
`;

export default {
  productFields,
  products,
  productCategories,
};
