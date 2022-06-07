export const fetchPost = (url: string, payload: any): Promise<any> => {
    return fetch(url, {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
    }).then((response) => {
        return response.json()
    }).catch((e) => {
        console.error(e)
    })
}

export const fetchGet = (url: string): Promise<any> => {
    return fetch(url)
        .then((response) => {
            return response.json()
        }).catch((e) => {
            console.error(e)
        })
}