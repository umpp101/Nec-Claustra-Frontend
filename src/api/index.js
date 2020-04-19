const url = "http://localhost:3000"

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
