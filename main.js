var data = {
    save: (key, value) => {
        return localStorage.setItem(key, value)
    },
    get: (key) => {
        if (localStorage.getItem(key) == "null" || !localStorage.getItem(key)) {
            return null
        }
        return localStorage.getItem(key) || null
    }
}
var il = 0
var _data = JSON.parse(data.get("data") && data.get("data") !== "undefined" ? data.get("data") : JSON.stringify({
    todos: [{}]
}))

var _import = async (url) => {
    document.querySelector("head").innerHTML += `<link rel="stylesheet" href="${url}">`
}

var _import_src = (url) => `<link rel="stylesheet" href="${url}">`

function isValid(array) {
    let valid = false
    array.split(";").forEach(e => {
        if (e == getDnesek(0)) {
            valid = true
        }
    })
    return valid
}

function removeLast() {
    localStorage.removeItem("last")
}

function addOldTodo() {
    let v = !!data.get("last") && data.get("last") != "undefined" ? data.get("last") || "nic" : "nic"
    alert(v)
}

function setFocusHue(num = 0) {
    data.save("focushue", `${num}`)
}

function getDnesek(add = 0) {
    let date = new Date()
    let dt = (date.getUTCDate() + add).toString() + date.getMonth().toString() + date.getUTCFullYear().toString()

    return dt
}

function setBg(bg) {
    localStorage.setItem("background", bg)
}

function deleteTodo(id) {
    _data.todos = _data.todos.filter(e => {
        if (e.id == id) {
            data.save("last", e.text || "")
        }
        return e.id !== id
    })
    data.save("data", JSON.stringify(_data))
    document.getElementById("item-box-" + id).remove()
    reloadTextTodos()
}

function highlight(text) {
    // number
    "0123456789".split("").forEach(n => {
        text = text.split(n).join(`<span class='txnumber'>${n}</span>`)
    })

    text = text.split(" ").map(word => {
        if (word.startsWith("++")) word = `<span class='txcategory'>${word.replace(/\_/gi, " ").replace("++", "")}</span>`
        return word == word.toLocaleUpperCase() && word.length > 2.9 ? `<span class='txuppercase'>${word}</span>` : word
    }).join(" ")

    return text
}

function addTodo(text = "Null", save = true, _i = il, _tm, addd = true) {
    if (!_tm) _tm = getDnesek(0)
    if (_i == il) _i++
    il++
    if (text == "Null") {
        if (!document.getElementById("inputadd").value) {
            return 0
        }
        text = document.getElementById("inputadd").value
        document.getElementById("inputadd").value = ""
    }
    text = highlight(text)
    if (_tm.split(";")[0] == getDnesek(0) || _tm.split(";")[1] == getDnesek(0)) {
        let add = ""
        // if((il < 6)) add = "focus"
        if (_tm.split(";").at(-1) == getDnesek(0) && !addd) {
            add = "focus"
        }

        document.getElementById("items").innerHTML +=
            `
        <div class="item ${add}" id="item-box-${_i}">
        <div class="text">
            ${text}
        </div>
        <div class="smazat" onclick="deleteTodo('${_i}')">
            <span class="txt"><span class="material-symbols-outlined">delete</span></span>
        </div>
    </div>`
        if (save) {
            _data.todos.push({
                id: _i.toString(),
                text,
                time: (() => {
                    let date = new Date()
                    let dt = date.getUTCDate().toString() + date.getMonth().toString() + date.getUTCFullYear().toString() + ";" + (date.getUTCDate() + 1).toString() + date.getMonth().toString() + date.getUTCFullYear().toString()
                    return dt
                })()
            })
            data.save("data", JSON.stringify(_data))
            reloadTextTodos()
        }
        return 1
    }
    return 0

}

