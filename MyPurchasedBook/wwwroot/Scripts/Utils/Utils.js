function ToastMessage(msg) {
    Toastify({
        text: msg,
        duration: 3000,
        //destination: "https://github.com/apvarun/toastify-js",
        newWindow: true,
        close: false,
        gravity: "top", // `top` or `bottom`
        position: "center", // `left`, `center` or `right`
        stopOnFocus: true, // Prevents dismissing of toast on hover
        style: {
            //background: "linear-gradient(to right, #00b09b, #96c93d)",
            background: "linear-gradient(to right, #b00000, #b01500)",
        },
        onClick: function () { } // Callback after click
    }).showToast();
}