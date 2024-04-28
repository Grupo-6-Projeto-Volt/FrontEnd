function existeToken(){
    return sessionStorage.length !== 0 && sessionStorage.TOKEN !== ""
}

export default existeToken