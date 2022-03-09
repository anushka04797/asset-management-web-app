export const is_logged_in = () => {
    if (sessionStorage.getItem('access-token') != null && sessionStorage.getItem('access-token') != undefined) {
        return true
    }
    return false
}
export const colors=[
    '#FFFF00','#00FF00'
]


export function capitalizeFirstLetter(string="") {
    return (string!=null && string.length>0) ? string.charAt(0).toUpperCase() + string.slice(1):''
}