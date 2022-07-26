
window.onload = function () {
    localStorage.setItem("auth_num", "1");
    if (localStorage.getItem("edit") != undefined) {
        if (document.location.pathname == "/generate_reference/" + localStorage.getItem("edit").split('_')[0] + ".html") {
            editReference()
        }
    }
    if (document.location.pathname == "/Referencing_Generator.html") {
        listReferences();
    }

}

function sortReferences() {

    // Create array of references
    references = []
    journal_num = parseInt(localStorage.getItem("journal_num"));
    for (journal_num > 1; journal_num--;) {
        journal_num += 1
        references.push(["journal_" + journal_num.toString(), JSON.parse(localStorage.getItem("journal_" + journal_num.toString()))])
        journal_num -= 1
    }
    book_num = parseInt(localStorage.getItem("book_num"));
    for (book_num > 1; book_num--;) {
        book_num += 1
        references.push(["book_" + book_num.toString(), JSON.parse(localStorage.getItem("book_" + book_num.toString()))])
        book_num -= 1
    }
    website_num = parseInt(localStorage.getItem("website_num"));
    for (website_num > 1; website_num--;) {
        website_num += 1
        references.push(["website_" + website_num.toString(), JSON.parse(localStorage.getItem("website_" + website_num.toString()))])
        website_num -= 1
    }
    references.sort(
        // sorts the references by last names and by corporate names if available, and if the last names share the same first letter, the first name is used.
        function (a, b) {
            if (a[1].corporate != '' & a[1].corporate != undefined) {
                a[1].auth_last["1"] = a[1].corporate
                a[1].auth_first["1"] = "corporate" // placeholder name used on both auth first names so matching corp authors are sorted by year.
            }
            if (b[1].corporate != '' & b[1].corporate != undefined) {
                b[1].auth_last["1"] = b[1].corporate
                b[1].auth_first["1"] = "corporate"
            }

            if (a[1].auth_last["1"].split('')[0] != b[1].auth_last["1"].split('')[0]) {
                return a[1].auth_last["1"].toUpperCase().charCodeAt(0) - b[1].auth_last["1"].toUpperCase().charCodeAt(0) // ascending order
            }
            else {
                if (a[1].auth_first["1"].split('')[0] != b[1].auth_first["1"].split('')[0]) {
                    return a[1].auth_first["1"].toUpperCase().charCodeAt(0) - b[1].auth_last["1"].toUpperCase().charCodeAt(0)
                }
                else {
                    return b[1].year - a[1].year // descending order
                }

                // What if it is the same auth and same yea?r (year numbering feature not included)
            }
        })
    return references
}

function editReference() {
    let reference = localStorage.getItem("edit")
    localStorage.removeItem("edit")
    let ref_type = reference.split('_')[0];
    let ref_num = reference.split('_')[1];
    let references = JSON.parse(localStorage.getItem(reference)) // Get reference lis
    localStorage.setItem("auth_num", Object.keys(references.auth_first).sort()[0])

    for (let i = 0; i <= Object.keys(references).length; i++) {
        let id = Object.keys(references)[i];
        if (id != 'auth_first' & id != 'auth_last') {
            if (id) {
                let element = document.getElementById(id)
                element.value = references[id]
            }
        }
    }
    let first = document.getElementById('1:auth_first');
    let last = document.getElementById('1:auth_last');
    first.value = references.auth_first[1];
    last.value = references.auth_last[1];
    if (Object.keys(references.auth_first).length > 1) {
        for (let i = 1; i < Object.keys(references.auth_first).length; i++) {
            i += 1
            addAuthor()
            let first = document.getElementById(i + ':auth_first');
            let last = document.getElementById(i + ':auth_last');
            first.value = references.auth_first[i];
            last.value = references.auth_last[i];
            i -= 1
        }
    }
    let submit = document.getElementById("submit")

    if (ref_type == 'journal') {
        submit.insertAdjacentHTML("beforebegin", '<input type="button" value="Submit" id="submit" onclick="storeJournal(this.form, ' + ref_num + ');window.location.pathname = ' + "'" + '../Referencing_Generator.html' + "'" + '; return false;"/>')
    }
    if (ref_type == 'book') {
        submit.insertAdjacentHTML("beforebegin", '<input type="button" value="Submit" id="submit" onclick="storeBook(this.form, ' + ref_num + ');window.location.pathname = ' + "'" + '../Referencing_Generator.html' + "'" + '; return false;"/>')
    }
    if (ref_type == 'website') {
        submit.insertAdjacentHTML("beforebegin", '<input type="button" value="Submit" id="submit" onclick="storeWebsite(this.form, ' + ref_num + ');window.location.pathname = ' + "'" + '../Referencing_Generator.html' + "'" + '; return false;"/>')
    }
    submit.remove()

}

