
// document.cookie = "reference = 5";
localStorage.setItem("references", "5");

window.onload = function(){
    listReferences();
    localStorage.removeItem("auth_num");
}
// function getCookie(name) {
//     var cookies = document.cookie;
//     cookies = decodeURIComponent(cookies);
//     cookie_list = cookies.split(';')
//     for (let i = 0; i <= cookie_list.length; i++) {
//         let current_cookie = cookie_list[i].split('=')[0]
//         let fix_cookie = ''
//         let cookie_value = cookie_list[i].split('=')[1]
//         for (let p = 0; p < current_cookie.length; p++) {
//             if (current_cookie[p] != ' ') {
//                 fix_cookie += current_cookie[p]
//             }
//         }
//         if (fix_cookie == name){
//             return cookie_value
//         }
//     }
// }
function listReferences() {
    // let ref_num = parseInt(getCookie('reference'))
    if (document.getElementById("reference-list")) {
        let ref_num = parseInt(localStorage.getItem("references"));
        
        for (let i = 1; i < ref_num + 1; i++) {
            let article = document.createElement("article");
            article.innerHTML = "<p>Reference " + i + "</p> <p> (Insert title / reference here)</p>";
            document.getElementById("reference-list").appendChild(article);
    }
}  
}
function storeBook(form) {
    // Add localstorage book reference data in JSON format
    if (localStorage.getItem("book_num")) {
        localStorage.setItem("book_num", (parseInt(localStorage.getItem("book_num")) + 1).toString());
    }
    else {
        localStorage.setItem("book_num", "1");
    }
    let auth_range = [...Array(parseInt(localStorage.getItem("auth_num"))).keys()];
    var el = form.elements;
    let out = {
            url: '',
            auth_first:  {},
            auth_last: {}
        }
    for (let i=0; i < el.length; i++) {
        if (el[i].name == "url"){
            out.url=el[i].value;
        }
        let auth_num = el[i].name.split(':')[0]
        if ((auth_num in auth_range)) {
            if (el[i].name.split(':')[1] == "auth_first"){
                out.auth_first[auth_num] = el[i].value;
        }
        if (el[i].name.split(':')[1] == "auth_last"){
            out.auth_last[auth_num] = el[i].value;
        }
    }
        
        // if name = title, page, etc.
        
    }
    localStorage.setItem("book_"+localStorage.getItem("book_num"), JSON.stringify(out));
    alert(localStorage.getItem("book_"+localStorage.getItem("book_num")));
}

function showElement(id) {
    let element = document.getElementById(id);
    if (element.style.display == "none") {
        element.style.display = "block";
        
    }
    else {
        element.style.display = "none";
        element.value = ""
    }
}

function addAuthor() {
    if (localStorage.getItem("auth_num") === null) {
        localStorage.setItem("auth_num", "1");
    }
    let button = document.getElementById("add_auth");
    button.insertAdjacentHTML("beforebegin", '<input type="text" name="' + localStorage.getItem('auth_num') + ':auth_first"> <input type="text" name="' + localStorage.getItem('auth_num') + ':auth_last"> </br>');
    localStorage.setItem("auth_num", (parseInt(localStorage.getItem('auth_num')) + 1).toString());
}