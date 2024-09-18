    const result = document.getElementById('result');
    const btn = document.querySelector('.btn-search-custom');
    const input = document.getElementById("IMEI");
    const loader = document.getElementById("loader");
    const errorMessage = document.getElementById('error-message');
    const noResultsModal = new bootstrap.Modal(document.getElementById('noResultsModal'), {
        keyboard: false
    });
    let allUsers = [];

    const createCardElement = (id, name, username, email, phone, photo) => {
        const cardDiv = document.createElement('div');
        cardDiv.className = 'card custom-card';
        cardDiv.innerHTML = `
            <div class="custom-card-body">
                <h5 class="custom-card-title"><i class="bi bi-person"></i> ${name}</h5>
                <p class="custom-card-text"><i class="bi bi-person-badge"></i> شناسه: ${id}</p>
                <p class="custom-card-text"><i class="bi bi-people"></i> نام کاربری: ${username}</p>
                <p class="custom-card-text"><i class="bi bi-envelope"></i> ایمیل: ${email}</p>
                <p class="custom-card-text"><i class="bi bi-telephone"></i> تلفن: ${phone}</p>
            </div>
            <div class="custom-card-footer">
                <button type="button" class="btn btn-primary-custom" data-bs-toggle="modal" data-bs-target="#modal${id}"><i class="bi bi-info-circle"></i> بیشتر</button>
            </div>
            <div class="modal fade" id="modal${id}" tabindex="-1" aria-labelledby="modalLabel${id}" aria-hidden="true">
                <div class="modal-dialog">
                    <div class="modal-content modal-content-custom">
                        <div class="modal-header">
                            <h5 class="modal-title" id="modalLabel${id}"><i class="bi bi-city"></i> شهر</h5>
                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="بستن"></button>
                        </div>
                        <div class="modal-body">
                            <p>${photo}</p>
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
        loader.classList.remove('d-none');
    };

    const hideLoader = () => {
        loader.classList.add('d-none');
    };

    const showErrorMessage = (message, colorClass) => {
        errorMessage.textContent = message;
        errorMessage.classList.remove('d-none');
        errorMessage.classList.add(colorClass);
    };

    const hideErrorMessage = () => {
        errorMessage.classList.add('d-none');
        errorMessage.classList.remove('yellow', 'red');
    };

    const displayUsers = (users) => {
        result.innerHTML = "";
        for (let i = 0; i < users.length; i++) {
            const user = users[i];
            result.appendChild(createCardElement(user.id, user.name, user.username, user.email, user.phone, user.address.city));
        }
    };

    const filterUsersByName = (name) => {
        return allUsers.filter(user => user.name.toLowerCase().includes(name.toLowerCase()));
    };

    btn.addEventListener('click', function () {
        showLoader();
        const searchName = input.value.trim();

        if (searchName === "") {
            hideLoader();
            showErrorMessage("فیلد جستجو نمی‌تواند خالی باشد.", 'red');
            return;
        }

        hideErrorMessage();
        const filteredUsers = filterUsersByName(searchName);
        if (filteredUsers.length > 0) {
            displayUsers(filteredUsers);
            hideLoader();
        } else {
            hideLoader();
            noResultsModal.show();
        }
    });

    showLoader();
    fetch('https://jsonplaceholder.typicode.com/users')
        .then((response) => {
            if (!response.ok) {
                if (response.status >= 500) {
                    throw new Error('خطای سرور');
                } else if (response.status >= 400) {
                    throw new Error('خطای مشتری');
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
            if (error.message === 'خطای سرور') {
                showErrorMessage("اطلاعات دریافت نشد. لطفاً دوباره تلاش کنید.", 'red');
            } else if (error.message === 'خطای مشتری') {
                showErrorMessage("اتصال اینترنت ضعیف است.", 'yellow');
            } else {
                showErrorMessage("مشکل ناشناخته‌ای رخ داده است.", 'red');
            }
        });