function removeOld() {
    data.save("data", JSON.stringify({
        todos: _data.todos.filter(
            e => e.time
                && (
                    e.time.split(";")[0] == getDnesek(0)
                    || e.time.split(";")[1] == getDnesek(0)
                )
        )
    }))
    console.log("done!")
    window.location.reload()
}
function getInt(int) {
    try {
        return parseInt(int)
    } catch (error) {
        return 1
    }
}
function reloadTextTodos() {
    let l = (
        _data.todos.filter(
            e => e.time
                && (
                    e.time.split(";")[0] == getDnesek(0)
                    || e.time.split(";")[1] == getDnesek(0)
                )
        )
    ).length
    frawem.set("ideas",
        `${l > 0
            ? (
                '<span class="name">'
                + l +
                `</span> ${l == 1 ? "nápad" : (
                    l == 2 || l == 3 || l == 4 ? "nápady" : "nápadů"
                )
                }`
            ) : "<span class='nic'>žádné nápady...</span>"
        }`
    )
}
function reloadTodos() {
    reloadTextTodos()
    _data.todos.forEach(e => {
        addTodo(e.text, false, e.id, e.time, false)
    })
}
function setTheme(theme = "dark") {
    data.save("theme", theme.toLocaleLowerCase())
}

function setHueReal() {
    document.querySelector("[fvar='hue']").style.color = `hsl(${document.getElementById("hue").value},100%,50%)`
    document.querySelector(".hueIndc1").style.background = `hsl(${document.getElementById("hue").value},50%,48%)`


    document.querySelector("[fvar='hue2']").style.color = `hsl(${document.getElementById("hue2").value},100%,50%)`
    let h2 = document.getElementById("hue2").value
    document.querySelector(".hueIndc2").style.background = `linear-gradient(90deg, hsl(calc(${h2} - 10), 50%, 47%), hsl(calc(${h2} + 10), 50%, 47%))`
}

function setHighlight(tt) {
    data.save("highlight", tt)
}

function setHue3() {
    frawem.set("hue3", document.getElementById("hue3").value)
    data.save("hue3", document.getElementById("hue3").value)
}

function setHue() {
    setHueReal()
    frawem.set("hue", document.getElementById("hue").value)
    data.save("hue", document.getElementById("hue").value)


    frawem.set("hue2", document.getElementById("hue2").value)
    data.save("hue2", document.getElementById("hue2").value)
}

function setTheme3(d) {
    data.save("blurtop", d)
}

function setTheme2(d = "dark") {
    data.save("ttheme", d)
}

function _focus_color(clr) {
    return `
    .focus {border-left: ${clr} 6px solid;}`
}

function _as_css(text) {
    return `<style>${text}</style>`
}

const themes = {
    "special1": 
        _import_src("./styles/special1.css"),
    "superdark": 
        _import_src("./styles/superdark.css"),
    "colored1": 
        _import_src("./styles/colored1.css") + 
        (data.get("ttheme") == "light" ?
        _import_src("./styles/tnwhite.css") : _import_src("./styles/tndark.css")),
    "colored2": 
        _import_src("./styles/colored1.css") + 
        _import_src("./styles/colored2.css"),
    "colored3":
        _import_src("./styles/colored1.css") +
        _import_src("./styles/tndark.css") +
        _import_src("./styles/colored3.css") +
        `<style>
            body{
                background:url("${data.get("background") || "./images/photo1.jpeg"}") no-repeat center center fixed;
                -webkit-background-size: cover;
                -moz-background-size: cover;
                -o-background-size: cover;
                background-size: cover;
            }
        </style>
        `,
    "catppuccin": 
        _import_src("./styles/catppuccin.css"),
    "catppuccin_green":
        _import_src("./styles/catppuccin.css") + 
        _as_css(_focus_color("#a6da95")),
    "catppuccin_purple":
        _import_src("./styles/catppuccin.css") + 
        _as_css(_focus_color("#c6a0f6")),
    "catppuccin_blue":
        _import_src("./styles/catppuccin.css") + 
        _as_css(_focus_color("#8aadf4")),

    "forest":
        _import_src("./styles/catppuccin.css") + 
        _import_src("./styles/forest.css"),

    
    "ocean":
        _import_src("./styles/catppuccin.css") + 
        _import_src("./styles/ocean.css"),
}

