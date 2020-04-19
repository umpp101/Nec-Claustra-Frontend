const url = "http://localhost:3000"

export const fetchMyConvos = async (currentUser) => {
    try {
        const response = await fetch(`${url}/users/${currentUser.id}/conversations`)
        const apiData = await response.json()
        return apiData.conversations
    } catch (error) {
        console.log(error)
    }
}
