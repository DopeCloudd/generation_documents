import { authClient } from "@/lib/auth-client";

export const getAllUsers = async () => {
  const users = await authClient.admin.listUsers({
    query: {
      sortBy: "createdAt",
    },
  });
  return users.data?.users || [];
};

export const createUser = async (
  name: string,
  email: string,
  password: string
) => {
  const user = await authClient.admin.createUser({
    name: name,
    email: email,
    password: password,
    role: "user",
  });
  return user.data;
};

export const deleteUser = async (userId: string) => {
  const deletedUser = await authClient.admin.removeUser({
    userId: userId,
  });
  if (!deletedUser.data) {
    return false;
  } else {
    return true;
  }
};
