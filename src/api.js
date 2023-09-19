export const chatGPTResponse = async (message) => {
    try {
        return await fetch('http://localhost:3001/api/chatgpt/send-message', {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            method: 'POST',
            body: JSON.stringify({ message: message }),
        }).then(res => res.json())
    } catch (error) {
        console.error(error)
    }
}