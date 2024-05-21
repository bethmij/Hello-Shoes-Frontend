export const isAuthenticated = () => {
    // localStorage.removeItem('accessToken');
    const token = localStorage.getItem('accessToken')


    return !!token
}

export const isAdmin = () => {
    const role = localStorage.getItem('role')
    return role === "ADMIN"
}