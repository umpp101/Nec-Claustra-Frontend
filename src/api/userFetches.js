const url = "http://localhost:3000"


export const reAuth = async () => {
    try {
        const settings = {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
                'Authorization': localStorage.getItem("token")
            }
        };
        const response = await fetch(`${url}/reAuth`, settings)
        const apiData = await response.json();
        const currentUser = apiData.user.data.attributes
        return currentUser
    } catch (error) {
        console.log(error)
    }
}


export const fetchUsers = async () => {
    try {
        const response = await fetch(`${url}/users`)
        const apiData = await response.json();
        const users = apiData.data.map(user => user.attributes)
        return users
    } catch (error) {
        console.log(error)
    }
}
