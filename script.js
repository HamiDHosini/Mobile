const result = document.getElementById("result");
const btn = document.querySelector(".btn-search-custom");
const input = document.getElementById("IMEI");
const loader = document.getElementById("loader");
const alertContainer = document.getElementById("alert-container");

const showToast = (toastId) => {
    const toastElement = document.getElementById(toastId);
    const toast = new bootstrap.Toast(toastElement);
    toast.show();
};

const createCardElement = (data) => {
    const cardDiv = document.createElement("div");
    cardDiv.className = "card custom-card";
    cardDiv.innerHTML = `
        <div class="custom-card-body d-flex flex-column align-items-start justify-content-start">
            <h5 class="custom-card-title"><i class="bi bi-person icon-custom"></i> ${data.name}</h5>
            <p class="custom-card-text"><i class="bi bi-phone icon-custom"></i> مدل: ${data.model}</p>
            <p class="custom-card-text"><i class="bi bi-hash icon-custom"></i> شماره سریال: ${data.serial1}</p>
            <p class="custom-card-text"><i class="bi bi-telephone icon-custom"></i> شماره تماس: ${data.contactNumber}</p>
            <p class="custom-card-text"><i class="bi bi-house icon-custom"></i> آدرس: ${data.currentAddress}</p>
        </div>
        <div class="custom-card-footer">
            <button type="button" class="btn btn-primary-custom" data-bs-toggle="modal" data-bs-target="#modal${data.idNumber}"> بیشتر <i class="bi bi-info-circle"></i></button>
        </div>
        <div class="modal fade" id="modal${data.idNumber}" tabindex="-1" aria-labelledby="modalLabel${data.idNumber}" aria-hidden="true">
            <div class="modal-dialog modal-lg">
                <div class="modal-content modal-content-custom">
                    <div class="modal-header">
                        <h5 class="modal-title" id="modalLabel${data.idNumber}"><i class="bi bi-info-circle mx-2"></i> اطلاعات بیشتر</h5>
                    </div>
                    <div class="modal-body">
                        <p><i class="bi bi-person icon-custom"></i> <strong>نام:</strong> ${data.name}</p>
                        <p><i class="bi bi-card-text icon-custom"></i> <strong>شناسه:</strong> ${data.idNumber}</p>
                        <p><i class="bi bi-phone icon-custom"></i> <strong>مدل:</strong> ${data.model}</p>
                        <p><i class="bi bi-calendar icon-custom"></i> <strong>تاریخ خرید:</strong> ${data.purchaseDate}</p>
                        <p><i class="bi bi-house icon-custom"></i> <strong>آدرس:</strong> ${data.currentAddress}</p>
                        <p><i class="bi bi-telephone icon-custom"></i> <strong>شماره تماس:</strong> ${data.contactNumber}</p>
                        <p><i class="bi bi-shield-lock icon-custom"></i> <strong>شماره ضمانت:</strong> ${data.warrantyContact}</p>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal"><i class="bi bi-x-circle"></i> بستن</button>
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

const displayUsers = () => {
    const users = JSON.parse(localStorage.getItem("users")) || [];
    result.innerHTML = "";
    const cardCount = document.getElementById("card-count");
    cardCount.textContent = `تعداد موبایل ${users.length}`;

    for (let i = 0; i < users.length; i++) {
        result.appendChild(createCardElement(users[i]));
    }

    hideLoader();
};

const filterUsersByQuery = (query) => {
    const users = JSON.parse(localStorage.getItem("users")) || [];
    return users.filter((user) =>
        user.name.toLowerCase().includes(query.toLowerCase()) ||
        user.serial1.includes(query) ||
        user.contactNumber.includes(query)
    );
};

btn.addEventListener("click", function () {
    showLoader();
    const searchQuery = input.value.trim();

    if (searchQuery === "") {
        hideLoader();
        showAlert("فیلد جستجو نمی‌تواند خالی باشد.", "danger");
        return;
    }

    hideAlert();
    const filteredUsers = filterUsersByQuery(searchQuery);
    if (filteredUsers.length > 0) {
        result.innerHTML = "";
        for (let i = 0; i < filteredUsers.length; i++) {
            result.appendChild(createCardElement(filteredUsers[i]));
        }
        hideLoader();
    } else {
        hideLoader();
        showAlert("هیچ نتیجه‌ای پیدا نشد.", "warning");
    }
});

document.addEventListener("DOMContentLoaded", () => {
    displayUsers();
});

let form = document.querySelector('form');
form.addEventListener('submit', function (e) {
    e.preventDefault();

    const userData = {
        name: document.getElementById('name').value.trim(),
        faName: document.getElementById('faName').value.trim(),
        model: document.getElementById('model').value.trim(),
        serial1: document.getElementById('serial1').value.trim(),
        serial2: document.getElementById('serial2').value.trim(),
        idNumber: document.getElementById('idNumber').value.trim(),
        contactNumber: document.getElementById('contactNumber').value.trim(),
        warrantyContact: document.getElementById('warrantyContact').value.trim(),
        currentAddress: document.getElementById('currentAddress').value.trim(),
        purchasePrice: document.getElementById('purchasePrice').value.trim(),
        purchaseDate: document.getElementById('purchaseDate').value.trim(),
    };

    const serialPattern = /^[0-9]{15,}$/; 
    const phonePattern = /^[0-9]{10,}$/;   
    let isValid = true;

    for (const key in userData) {
        if (!userData[key]) {
            isValid = false;
            showToast('emptyFieldsToast');
            break;
        }
    }

    if (!userData.serial1.match(serialPattern) || !userData.serial2.match(serialPattern)) {
        isValid = false;
        showToast('serialErrorToast');
    }

    if (!userData.contactNumber.match(phonePattern) || !userData.warrantyContact.match(phonePattern)) {
        isValid = false;
        showToast('contactErrorToast');
    }

    if (!userData.idNumber.match(/^[0-9]+$/)) {
        isValid = false;
        showToast('idNumberErrorToast');
    }

    const users = JSON.parse(localStorage.getItem("users")) || [];
    const isDuplicate = users.some(user => user.serial1 === userData.serial1);
    if (isDuplicate) {
        isValid = false;
        showToast('duplicateSerialToast');
    }

    if (isValid) {
        users.push(userData);
        localStorage.setItem("users", JSON.stringify(users));

        displayUsers();
        form.reset();
        hideLoader();

        showAlert("کاربر با موفقیت اضافه شد.", "success");
    }
});
