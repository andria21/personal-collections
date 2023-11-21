export const isAdmin = (isLoading, data, session) => {
    if (!isLoading) {
        const user = data.filter((u) => u.email === session.data?.user.email);
        const isUserAdmin = user?.some((u) => u.isAdmin);
        return isUserAdmin;
  }
};
