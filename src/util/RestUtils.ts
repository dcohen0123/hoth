export const fetchPost = (url: string, payload: any): Promise<any> => {
    return fetch(url, {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
    }).then((response) => {
        response.json()
    }).catch((e) => {
        console.error(e)
    })
}