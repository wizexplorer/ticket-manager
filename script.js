let addBtn = document.querySelector(".add-btn");
let plusBtn = document.querySelector(".plus");
let checkBtn = document.querySelector(".check");
let removeBtn = document.querySelector(".remove-btn");
let modalCont = document.querySelector(".modal-cont");
let addFlag = false;
let removeFlag = false;
let mainCont = document.querySelector(".main-cont");
let textareaCont = document.querySelector(".textarea-cont");
let allPriorityColor = document.querySelectorAll(".priority-color");
let lockClass = "fa-lock";
let unlockClass = "fa-lock-open";
let colors = ["least-impt", "less-impt", "more-impt", "most-impt"];
let modalPriorityColor = colors[colors.length - 1];
let toolBoxColors = document.querySelectorAll(".color");
let ticketArr = [];

if (localStorage.getItem("tickets")) {
    // retriev and display tickets
    ticketArr = JSON.parse(localStorage.getItem("tickets"));
    ticketArr.forEach((ticketObj)=>{
        let task = ticketObj.ticketTask;
        task = task.replace(/\n\r?/g, '<br />')
        createTicket(ticketObj.ticketColor, task, ticketObj.ticketID)
    })
}


for (let i = 0; i < toolBoxColors.length; i++) {
    toolBoxColors[i].addEventListener("click", (e) => {
        let currentToolBoxColor = toolBoxColors[i].classList[0];

        // checks all tickets and returns an arr where ticket color matches the currentToolBoxColor i.e clicked color
        let filteredTickets = ticketArr.filter((ticketObj, idx) => {
            return currentToolBoxColor === ticketObj.ticketColor;
        })

        // remove all tickets
        let allTicketsCont = document.querySelectorAll(".ticket-cont");
        for (let i = 0; i < allTicketsCont.length; i++) {
            allTicketsCont[i].remove();
        }

        // create filtered tickets
        filteredTickets.forEach((ticketObj, idx) => {
            createTicket(ticketObj.ticketColor, ticketObj.ticketTask, ticketObj.ticketID);
        })
    })

    toolBoxColors[i].addEventListener("dblclick", (e) => {
        // remove all tickets
        let allTicketsCont = document.querySelectorAll(".ticket-cont");
        for (let i = 0; i < allTicketsCont.length; i++) {
            allTicketsCont[i].remove();
        }

        ticketArr.forEach((ticketObj, idx) => {
            createTicket(ticketObj.ticketColor, ticketObj.ticketTask, ticketObj.ticketID);
        })
    })

}

document.addEventListener("dblclick", (e) => {
    addFlag = false;
    modalCont.style.display = "none";
    textareaCont.value = "";
    checkBtn.style.display = "none";
    plusBtn.style.display = "block";
})

addBtn.addEventListener("click", (e) => {
    // display modal
    // generate ticket

    // addFlag == true => Modal display
    // addFlag == false => Modal hide
    addFlag = !addFlag;
    if (addFlag) {
        allPriorityColor.forEach((priorityColorElem, idx) => {
            priorityColorElem.classList.remove("active");
            if (idx == allPriorityColor.length - 1) {
                priorityColorElem.classList.add("active");
                modalPriorityColor = priorityColorElem.classList[0];
            }
        })
        modalCont.style.display = "flex";
        plusBtn.style.display = "none";
        checkBtn.style.display = "block";
        e.stopImmediatePropagation();
    }
    else {
        modalCont.style.display = "none";
        checkBtn.style.display = "none";
        plusBtn.style.display = "block";
        // textareaCont.value = "";
    }
}, true)


checkBtn.addEventListener("click", () => {
    if (textareaCont.value !== "") {
        let task = textareaCont.value;
        task = task.replace(/\n\r?/g, '<br />')
        createTicket(modalPriorityColor, task);
        addFlag = false;
        modalCont.style.display = "none";
        textareaCont.value = "";
    }
})

