import { getConstantFromStore } from '../utils';

export const COMPANY_INDUSTRY_TYPES = () => {
  return getConstantFromStore('company_industry_types', false, true);
};

export const COMPANY_BUSINESS_TYPES = [
  'Competitor',
  'Customer',
  'Investor',
  'Partner',
  'Press',
  'Prospect',
  'Reseller',
  'Other'
];
