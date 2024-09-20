
const result = document.getElementById("result");
const btn = document.querySelector(".btn-search-custom");
const input = document.getElementById("IMEI");
const loader = document.getElementById("loader");
const alertContainer = document.getElementById("alert-container");
let allUsers = [];

const createCardElement = (id, name, username, email, phone, photo) => {
    const cardDiv = document.createElement("div");
    cardDiv.className = "card custom-card";
    cardDiv.innerHTML = `
    <div class="custom-card-body d-flex flex-column align-items-start justify-content-start">
        <h5 class="custom-card-title"><i class="bi bi-person"></i> ${name}</h5>
        <p class="custom-card-text"><i class="bi bi-person-badge"></i> شناسه: ${id}</p>
        <p class="custom-card-text"><i class="bi bi-people"></i> نام کاربری: ${username}</p>
        <p class="custom-card-text"><i class="bi bi-envelope"></i> ایمیل: ${email}</p>
        <p class="custom-card-text"><i class="bi bi-telephone"></i> تلفن: ${phone}</p>
    </div>
    <div class="custom-card-footer">
        <button type="button" class="btn btn-primary-custom" data-bs-toggle="modal" data-bs-target="#modal${id}"> بیشتر <i class="bi bi-info-circle"></i></button>
    </div>
    <div class="modal fade" id="modal${id}" tabindex="-1" aria-labelledby="modalLabel${id}" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content modal-content-custom">
                <div class="modal-header">
                    <h5 class="modal-title" id="modalLabel${id}">شهر</h5>
                </div>
                <div class="modal-body">
                    <p>${photo}</p>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal"><i class="bi bi-x-circle"></i> </button>
                </div>
            </div>
        </div>
    </div>
    `;
    return cardDiv;
};

const showLoader = () => {
    loader.classList.remove("d-none");
};

const hideLoader = () => {
    loader.classList.add("d-none");
};

const showAlert = (message, type) => {
    const alertHTML = `
    <div class="alert alert-${type} alert-dismissible fade show mt-3" role="alert">
        ${message}
        <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="بستن"></button>
    </div>
    `;
    alertContainer.innerHTML = alertHTML;
};

const hideAlert = () => {
    alertContainer.innerHTML = "";
};

const displayUsers = (users) => {
    result.innerHTML = "";
    const cardCount = document.getElementById("card-count");
    cardCount.textContent = `تعداد موبایل ${users.length}`;
    for (let i = 0; i < users.length; i++) {
        const user = users[i];
        result.appendChild(
            createCardElement(
                user.id,
                user.name,
                user.username,
                user.email,
                user.phone,
                user.address.city
            )
        );
    }
};

const filterUsersByName = (name) => {
    return allUsers.filter((user) =>
        user.name.toLowerCase().includes(name.toLowerCase())
    );
};

btn.addEventListener("click", function () {
    showLoader();
    const searchName = input.value.trim();

    if (searchName === "") {
        hideLoader();
        showAlert("فیلد جستجو نمی‌تواند خالی باشد.", "danger");
        return;
    }

    hideAlert();
    const filteredUsers = filterUsersByName(searchName);
    if (filteredUsers.length > 0) {
        displayUsers(filteredUsers);
        hideLoader();
    } else {
        hideLoader();
        showAlert("هیچ نتیجه‌ای پیدا نشد.", "warning");
    }
});

showLoader();
fetch("https://jsonplaceholder.typicode.com/users")
    .then((response) => {
        if (!response.ok) {
            if (response.status >= 500) {
                throw new Error("خطای سرور");
            } else if (response.status >= 400) {
                throw new Error("خطای مشتری");
            }
        }
        return response.json();
    })
    .then((data) => {
        allUsers = data;
        displayUsers(data);
        hideLoader();
    })
    .catch((error) => {
        hideLoader();
        if (error.message === "خطای سرور") {
            showAlert("اطلاعات دریافت نشد. لطفاً دوباره تلاش کنید.", "danger");
        } else if (error.message === "خطای مشتری") {
            showAlert("اتصال اینترنت ضعیف است.", "warning");
        } else {
            showAlert("مشکل ناشناخته‌ای رخ داده است.", "danger");
        }
    });

    let form = document.querySelector('form');
    form.addEventListener('submit', function (e) {
        e.preventDefault();

        const name = document.getElementById('name').value.trim();
        const faName = document.getElementById('faName').value.trim();
        const model = document.getElementById('model').value.trim();
        const serial1 = document.getElementById('serial1').value.trim();
        const serial2 = document.getElementById('serial2').value.trim();
        const idNumber = document.getElementById('idNumber').value.trim();
        const contactNumber = document.getElementById('contactNumber').value.trim();
        const warrantyContact = document.getElementById('warrantyContact').value.trim();
        const currentAddress = document.getElementById('currentAddress').value.trim();
        const purchasePrice = document.getElementById('purchasePrice').value.trim();
        const purchaseDate = document.getElementById('purchaseDate').value.trim();

        const serialPattern = /^[0-9]{15,}$/; 
        const phonePattern = /^[0-9]{10,}$/;   

        let isValid = true;

     
        if (!name || !faName || !model || !serial1 || !serial2 || !idNumber || !contactNumber || !warrantyContact || !currentAddress || !purchasePrice || !purchaseDate) {
            const toastElement = document.getElementById('emptyFieldsToast');
            const toast = new bootstrap.Toast(toastElement);
            toast.show();
            isValid = false;
        }

  
        if (!serial1.match(serialPattern) || !serial2.match(serialPattern)) {
            const toastElement = document.getElementById('serialErrorToast');
            const toast = new bootstrap.Toast(toastElement);
            toast.show();
            isValid = false;
        }


        if (!contactNumber.match(phonePattern) || !warrantyContact.match(phonePattern)) {
            const toastElement = document.getElementById('contactErrorToast');
            const toast = new bootstrap.Toast(toastElement);
            toast.show();
            isValid = false;
        }

  
        if (!idNumber.match(/^[0-9]+$/)) {
            const toastElement = document.getElementById('idNumberErrorToast');
            const toast = new bootstrap.Toast(toastElement);
            toast.show();
            isValid = false;
        }


        if (isValid) {
            this.submit();
        }
    });