interface defaultResponse { 
    status : number
    data : any
    error : boolean
}

export function getDefaultResponse(status : number, data : any, error : boolean) : defaultResponse {
    return {
        status,
        data,
        error
    }
}
