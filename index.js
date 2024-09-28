async function addTodoInDb() {

    const title = document.getElementById("title").value;
    // console.log(title)
    const description = document.getElementById("description").value;

    const add_todo = await fetch("http://localhost:8080/posttodos", {

        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            title,
            description
        })

    });

    const res = await add_todo.json();
    console.log(res);

}

// const title = document.getElementById("title").value;
// console.log(title)
// const description = document.getElementById("description").value;
document.getElementById("addTodo").setAttribute("onclick", "addTodoInDb()");




async function markAsDone(id, completed) {
    const updated_todo = await fetch("http://localhost:8080/updatetodos", {

        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            id,
            completed : !completed
        })

    });
    const res = await updated_todo.json();
    const parent = document.getElementById(this_id);
    parent.children[3].innerHTML = res.completed ? "Done !" : "Mark as done !!";
}


function renderedDom(title, description, id, completed) {
    const parent = document.createElement("div");
    const ctitle = document.createElement("div");
    ctitle.innerHTML = title;
    const cdescription = document.createElement("div");
    cdescription.innerHTML = description;
    const cid = document.createElement("div");
    cid.innerHTML = id;
    const ccompleted = document.createElement("button");
    ccompleted.innerHTML = completed ? "Done !" : "Mark as done !!";
    ccompleted.setAttribute("onclick", `markAsDone(${id, completed})`);

    parent.appendChild(ctitle);
    parent.appendChild(cdescription);
    parent.appendChild(cid);
    parent.appendChild(ccompleted);

    return parent;
}



function updateAccToDomState(state) {
    const child = document.getElementById("container");
    child.innerHTML = "";

    for (let i = 0; i < state.length; i++) {
        const thisChild = renderedDom(state[i].title, state[i].description, state[i]._id, state[i].completed);
        child.appendChild(thisChild);

    }
    return child;
}

(async function () {
    const res = await fetch("http://localhost:8080/gettodos");
    json = await res.json();
    updateAccToDomState(json);

})();