function generateDocx() {
    references = sortReferences();
    let ref_list = []

    for (let i = 0; i <= references.length - 1; i++) {
        let ref_type = references[i][0].split('_')[0];
        let ref_data = references[i][1]
        let auth_list = '';
        if (ref_data.corporate) {
            auth_list += ref_data.corporate
        }
        else {
            if (Object.keys(ref_data.auth_last).length > 0) {

                auth_list += ref_data.auth_last["1"] + ", " + ref_data.auth_first["1"].split('')[0] + '.'
                for (let auth = Object.keys(ref_data.auth_last).length; auth > 1; auth--) {
                    auth_list += ' & ' + ref_data.auth_last[auth.toString()] + ", " + ref_data.auth_first[auth.toString()].split('')[0] + '.'
                }
            }
        }

        if (ref_type == "journal") {
            let ref = new docx.Paragraph({
                font: "Calibri (Body)",
                indent: {
                    left: 720,
                    hanging: 720
                },

                children: [
                    new docx.TextRun({
                        text: auth_list + " (" + ref_data.year + "). " + ref_data.title + ". ",
                        font: "Calibri (Body)"
                    }),
                    new docx.TextRun({
                        font: "Calibri (Body)",
                        text: ref_data.journal_title + ', ' + ref_data.volume,
                        italics: true,
                    }),
                    new docx.TextRun({
                        font: "Calibri (Body)",
                        text: " (" + ref_data.issue + "), " + ref_data.pages + ". " + ref_data.doi
                    })
                ]
            });
            ref_list.push(ref);
        }
        if (ref_type == "book") {
            let ref = new docx.Paragraph({
                font: "Calibri (Body)",
                indent: {
                    left: 720,
                    hanging: 720
                },

                children: [
                    new docx.TextRun({
                        text: auth_list + " (" + ref_data.year + "). ",
                        font: "Calibri (Body)"
                    }),
                    new docx.TextRun({
                        font: "Calibri (Body)",
                        text: ref_data.title + ". ",
                        italics: true,
                    }),
                    new docx.TextRun({
                        font: "Calibri (Body)",
                        text: ref_data.publisher + '. ' + ref_data.url
                    })
                ]
            });
            ref_list.push(ref);
        }
        if (ref_type == "website") {
            let ref = new docx.Paragraph({
                font: "Calibri (Body)",
                indent: {
                    left: 720,
                    hanging: 720
                },

                children: [
                    new docx.TextRun({
                        text: auth_list + " (" + ref_data.year + "). ",
                        font: "Calibri (Body)"
                    }),
                    new docx.TextRun({
                        font: "Calibri (Body)",
                        text: ref_data.title + '. ',
                        italics: true,
                    }),
                    new docx.TextRun({
                        font: "Calibri (Body)",
                        text: ref_data.url + '.'
                    })
                ]
            });
            ref_list.push(ref);
        }
    }

    const doc = new docx.Document({
        sections: [
            {
                properties: {
                    page: {
                        width: docx.convertInchesToTwip(8.5),
                        height: docx.convertInchesToTwip(11),
                        margin: {
                            top: 1440,
                            right: "1in",
                            bottom: 1440,
                            left: "1in",
                        },
                    },
                },
                children: ref_list,
            },
        ],
    });

    docx.Packer.toBlob(doc).then(blob => {
        saveAs(blob, "My-References.docx");
    });

}

function getSortable() {
    // Returns the Sortable value from #TODO
}

