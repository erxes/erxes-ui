import { IBrand, QueryResponse } from '../types';
export interface IOnboardingHistory {
  _id: string;
  userId: string;
  isCompleted?: boolean;
  completedSteps: string[];
}

export interface IEmailSignature {
  brandId?: string;
  signature?: string;
}

export interface IUserDetails {
  avatar?: string;
  fullName?: string;
  shortName?: string;
  description?: string;
  position?: string;
  location?: string;
  operatorPhone?: string;
}

export interface IUserLinks {
  facebook?: string;
  twitter?: string;
  linkedIn?: string;
  youtube?: string;
  github?: string;
  website?: string;
}

export interface IUserConversation {
  list: any[];
  totalCount: number;
}

export interface IUserDoc {
  createdAt?: Date;
  username: string;
  email: string;
  isActive?: boolean;
  details?: IUserDetails;
  isOwner?: boolean;
  status?: string;
  links?: IUserLinks;
  getNotificationByEmail?: boolean;
  participatedConversations?: IUserConversation[];
  permissionActions?: string[];
  configs?: any;
  configsConstants?: any;
}

export interface IUser extends IUserDoc {
  _id: string;
  brands?: IBrand[];
  emailSignatures?: IEmailSignature[];
  onboardingHistory?: IOnboardingHistory;
}

export type AllUsersQueryResponse = {
  allUsers: IUser[];
} & QueryResponse;

export type CurrentUserQueryResponse = {
  currentUser: IUser;
  loading: boolean;
};

export type UsersQueryResponse = {
  users: IUser[];
} & QueryResponse;