// modalCont.addEventListener("keydown", (e) => {
//     let key = e.key;
//     if (key === "Shift") {
//         console.log(textareaCont.value);
//         createTicket(modalPriorityColor, textareaCont.value);
//         addFlag = false;
//         modalCont.style.display = "none";
//         textareaCont.value = "";
//     }
// })

function createTicket(ticketColor, ticketTask, ticketID) {
    let id = ticketID || shortid();
    let ticketCont = document.createElement("div");
    ticketCont.setAttribute("class", "ticket-cont");
    ticketCont.innerHTML = `
        <div class="topmost"><img class="remove" src="data:image/svg+xml;base64,PHN2ZyB2ZXJzaW9uPSIxLjEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHZpZXdCb3g9IjAgMCAxNzIgMTcyIj48ZyB0cmFuc2Zvcm09IiI+PGcgZmlsbD0ibm9uZSIgZmlsbC1ydWxlPSJub256ZXJvIiBzdHJva2U9Im5vbmUiIHN0cm9rZS13aWR0aD0iMSIgc3Ryb2tlLWxpbmVjYXA9ImJ1dHQiIHN0cm9rZS1saW5lam9pbj0ibWl0ZXIiIHN0cm9rZS1taXRlcmxpbWl0PSIxMCIgc3Ryb2tlLWRhc2hhcnJheT0iIiBzdHJva2UtZGFzaG9mZnNldD0iMCIgZm9udC1mYW1pbHk9Im5vbmUiIGZvbnQtd2VpZ2h0PSJub25lIiBmb250LXNpemU9Im5vbmUiIHRleHQtYW5jaG9yPSJub25lIiBzdHlsZT0ibWl4LWJsZW5kLW1vZGU6IG5vcm1hbCI+PHBhdGggZD0iTTAsMTcydi0xNzJoMTcydjE3MnoiIGZpbGw9Im5vbmUiPjwvcGF0aD48cGF0aCBkPSJNODYsMTU4LjI0Yy0zOS44OTcwNSwwIC03Mi4yNCwtMzIuMzQyOTUgLTcyLjI0LC03Mi4yNHYwYzAsLTM5Ljg5NzA1IDMyLjM0Mjk1LC03Mi4yNCA3Mi4yNCwtNzIuMjRoMGMzOS44OTcwNSwwIDcyLjI0LDMyLjM0Mjk1IDcyLjI0LDcyLjI0djBjMCwzOS44OTcwNSAtMzIuMzQyOTUsNzIuMjQgLTcyLjI0LDcyLjI0eiIgZmlsbD0iI2U5MTkxOSI+PC9wYXRoPjxnIGlkPSJvcmlnaW5hbC1pY29uIiBmaWxsPSIjZWNmMGYxIj48cGF0aCBkPSJNMzguNDQyLDM0LjQ4NmwtMy45NTYsMy45NTZsNDcuNTU4LDQ3LjU1OGwtNDcuNTU4LDQ3LjU1OGwzLjk1NiwzLjk1Nmw0Ny41NTgsLTQ3LjU1OGw0Ny41NTgsNDcuNTU4bDMuOTU2LC0zLjk1NmwtNDcuNTU4LC00Ny41NThsNDcuNTU4LC00Ny41NThsLTMuOTU2LC0zLjk1NmwtNDcuNTU4LDQ3LjU1OHoiPjwvcGF0aD48L2c+PC9nPjwvZz48L3N2Zz4="/></div>
        <div class="top">
            <div class="left">
                <div class="ticket-color ${ticketColor}"></div>
            </div>
            <div class="right">
                <div class="ticket-id">#${id}</div>
                <div class="task-area">
                    ${ticketTask}
                </div>
            </div>
        </div>
        <div class="bottom">
            <div class="ticket-lock">
                <i class="fa-solid fa-lock"></i>
            </div>
        </div>`;
    mainCont.appendChild(ticketCont);

    // create obj of ticket and add to ticketArr
    if (!ticketID) {
        ticketArr.push({ ticketColor, ticketTask, ticketID: id });
        localStorage.setItem("tickets", JSON.stringify(ticketArr));
    }

    // show remove btn on hover
    let removeBtn = ticketCont.querySelector(".remove");
    removeBtn.addEventListener("click", () => {
        ticketCont.remove();
        removeTicket(id);
    })
    removeBtn.style.display = "none";
    ticketCont.addEventListener("mouseenter", () => {
        removeBtn.style.display = "block";
    })
    ticketCont.addEventListener("mouseleave", () => {
        // let removeBtn = ticketCont.querySelector(".remove")
        removeBtn.style.display = "none";
    })

    // show lock btn on hover
    let lockBtn = ticketCont.querySelector(".ticket-lock");
    lockBtn.style.display = "none";
    ticketCont.addEventListener("mouseenter", () => {
        lockBtn.style.display = "block";
    })
    ticketCont.addEventListener("mouseleave", () => {
        lockBtn.style.display = "none";
    })
    handleRemoval(ticketCont, id);
    handleLock(ticketCont, id);
    handleColor(ticketCont, id);
}

