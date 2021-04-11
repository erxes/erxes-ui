const commonFields = `
  $mainType: String,
  $mainTypeId: String,
  $relType: String,
  $relTypeId: String,
`;

const commonVariables = `
  mainType: $mainType,
  mainTypeId: $mainTypeId,
  relType: $relType,
  relTypeId: $relTypeId,
`;

const commonCreateFields = `
  $mainType: String,
  $mainTypeId: String,
  $relType: String,
  $relTypeIds: [String],
  $proccessId: String
`;

const commonCreateVariables = `
  mainType: $mainType,
  mainTypeId: $mainTypeId,
  relType: $relType,
  relTypeIds: $relTypeIds,
  proccessId: $proccessId
`;

const conformityAdd = `
  mutation conformityAdd(${commonFields}) {
    conformityAdd(${commonVariables}) {
      _id
    }
  }
`;

const conformityEdit = `
  mutation conformityEdit(${commonCreateFields}) {
    conformityEdit(${commonCreateVariables}) {
      success
    }
  }
`;

export default {
  conformityAdd,
  conformityEdit
};
