export type Categories = {
  name: string;
  imageUrl: string;
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

export type ProductType = {
  _id: string;
  name: string;
  description: string;
  price: number;
  unit: string;
  stock: number;
  category: string;
  discountPrice: number;
  totalReviews: number;
  rating: number;
  images: string[];
};

export type userType = {
  _id: string;
  email: string;
  profilePic: string;
  isVerified: boolean;
  isLogin: boolean;
  createdAt: Date;
  updatedAt: Date;
  username: string;
  lastLogin: Date;
};
