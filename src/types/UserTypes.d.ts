export interface UserData {
  id: string;
  aud: string;
  role: string;
  app_metadata: AppMetadata;
  provider: string;
  providers: string[];
  identities: Identity[];
  email: string;
  created_at: string;
  identity_data: IdentityData;
  last_sign_in_at: string;
  phone: string;
  updated_at: string;
  user_metadata: UserMetadata;
}

interface UserMetadata {
  avatar: string;
  email: string;
  email_verified: boolean;
  phone_verified: boolean;
  sub: string;
  username: string;
}

interface AppMetadata {
  provider: string;
  providers: string[];
}

interface Identity {
  identity_id: string;
  id: string;
  created_at: string;
  email: string;
  identity_data: IdentityData;
  last_sign_in_at: string;
  provider: string;
  updated_at: string;
  user_id: string;
}

interface IdentityData {
  email: string;
  email_verified: boolean;
  phone_verified: boolean;
  sub: string;
}
