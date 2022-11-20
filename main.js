var data = {
    save: (key, value) => {
        return localStorage.setItem(key, value)
    },
    get: (key) => {
        if(localStorage.getItem(key) == "null" || !localStorage.getItem(key)){
            return null
        }
        return localStorage.getItem(key) || null
    }
}

var il = 0
var _data = JSON.parse(data.get("data") || JSON.stringify({
    todos: [{}]
}))

function isValid(array) {
    let valid = false
    array.split(";").forEach(e=>{
        if(e==getDnesek(0)) {
            valid=true
        }
    })
    return valid
}

function getDnesek(add=0) {
    let date = new Date()
                let dt = (date.getUTCDate()+add).toString() + date.getMonth().toString() + date.getUTCFullYear().toString()

        return dt
}

function deleteTodo(id) {
    _data.todos = _data.todos.filter(e => e.id !== id)
    data.save("data",JSON.stringify(_data))
    document.getElementById("item-box-"+id).remove()
}

function addTodo(text="Null",save=true,_i=il,_tm,addd=true) {
    if(!_tm) _tm=getDnesek(0)
    if(_i==il) _i++
    il++
    if(text=="Null") {
        if(!document.getElementById("inputadd").value) {
            return 0
        }
        text = document.getElementById("inputadd").value
        document.getElementById("inputadd").value = ""
    }
    if(isValid(_tm)){
        let add = ""
        if(_tm.split(";").at(-1)==getDnesek(0)&& !addd) {
            add="focus"
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
    if(save) {
        _data.todos.push({
            id:_i.toString(),
            text,
            time:(()=>{
                let date = new Date()
                let dt = date.getUTCDate().toString() + date.getMonth().toString() + date.getUTCFullYear().toString() + ";" + (date.getUTCDate()+1).toString() + date.getMonth().toString() + date.getUTCFullYear().toString()
                return dt
            })()
        })
        data.save("data",JSON.stringify(_data))
        document.getElementById("nictuneni").innerHTML = ""
    }
    return 1
}
return 0

}
function getInt(int) {
    try {
        return parseInt(int)
    } catch (error) {
        return 1
    }
}
function reloadTodos() {
    _data.todos.forEach(e => {
        i+=addTodo(e.text,false, e.id,e.time,false)
    })
}

window.onload = () => {
    reloadTodos()
}
