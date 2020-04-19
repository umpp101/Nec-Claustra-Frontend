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

export const newConvo = async(receiver, currentUser) =>{
    try {
        const fetchUrl = (`${url}/users/${currentUser.id}/conversations`);
        const settings = {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json"
          },
          body: JSON.stringify({
            conversation: {
              sender_id: currentUser.id,
              receiver_id: receiver.id
            }
          })
        };
        const response = await fetch(fetchUrl, settings);
        const postData = await response.json();
        return postData.conversation
    } catch (error) {
        console.log(error)
    }
}
export const deleteConvo = async(convo) =>{
    try {
        const fetchUrl = (`${url}/conversations/${convo.id}`);
        const response = await fetch(fetchUrl,  {method: 'DELETE'});
        const postData = await response.json();
        return postData
    } catch (error) {
        console.log(error)
    }
}






