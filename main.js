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

function isValid(array) {
    let valid = false
    array.split(";").forEach(e => {
        if (e == getDnesek(0)) {
            valid = true
        }
    })
    return valid
}

function getDnesek(add = 0) {
    let date = new Date()
    let dt = (date.getUTCDate() + add).toString() + date.getMonth().toString() + date.getUTCFullYear().toString()

    return dt
}

function setBg(bg) {
    data.save("background",bg)
}

function deleteTodo(id) {
    _data.todos = _data.todos.filter(e => e.id !== id)
    data.save("data", JSON.stringify(_data))
    document.getElementById("item-box-" + id).remove()
    reloadTextTodos()
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
    if (_tm.split(";")[0] == getDnesek(0) || _tm.split(";")[1] == getDnesek(0)) {
        let add = ""
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
            <span class="txt"><span class="material-symbols-outlined">
                    delete
                </span></span>
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
function resetStyles() {
    data.save("hue", "120")
    data.save("style", "dark")
    data.save("hue2", "350")
    window.location.reload()
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

function setHue() {
    setHueReal()
    frawem.set("hue", document.getElementById("hue").value)
    data.save("hue", document.getElementById("hue").value)


    frawem.set("hue2", document.getElementById("hue2").value)
    data.save("hue2", document.getElementById("hue2").value)
}

function setTheme2(d = "dark") {
    data.save("ttheme", d)
}

window.onload = () => {
    try {
        reloadTodos()
    } catch {

    }

    try {
        let myTheme = data.get("theme") || "superdark"
        let myTheme2 = data.get("ttheme") || "dark"
        console.log(myTheme)

        let myHue = data.get("hue") || 120
        let myHue2 = data.get("hue2") || 350
        myHue = myHue.toString()
        myHue2 = myHue2.toString()
        if (!window.location.pathname.includes("settings")) {
            // LOAD THEMES
            switch (myTheme.toLocaleLowerCase()) {
                case "superdark":
                    _import("./styles/superdark.css")
                    break
                case "colored1":
                    _import("./styles/colored1.css")
                    if (data.get("ttheme") == "light") {
                        _import("./styles/tnwhite.css")
                    } else {
                        _import("./styles/tndark.css")
                    }
                    break
                case "colored2":
                    _import("./styles/colored1.css")
                    _import("./styles/colored2.css")
                    break
                
                case "colored3":
                        _import("./styles/colored1.css")
                        _import("./styles/tndark.css")
                        _import("./styles/colored3.css")
                        document.head.innerHTML+=`<style>
                        body{background:url("${data.get("background") || "./images/photo1.jpeg"}") no-repeat center center fixed;
                        -webkit-background-size: cover;
                        -moz-background-size: cover;
                        -o-background-size: cover;
                        background-size: cover;
                        }</style>`
                        break
                default:
                    _import("./styles/dark.css")
                    break
            }

            console.log(myHue)


            document.head.innerHTML += `<style>
            :root {
                --hue: ${myHue};
                --hue2: ${myHue2};
            }
            </style>`
            return
        }

        _import("./styles/superdark.css")
        document.getElementById("hue").value = myHue
        document.getElementById("hue2").value = myHue2
        setHue()
        frawem.set("hue", document.getElementById("hue").value)
        switch (myTheme.toLocaleLowerCase()) {
            case "superdark":
                document.getElementById("inp2").checked = true
                break

            case "dark":
                document.getElementById("inp1").checked = true
                break


            case "colored1":
                document.getElementById("inp3").checked = true
                break



            case "colored2":
                document.getElementById("inp4").checked = true
                break

            

            case "colored3":
                    document.getElementById("inp5").checked = true
                    break
    


            default:
                document.getElementById("inp1").checked = true
                break
        }
        switch (myTheme2.toLocaleLowerCase()) {
            case "light":
                document.getElementById("tn2").checked = true
                break
            default:
                document.getElementById("tn1").checked = true
                break
        }
        frawem.valid()
    } catch (error) {
        console.log(error)
    }
}
