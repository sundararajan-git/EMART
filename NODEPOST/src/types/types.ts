export type UserType = {
  _id: string;
  email: string;
  profilePic: string;
  isVerified: boolean;
  isLogin: boolean;
  createdAt: Date;
  updatedAt: Date;
  username: string;
  lastLogin: Date;

  // CONNECT
  bio?: string;
  lastMessage?: string;
  online?: boolean;
  unreadCount?: number;
};

export type ErrorToastType = {
  response?: {
    data?: {
      message?: string;
    };
    status?: number;
  };
  message?: string;
  name?: string;
  stack?: string;
};