const themes_names = {
    "special1":           "Speciální",
    "superdark":          "Tmavý",
    "dark":               "Tmavý++",
    "colored1":           "Barevný",
    "colored2":           "Animovaný",
    "colored3":           "Fotka",
    "catppuccin":         "Catppucin",
    "catppuccin_purple":  "Catppucin Fialová",
    "catppuccin_green":   "Catppucin Zelená",
    "catppuccin_blue":    "Catppucin Modrá",
    "forest":             "Džungle",
    "ocean":              "Oceán",
}

window.onload = () => {
    try {
        reloadTodos()
    } catch {

    }

    try {
        let myTheme = data.get("theme") || "superdark"
        let myTheme2 = data.get("ttheme") || "dark"

        let myHue = data.get("hue") || 120
        let myHue2 = data.get("hue2") || 350
        myHue = myHue.toString()
        myHue2 = myHue2.toString()
        if (!window.location.pathname.includes("settings")) {
            document.head.innerHTML += themes[myTheme.toLocaleLowerCase()] || _import_src("./styles/dark.css")


            document.head.innerHTML += `
${data.get("highlight") == "true" ? _import_src("./styles/Highlight.css") : ""}
            <style>
            .item {
                font-size: ${data.get("hue3") || "22"}px !important;
            }
            :root {
                --hue: ${myHue};
                --hue2: ${myHue2};
                --focushue: ${data.get("focushue") == "1" ? `hsl(${myHue},100%,50%)` : (
                    data.get("focushue") == "2" ? (data.get("focuscolor") || "#666") : "hsl(33,100%,50%)"
                )};
            }
            
            ${data.get("blurtop") == "true" ? `
                        .title * {
                            text-shadow: #000 0 0 8px;
                        }
                        
                        .title {
                            background: #0002 !important;
                        }
                        
                        .fulladcont .addcont {
                            background: rgba(9, 9, 9, 0.933)  !important;
                        }
            ` : ""}
            
            </style>`
            return

        }
        _import("./styles/superdark.css")
       

        Object.keys(themes).forEach(Name => {
            document.getElementById("in_puts").innerHTML += `<div> <label for="inp2">${themes_names[Name]}</label>
            <input type="radio" onclick="setTheme('${Name}')" value="inp2" name="theme" id="inp${Name}"><br>  </div>`
        })

        document.getElementById("hue").value = myHue
        document.getElementById("hue2").value = myHue2
        document.getElementById("hue3").value = data.get("hue3") || 22
        setHue()
        frawem.set("hue", document.getElementById("hue").value)
        frawem.set("hue3", document.getElementById("hue3").value)
        let elem = document.getElementById(
            "inp" + data.get("theme")
        ) || document.getElementById("inp1")
        elem.checked = true

        switch (myTheme2.toLocaleLowerCase()) {
            case "light":
                document.getElementById("tn2").checked = true
                break
            default:
                document.getElementById("tn1").checked = true
                break
        }

    } catch (error) {
        console.log(error)
    }
}


function getBase64(file) {
    var reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = function () {
        setBg(reader.result.toString());
    };
    reader.onerror = function (error) {
        console.log('Error: ', error);
    };
}

var otazka = () => {
    let input = document.createElement('input');
    input.type = 'file';
    input.onchange = _ => {
        let file = input.files[0];
        getBase64(file)
    };
    input.click();
}

function setCustomFocus() {
    let input = document.createElement('input');
    input.type = 'color';
    input.onchange = _ => {
        data.save("focushue", !!input.value ? "2" : "0")
        data.save("focuscolor", input.value || "")
    };
    input.click();
}