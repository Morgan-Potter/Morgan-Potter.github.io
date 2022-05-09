
document.cookie = "reference = 5";
window.onload = function(){
    listReferences()
}
function getCookie(name) {
    var cookies = document.cookie;
    cookies = decodeURIComponent(cookies);
    cookie_list = cookies.split(';')
    for (let i = 0; i <= cookie_list.length; i++) {
        let current_cookie = cookie_list[i].split('=')[0]
        let fix_cookie = ''
        let cookie_value = cookie_list[i].split('=')[1]
        for (let p = 0; p < current_cookie.length; p++) {
            if (current_cookie[p] != ' ') {
                fix_cookie += current_cookie[p]
            }
        }
        if (fix_cookie == name){
            return cookie_value
        }
    }
}
function listReferences() {
    let ref_num = parseInt(getCookie('reference'))
    
    for (let i = 1; i < ref_num + 1; i++) {
        const article = document.createElement("article")
        article.innerHTML = "<p>Reference " + i + "</p> <p> (Insert title / reference here)</p>"
        document.getElementById("reference-list").appendChild(article)
    }
}  
