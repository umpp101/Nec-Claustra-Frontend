export const getUserNameById = (id, allUsers) => {
    if (allUsers.length !== 0) {
        let user = getUserById(id, allUsers);
        return user.user_name.charAt(0).toUpperCase() + user.user_name.slice(1);
    }
};
export const getUserById = (id, allUsers) => {
    if (allUsers.length !== 0) {
        let user = allUsers.find((user) => user.id === id);
        return user;
    }
};


export const messageTime = (time) =>  {
    let realTime = new Date(time).toLocaleTimeString('en-US', {
    hour12: true,
        hour: "numeric",
        minute: "numeric"
    });
    return realTime;
}
