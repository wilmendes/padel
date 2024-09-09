import type { InferInsertModel, InferSelectModel } from "drizzle-orm";
import type { oauthAccounts, users } from "src/schema";

type ReplaceNullWithUndefined<T> = {
  [k in keyof T]: null extends T[k] ? Exclude<T[k], null> | undefined : T[k];
};


export type UserEmailLoginInfo = {
  email: string;
  password: string;
};

export type GoogleUser = {
  sub: string;
  name: string;
  given_name: string;
  family_name: string;
  picture: string;
  email: string;
  email_verified: boolean;
};

export type AutoFilledProperties =
  | "id"
  | "createdAt"
  | "updatedAt"
  | "recoverToken";

export type UserDB = InferSelectModel<typeof users>;

export type CreateUserInfo = ReplaceNullWithUndefined<
  Omit<InferInsertModel<typeof users>, AutoFilledProperties>
>;

export type CreateUserEmailInfo = CreateUserInfo &
  Required<Pick<CreateUserInfo, "password">>;

export type CreateUserOAuthInfo = Omit<
  CreateUserInfo & InferInsertModel<typeof oauthAccounts>,
  AutoFilledProperties | "password" | "userId"
>;

export type UserInfo = Omit<UserDB, AutoFilledProperties | "password">;

export type UserForm = ReplaceNullWithUndefined<UserInfo>;
