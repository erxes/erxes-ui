import React from "react";

type ICategory = {
  _id: string;
  order: string;
  code?: string;
  name: string;
}

export const generateCategoryOptions = (
  categories: ICategory[],
  currentCategoryId?: string
) => {
  const result: React.ReactNode[] = [];

  for (const category of categories) {
    const order = category.order;

    const foundedString = order.match(/[/]/gi);

    let space = '';

    if (foundedString) {
      space = '\u00A0 '.repeat(foundedString.length);
    }

    if (currentCategoryId !== category._id) {
      result.push(
        <option key={category._id} value={category._id}>
          {space}
          {category.code ? `${category.code} - ` : ''}
          {category.name}
        </option>
      );
    }
  }

  return result;
};