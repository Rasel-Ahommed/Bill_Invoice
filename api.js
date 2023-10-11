
document.addEventListener("DOMContentLoaded", function myFun() {
    let phoneInput = document.querySelector('#number');
    let nameInput = document.querySelector('#name');
    let addressInput = document.querySelector('#address');


    let vat;
    let discount;


    function getUser() {
        fetch("https://6522dae2f43b17938414f7ce.mockapi.io/customer")
            .then((res) => res.json())
            .then((data) => {
                let phoneList = document.getElementById('phone');
                data.forEach(ele => {
                    let option = document.createElement('option');
                    option.value = ele.number;
                    option.dataset.id = ele.id;
                    phoneList.appendChild(option);
                });
            });
    }

    function CustomerInfo() {
        let selectedNumber = phoneInput.value;
        let selectedOption = document.querySelector(`option[value="${selectedNumber}"]`);

        if (selectedOption) {
            let selectedId = selectedOption.dataset.id;
            fetch(`https://6522dae2f43b17938414f7ce.mockapi.io/customer/${selectedId}`)
                .then((res) => res.json())
                .then((data) => {
                    nameInput.value = data.name;
                    addressInput.value = data.address;
                });
        }
        else {
            nameInput.value = '';
            addressInput.value = '';
        }
    }

    phoneInput.addEventListener("input", CustomerInfo);
    getUser();


    // fetch product item from api 
    async function getProduct() {
        let api = "https://6522dae2f43b17938414f7ce.mockapi.io/products";
        let fetch = await axios.get(api);
        let data = fetch.data;
        let productField = document.getElementById("product");

        data.forEach(ele => {
            let option = document.createElement("option"); //set option into the product input field
            option.value = ele.Product_name; //set value in option from api product_name
            option.dataset.id = ele.id; //set a uniqe data-id in option form api id 
            productField.appendChild(option);
        })
    }
    getProduct();


    // show selected product price 


    document.addEventListener('change', function calculet() {
        let inputProduct = document.getElementsByClassName("productName"); //target product name field
        let pricefield = document.getElementsByClassName('unitPrice');     //target unit price field
        let qtyField = document.getElementsByClassName("qty");             //target qty field
        let totalField = document.getElementsByClassName("total");         //target total field
        let totalBillField = document.getElementById("bill");              //target sub total field
        let totalbill = 0;  //temporary for store sub total amount

        for (let i = 0; i <= inputProduct.length - 1; i++) {
            let inputvalue = inputProduct[i];   //target specific input product field
            let qty = qtyField[i];              //target specific qty field
            let qtyValue = qty.value;           //get qty value
            let total = totalField[i];          //target total field

            function productPrice() {
                let selectProduct = inputvalue.value;
                let getoption = document.querySelector(`option[value='${selectProduct}']`);

                if (getoption) {
                    let id = getoption.dataset.id;
                    fetch(`https://6522dae2f43b17938414f7ce.mockapi.io/products/${id}`)
                        .then((res) => res.json())
                        .then((data) => {
                            let check = pricefield[i];
                            check.value = data.unite_price;            //show product unit price
                            total.value = data.unite_price * qtyValue; //calculete a product paice 
                            totalbill += parseInt(total.value);        //calculete total products price 
                            totalBillField.value = totalbill;          //show total price in subtotal section

                            // calculet final bill and check payment and due  
                            vat = document.getElementById("vat");
                            discount = document.getElementById("discount");
                            let finalBillinp = document.getElementById("finalBillinp");

                            vat = parseInt(vat.value);
                            discount = parseInt(discount.value);
                            finalbill = (totalbill + vat) - discount;
                            finalBillinp.value = finalbill;

                        });

                }
                else {
                    alert("This Product are not Available !");
                    inputvalue.value = "";
                }
            }
            productPrice();
        };
    });

});

let paymentTotal = document.getElementById("paymentTotal");
let payment = document.getElementById("payment");
let paid = document.getElementById("paid");
let due = document.getElementById("due");
let finalbill;
let dueAmount;
function pay() {
    dueAmount = finalbill - parseInt(payment.value);
    due.value = dueAmount;
    paymentTotal.value = finalbill
    paid.value = payment.value;
}

// save new phone number
function saveData() {
    fetch("https://6522dae2f43b17938414f7ce.mockapi.io/customer")
        .then((res) => res.json())
        .then((data) => {
            let number = document.getElementById("number").value;
            let name = document.getElementById("name").value;
            let address = document.getElementById("address").value;
            let check = 0;
            data.forEach(e => {
                if (e.number == number) {
                    check += 1
                }
                else {
                    check += 0
                }
            });

            if (check == 0) {
                // post new data in api 
                async function postData() {
                    let newData = {
                        "number": number,
                        "name": name,
                        "address": address
                    }
                    await axios.post("https://6522dae2f43b17938414f7ce.mockapi.io/customer", newData);
                }
                postData();
            }
        });
}


function setVluNull() {
    Fvat.value = 0;
    discount.value = 0;
}