removeBtn.addEventListener("click", (e) => {
    removeFlag = !removeFlag;
})

function handleRemoval(ticket, id) {
    // removeFlag => true => remove
    ticket.addEventListener("click", (e)=>{
        if (removeFlag) {
            ticket.remove();
            removeTicket(id)
        }
    })
}

function handleLock(ticket, id) {
    let ticketLockCont = ticket.querySelector(".ticket-lock");
    let ticketLock = ticketLockCont.children[0];
    let ticketTaskArea = ticket.querySelector(".task-area");
    ticketLock.addEventListener("click", (e) => {
        if (ticketLock.classList.contains(lockClass)) {
            ticketLock.classList.remove(lockClass);
            ticketLock.classList.add(unlockClass);
            ticketTaskArea.setAttribute("contenteditable", "true");
            
        }
        else {
            ticketLock.classList.remove(unlockClass);
            ticketLock.classList.add(lockClass);
            ticketTaskArea.setAttribute("contenteditable", "false");
            ticketArr.forEach((ticketObj) => {
                if (ticketObj.ticketID === id) {
                    ticketObj.ticketTask = ticketTaskArea.innerText;
                }
            })
            localStorage.setItem("tickets", JSON.stringify(ticketArr));
        }
    })
}

function handleColor(ticket, id) {
    let ticketColor = ticket.querySelector(".ticket-color");
    ticketColor.addEventListener("click", (e) => {
        let currentTicketColor = ticketColor.classList[1];
        // get ticket color idx
        let currentTicketColorIdx = colors.findIndex((color) => {
            return currentTicketColor === color;
        })

        currentTicketColorIdx++;
        let newTicketColorIdx = currentTicketColorIdx % colors.length;
        let newTicketColor = colors[newTicketColorIdx];
        ticketColor.classList.remove(currentTicketColor);
        ticketColor.classList.add(newTicketColor);
        ticketArr.forEach((ticketObj) => {
            if (ticketObj.ticketID === id) {
                ticketObj.ticketColor = newTicketColor;
            }
        })
        localStorage.setItem("tickets", JSON.stringify(ticketArr));
    })
}

// listner for modal priority color

allPriorityColor.forEach((colorElem, idx) => {
    colorElem.addEventListener("click", (e) => {
        allPriorityColor.forEach((priorityColorElem, idx) => {
            priorityColorElem.classList.remove("active");
        })
        colorElem.classList.add("active")

        modalPriorityColor = colorElem.classList[0];
    })
})

function removeTicket(id){
    ticketArr.forEach((ticketObj, idx)=>{
        if (ticketObj.ticketID === id) {
            ticketArr.splice(idx, 1);
        }
    })
    localStorage.setItem("tickets", JSON.stringify(ticketArr));
}