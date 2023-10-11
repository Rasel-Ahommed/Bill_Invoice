// for target tbody 
let tbody = document.getElementById("tbody");
// for target ADD+ button 
let addButton = document.getElementById('addBtn');
//  for creat a uniqu id
let count = 0;


// add a default row in the table 
function creatRow() {
    tbody.innerHTML +=
        `<tr id="row${count}">
        <td class="text-center" data-column="ITEM">
            <input type="text" list="product" class="text-center productName" />
            <datalist id="product">
                
            </datalist>
        </td>
        <td class="text-center" data-column="Unit Price" >
            <input class="text-center unitPrice" type="number" value="" readonly >
        </td>
        <td class="text-center" data-column="Qty">
            <input class="text-center qty" type="number" min="1" value=1>
        </td>
        <td class="text-center" data-column="Total">
            <input class="text-center total" type="number" value="" readonly >
        </td>
        <td class="text-center forProblem" data-column="Action">
            <button class="btn btn-danger setBtn" onclick="removeField('row${count}');setVluNull();">
                <i class="fa-solid fa-minus"></i>
            </button>
            <button class="btn btn-primary setBtn" onclick="addField()">
                <i class="fa-solid fa-plus"></i>
            </button>
        </td>
    </tr>`
    count += 1;
}
creatRow();


// show add remove button 
function setButton() {
    let lastchild = tbody.lastChild.querySelectorAll(".setBtn");
    lastchild.forEach((e) => {
        e.removeAttribute("hidden");
    })
}


// remove add and show button 
function removeButton() {
    let getButton = document.querySelectorAll(".setBtn");
    getButton.forEach((e) => {
        e.setAttribute("hidden", "hidden");
    })
}

// add a row after click pluse(+) icon 
function addField() {
    let checkEmpty = document.getElementsByClassName("productName");
    getinputField = checkEmpty[count - 1];
    if (getinputField.value == "") {
        alert("Please Select A Product First...")
    }
    else {

        const tr = document.createElement('tr');
        tr.setAttribute("id", `row${count}`);
        tr.innerHTML = `<td class="text-center" data-column="ITEM">
            <input type="text" list="product" class="text-center productName"/>
            <datalist id="product">
            </datalist>
            </td>
            <td class="text-center" data-column="Unit Price" >
                <input class="text-center unitPrice" type="number" value="" readonly>
            </td>
            <td class="text-center" data-column="Qty">
                <input class="text-center qty" type="number" min="1" value =1>
            </td>
            <td class="text-center" data-column="Total">
                <input class="text-center total" type="number" value="" readonly>
            </td>
            <td class="text-center forProblem" data-column="Action">
            <button class="btn btn-danger setBtn" onclick="removeField('row${count}');setVluNull();">
                <i class="fa-solid fa-minus"></i>
            </button>
            <button class="btn btn-primary setBtn" onclick="addField()">
                <i class="fa-solid fa-plus"></i>
            </button>
        </td>`
        tbody.appendChild(tr);
        removeButton();
        setButton();
        count += 1;
    }
}


// remove row after click minus(-) icon 
function removeField(removeEle) {
    let remove = document.getElementById(removeEle);
    remove.remove();
    setButton();
    count -= count - 1;
}

// complete button function
let targetInput = document.getElementsByTagName("input");
function complete() {
    for (let i = 0; i < targetInput.length; i++) {
        let inputField = targetInput[i];
        inputField.setAttribute("readonly", "readonly");
        console.log(inputField);
    }
    removeButton();
    addButton.setAttribute("hidden", "hidden");
}