function listReferences() {
    let references = sortReferences()
    for (let i = 0; i <= references.length - 1; i++) {
        let ref_data = references[i][1]
        let ref_type = references[i][0].split('_')[0]
        let article = document.createElement("article");
        let auth_list = '';
        if (ref_data.corporate) {
            auth_list += ref_data.corporate
        }
        else {
            if (Object.keys(ref_data.auth_last).length > 0) {

                auth_list += ref_data.auth_last["1"] + ", " + ref_data.auth_first["1"].split('')[0] + '.'
                for (let auth = Object.keys(ref_data.auth_last).length; auth > 1; auth--) {
                    auth_list += ' & ' + ref_data.auth_last[auth.toString()] + ", " + ref_data.auth_first[auth.toString()].split('')[0] + '.'
                }
            }
        }
        i += 1
        if (ref_type == "journal") {
            article.innerHTML = "<input type='button' value='Edit Reference' onclick='document.location.pathname = " + '"./generate_reference/journal.html";' + "localStorage.setItem(" + '"edit", "' + references[i - 1][0] + '"' + "); return false;'><h3>Reference " + i + " (Journal)</h3> <p>" + auth_list + " (" + ref_data.year + "). " + ref_data.title + ". <em>" + ref_data.journal_title + ', ' + ref_data.volume + "</em>" + " (" + ref_data.issue + "), " + ref_data.pages + ". " + ref_data.doi + "</p>";
        }
        if (ref_type == "book") {
            article.innerHTML = "<input type='button' value='Edit Reference' onclick='document.location.pathname = " + '"./generate_reference/book.html";' + "localStorage.setItem(" + '"edit", "' + references[i - 1][0] + '"' + "); return false;'><h3>Reference " + i + " (Book)</h3> <p>" + auth_list + " (" + ref_data.year + "). <em>" + ref_data.title + ". </em>" + ref_data.publisher + '. ' + ref_data.url
        }
        if (ref_type == "website") {
            article.innerHTML = "<input type='button' value='Edit Reference' onclick='document.location.pathname = " + '"./generate_reference/website.html";' + "localStorage.setItem(" + '"edit", "' + references[i - 1][0] + '"' + "); return false;'><h3>Reference " + i + " (Website)</h3> <p>" + auth_list + " (" + ref_data.year + "). <em>" + ref_data.title + '. </em>' + ref_data.url + '.'
        }
        i -= 1
        document.getElementById("reference-list").appendChild(article);
    }
}

