// load
let style = `
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;800&family=Lato:ital,wght@0,400;0,700;0,900;1,400&family=Poppins:wght@200;400&family=Roboto:ital,wght@0,300;0,400;0,500;1,400&family=Signika+Negative:wght@500;600;700&display=swap');

* {
    box-sizing: border-box;
    vertical-aling:middle;
}

.material-symbols-outlined {
    vertical-aling:middle;
}

body {
    margin: 0;
    padding: 0;
    font-family: "Roboto",sans-serif;
}
`

document.head.innerHTML += `<style>${style}</style>`

function useMaterialIcons() {
    document.head.innerHTML += `<link rel="stylesheet"
    href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@48,400,0,0" />`
}

var frawem = {
    string: "string",
    s: this.string,

    element: "element",
    elem: this.element,
    e: this.element,

    reset_elem: "reset-element",
    re: this.reset_elem,

    data: data,

    valid: function () {
        document.querySelectorAll("[show-if]").forEach(el => {
            let a = el.getAttribute("show-if").split(";")
            let t = false
            a.forEach(ael => {
                for (let i = 0; i < document.frForm.theme.length; i++) {
                    let ee = document.frForm.theme.item(i)
                    if (ee.id == ael && ee.checked) {
                        t = true
                    } else {
                        el.style.display = "none"
                    }
                    ee.addEventListener("input", e => {
                        if (e.currentTarget.id == ael) {
                            el.style.display = "inline-flex"
                        } else {
                            el.style.display = "none"
                        }
                    })
                }
            })
            if(t) el.style.display = "inline-flex"
            
        })

    },

    set: (Var = "string", Content = "content", Type = this.string) => {
        let back = true
        document.querySelectorAll("[fvar]").forEach(e => {
            if (e.getAttribute("fvar") == Var) {
                back = false
                if (Type == "element" || Type == "reset-element") {
                    if (Type == "reset-element") e.innerHTML = ""
                    e.appendChild(Content)
                } else {
                    e.innerHTML = Content
                }
            }
        })
        if (back) {
            this.dec(Var, Content, Type)
        }
    },

    dec: function (variable = "string") {
        var _txt = document.querySelector("body").innerHTML
        _txt = _txt.split(`{${variable}}`).join("<span fvar='" + variable + "'></span>")
        document.querySelector("body").innerHTML = _txt
    }
}

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

var mkit = {
    cycle: (n, m) => {
        return ((n / m) - Math.floor(n / m)) * m
    },

    round: (x) => {
        return Math.round(x)
    },

    min: (x, min) => {
        if (x < min) return 0
        else return x - min
    },

    max: (x, max) => {
        if (x > max) return max
        else return x
    },

    fract: (x) => {
        let c = x - Math.floor(x)
        return c
    },
}
