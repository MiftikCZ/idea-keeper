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

function addTodo(text="Null",save=true,_i=il,_tm) {
    if(!_tm) _tm=getDnesek(0)
    if(_i==il) _i++
    il++
    if(text=="Null") {
        if(!document.getElementById("inputadd").value) {
            return
        }
        text = document.getElementById("inputadd").value
        document.getElementById("inputadd").value = ""
    }
    if( _tm.split(";")[0]==getDnesek(0) || _tm.split(";")[1]==getDnesek(0)){
    document.getElementById("items").innerHTML += 
        `
        <div class="item" id="item-box-${_i}">
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
                console.log(dt)
                return dt
            })()
        })
        data.save("data",JSON.stringify(_data))
    }
}

}

function reloadTodos() {
    _data.todos.forEach(e => {
        addTodo(e.text,false, e.id,e.time)
    })

}

window.onload = () => {
    reloadTodos()
}