function storeJournal(form, edit) {
    // Add local storage journal reference data in JSON format

    if (localStorage.getItem("journal_num")) {
        localStorage.setItem("journal_num", (parseInt(localStorage.getItem("journal_num")) + 1).toString());
    }
    else {
        localStorage.setItem("journal_num", "1");
    }
    let auth_range = [...Array(parseInt(localStorage.getItem("auth_num")) + 1).keys()];
    var el = form.elements;
    let out = {
        doi: '',
        title: '',
        journal_title: '',
        volume: '',
        issue: '',
        pages: '',
        year: '',
        auth_first: {},
        auth_last: {}
    }
    for (let i = 0; i < el.length; i++) {
        if (el[i].name == "doi") {
            out.doi = el[i].value;
        }
        if (el[i].name == "title") {
            out.title = el[i].value;
        }
        if (el[i].name == "year") {
            out.year = el[i].value;
        }
        if (el[i].name == "journal_title") {
            out.journal_title = el[i].value;
        }
        if (el[i].name == "volume") {
            out.volume = el[i].value;
        }
        if (el[i].name == "issue") {
            out.issue = el[i].value;
        }
        if (el[i].name == "pages") {
            out.pages = el[i].value;
        }
        let auth_num = el[i].name.split(':')[0]
        if ((auth_num in auth_range)) {
            if (el[i].name.split(':')[1] == "auth_first") {
                out.auth_first[auth_num] = el[i].value;
            }
            if (el[i].name.split(':')[1] == "auth_last") {
                out.auth_last[auth_num] = el[i].value;
            }
        }

    }
    if (edit == undefined) {
        localStorage.setItem("journal_" + localStorage.getItem("journal_num"), JSON.stringify(out));
    } else {
        localStorage.setItem("journal_" + edit, JSON.stringify(out));
        localStorage.setItem('journal_num', (parseInt(localStorage.getItem('journal_num')) - 1).toString())
    }
}
function storeBook(form, edit) {
    // Add localstorage book reference data in JSON format
    if (localStorage.getItem("book_num")) {
        localStorage.setItem("book_num", (parseInt(localStorage.getItem("book_num")) + 1).toString());
    }
    else {
        localStorage.setItem("book_num", "1");
    }
    let auth_range = [...Array(parseInt(localStorage.getItem("auth_num")) + 1).keys()];
    var el = form.elements;
    let out = {
        url: '',
        title: '',
        year: '',
        publisher: '',
        auth_first: {},
        auth_last: {}
    }
    for (let i = 0; i < el.length; i++) {
        if (el[i].name == "url") {
            out.url = el[i].value;
        }
        if (el[i].name == "title") {
            out.title = el[i].value;
        }
        if (el[i].name == "year") {
            out.year = el[i].value;
        }
        if (el[i].name == "publisher") {
            out.publisher = el[i].value;
        }
        let auth_num = el[i].name.split(':')[0]
        if ((auth_num in auth_range)) {
            if (el[i].name.split(':')[1] == "auth_first") {
                out.auth_first[auth_num] = el[i].value;
            }
            if (el[i].name.split(':')[1] == "auth_last") {
                out.auth_last[auth_num] = el[i].value;
            }
        }

    }
    if (edit == undefined) {
        localStorage.setItem("book_" + localStorage.getItem("book_num"), JSON.stringify(out));
    } else {
        localStorage.setItem("book_" + edit, JSON.stringify(out));
        localStorage.setItem('book_num', (parseInt(localStorage.getItem('book_num')) - 1).toString())
    }
}
function storeWebsite(form, edit) {
    // Add localstorage book reference data in JSON format
    if (localStorage.getItem("website_num")) {
        localStorage.setItem("website_num", (parseInt(localStorage.getItem("website_num")) + 1).toString());
    }
    else {
        localStorage.setItem("website_num", "1");
    }
    let auth_range = [...Array(parseInt(localStorage.getItem("auth_num")) + 1).keys()];
    var el = form.elements;
    let out = {
        url: '',
        title: '',
        year: '',
        corporate: '',
        auth_first: {},
        auth_last: {}
    }
    for (let i = 0; i < el.length; i++) {
        if (el[i].name == "url") {
            out.url = el[i].value;
        }
        if (el[i].name == "title") {
            out.title = el[i].value;
        }
        if (el[i].name == "year") {
            out.year = el[i].value;
        }
        if (el[i].name == "corporate") {
            out.corporate = el[i].value;
        }
        let auth_num = el[i].name.split(':')[0]
        if ((auth_num in auth_range)) {
            if (el[i].name.split(':')[1] == "auth_first") {
                out.auth_first[auth_num] = el[i].value;
            }
            if (el[i].name.split(':')[1] == "auth_last") {
                out.auth_last[auth_num] = el[i].value;
            }
        }

    }
    if (edit == undefined) {
        localStorage.setItem("website_" + localStorage.getItem("website_num"), JSON.stringify(out));
    } else {
        localStorage.setItem("website_" + edit, JSON.stringify(out));
        localStorage.setItem('website_num', (parseInt(localStorage.getItem('website_num')) - 1).toString())
    }
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
    localStorage.setItem("auth_num", (parseInt(localStorage.getItem('auth_num')) + 1).toString());
    let button = document.getElementById("add_auth");
    button.insertAdjacentHTML("beforebegin", '<input type="text" placeholder="Insert Author First Name"name="' + localStorage.getItem('auth_num') + ':auth_first" id="' + localStorage.getItem('auth_num') + ':auth_first"> <input type="text" placeholder="Insert Author Last Name" name="' + localStorage.getItem('auth_num') + ':auth_last" id="' + localStorage.getItem('auth_num') + ':auth_last"><br id="' + localStorage.getItem('auth_num') + ':br">');

}

function removeAuthor() {
    let current_auth = localStorage.getItem("auth_num")
    let first = document.getElementById(current_auth + ":auth_first")
    let last = document.getElementById(current_auth + ":auth_last")
    let br = document.getElementById(current_auth + ":br")
    first.remove()
    last.remove()
    br.remove()
    localStorage.setItem("auth_num", (parseInt(current_auth) - 1).toString())
}