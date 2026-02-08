(function () {
    class Home {
        constructor() {
            this.Image = document.getElementById("Image")
            this.divImage = document.getElementById("divImage")
            this.output = document.getElementById('output');
            this.isbn = document.getElementById("ISBN")
            this.elementsSelect = document.body.getElementsByTagName('select');
            this.btnConfirm = document.getElementById('btnConfirm');
            this.addBookClass = document.querySelectorAll('.addBook');
            this.addModal = document.getElementById('AddModal');

            this.init()
        }

        init() {
            const thisClass = this;
            this.DropdownSelect2();

            this.Image.addEventListener("change", () => {
                if (thisClass.Image.files.length === 1) {
                    thisClass.ImageLoad()
                    thisClass.divImage.classList.remove('d-none')
                }
                else thisClass.divImage.classList.add('d-none')
            });

            this.isbn.addEventListener("beforeinput", (e) => {
                if (!(e.data >= 0 && e.data <= 9)) {
                    e.preventDefault();
                }
            });

            Array.prototype.forEach.call(this.elementsSelect, (e) => {
                if (e.required) {
                    e.nextElementSibling.children[0].children[0].classList.add('select2Required')
                    $(e).on('change', (element) => {
                        element.preventDefault();
                        if (element.target.value) {
                            element.target.nextElementSibling.children[0].children[0].classList.remove('select2Required')
                        }
                        else element.target.nextElementSibling.children[0].children[0].classList.add('select2Required')
                    })
                }
            });

            this.btnConfirm.addEventListener('click', async () => {
                let requireElement = document.querySelectorAll('[required]');
                let containsValue = Object.entries(requireElement).map((c) => c[1].value.length > 0);
                let checkRequired = containsValue.every(function (v) { return v === true })
                if (checkRequired) await thisClass.prepareData()
                else ToastMessage(`Please fill required field(s)`)
            })

            this.addModal.addEventListener('hidden.bs.modal', () => {
                Array.prototype.forEach.call(thisClass.addBookClass, (e) => {
                    e.value = '';
                    if (e.type === 'file' && e.id === 'Image') {
                        var event = new Event('change');
                        thisClass.Image.dispatchEvent(event);
                    }
                    $(e).trigger('change')
                })
            })
        }

        DropdownSelect2() {
            var data = [
                {
                    id: 0,
                    text: 'enhancement'
                },
                {
                    id: 1,
                    text: 'bug'
                },
                {
                    id: 2,
                    text: 'duplicate'
                },
                {
                    id: 3,
                    text: 'invalid'
                },
                {
                    id: 4,
                    text: 'wontfix'
                }
            ];

            $('#AuthorSelect2').select2({
                dropdownParent: $('#AddModal'),
                tags: true,
                allowClear: true,
                placeholder: 'Select/Add Author(s)',
                data: data
            }).val(null).trigger('change');

            $('#PublisherSelect2').select2({
                dropdownParent: $('#AddModal'),
                tags: true,
                allowClear: true,
                placeholder: 'Select/Add Publisher(s)..',
                data: data
            }).val(null).trigger('change');

            $('#CategoriesSelect2').select2({
                dropdownParent: $('#AddModal'),
                tags: true,
                allowClear: true,
                placeholder: 'Select/Add Categories(s)..',
                data: data
            }).val(null).trigger('change');
        }

        ImageLoad() {
            const thisClass = this
            var reader = new FileReader();
            reader.onload = function () {
                var dataURL = reader.result;
                thisClass.output.src = dataURL;
            };
            reader.readAsDataURL(this.Image.files[0]);
        }

        async prepareData() {
            const thisClass = this
            //let book = [];
            //Array.prototype.forEach.call(this.addBookClass, (e) => {
            //    if (e.id == 'Image') book[`${e.id}`] =  e.value//thisClass.output.src
            //    else book[`${e.id.replace('Select2', '')}`] = $(e).val()
            //})

            //console.log(book)

            //console.log(self.origin)

            // url: `${self.location.href}Book/GetBook`,
            //console.log(JSON.stringify(book))
            //console.log(`${self.origin}/Book/AddBook`)
            //$.ajax({
            //    type: "POST",
            //    url: `${self.location.href}Book/AddBook/`,
            //    data: book,
            //    contentType: "application/json; charset=utf-8",
            //    dataType: "json",
            //});

            //const response = await fetch(`${self.origin}/Book/AddBook`, {
            //    method: "POST",
            //    headers: {
            //        "Content-Type": "application/json",
            //    },
            //    body: JSON.stringify(book),
            //});

            //const myHeaders = new Headers();
            //myHeaders.append("Content-Type", "application/json");

            //const myRequest = new Request(`${self.origin}/Book/AddBook`, {
            //    method: "POST",
            //    body: JSON.stringify(book),
            //    headers: myHeaders,
            //});

            //const response = await fetch(myRequest);
            //console.log(response)

            //console.log(`${self.location.href}Book/GetBook`)
            //console.log(JSON.stringify(book))

            //const request1 = new Request(`${self.location.href}Book/AddBook`, {
            //    method: "POST",
            //    headers: {
            //        "Content-Type": "application/json",
            //    },
            //    body: JSON.stringify(book),
            //});

            //this.post(request1)



            //var jqxhr = $.post(`${self.location.href}Book/AddBook`, function () {
            //    alert("success");
            //})
            //    .done(function () {
            //        alert("second success");
            //    })
            //    .fail(function () {
            //        alert("error");
            //    })
            //    .always(function () {
            //        alert("finished");
            //    });

            //// Perform other work here ...

            //// Set another completion function for the request above
            //jqxhr.always(function () {
            //    alert("second finished");
            //});

            //let url = self.origin + `/Book/AddBook`
            //$.ajax({
            //    type: "POST",
            //    url: url,
            //    data: book,
            //    dataType: "json",
            //    crossDomain: true,
            //    contentType: "application/json; charset=utf-8",
            //    success: function (data) {
            //        alert(data); // show response from the php script.
            //    }
            //});

            //const uri = 'api/Book/AddBook';

            //fetch(uri, {
            //    method: 'POST',
            //    headers: {
            //        'Accept': 'application/json',
            //        'Content-Type': 'application/json',
            //        'Connection': 'keep-alive'
            //    },
            //    body: JSON.stringify(book)
            //})
            //    .then(response => response.json())
            //    .then(() => {
            //        console.log('work')
            //        //getItems();
            //        //addNameTextbox.value = '';
            //    })
            //    .catch(error => console.error('Unable to add book.', error));

            // console.log(JSON.stringify(book))

            //$.ajax({
            //    url: `${self.location.href}api/Book`,
            //    method: "POST",
            //    data: JSON.stringify(book),
            //    //dataType: "json",
            //    contentType: "application/json; charset=utf-8",
            //   // 'Access-Control-Allow-Origin':'*',
            //    success: function (data) {
            //       console.log(data)
            //    }
            //});

            //console.log(JSON.stringify({
            //    "subject:title": "Test Name",
            //    "subject:description": "Creating test subject to check POST method API",
            //    "sub:tags": ["facebook:work", "facebook:likes"],
            //    "sampleSize": 10,
            //    "values": ["science", "machine-learning"]
            //}))




            //console.log(JSON.stringify(book))
            // console.log(book)
            //let sadsadasd = JSON.stringify(book)


            //console.log(JSON.parse(sadsadasd))
            //const uri = 'api/book';

            //fetch(uri, {
            //    method: 'POST',
            //    headers: {
            //        'Accept': 'application/json',
            //        'Content-Type': 'application/json'
            //    },
            //    body: book//JSON.stringify(book)
            //})
            //    .then(response => response.json())
            //    .then(() => {
            //       console.log('Hit')
            //    })
            //    .catch(error => console.error('Unable to add item.', error));

            //fetch(uri)
            //    .then(response => response.json())
            //    .then(data => console.log(data))
            //    .catch(error => console.error('Unable to get items.', error));

            let book = new Object;
            Array.prototype.forEach.call(this.addBookClass, (e) => {
                if (e.id == 'Image') book[`${e.id}`] = thisClass.output.src
                else book[`${e.id.replace('Select2', '')}`] = $(e).val()
            })

            let renameImage = book.Image.replace("data:image/jpeg;base64,", "").replace("data:image/png;base64,", "")

            console.log(renameImage)

            await $.ajax({
                type: 'POST',
                url: `${self.location.href}api/Book`,
                data: JSON.stringify({
                    "Title": `${book.Title}`,
                    "ISBN": `${book.ISBN}`,
                    "Author": `${book.Author}`,
                    "Publisher": `${book.Publisher}`,
                    "PublishDate": `${book.PublishDate}`,
                    "Categories": `${book.Categories}`,
                    "Description": `${book.Description}`,
                    "Image": `${renameImage}`,
                }),
                error: function (e) {
                    console.log(e);
                },
                dataType: "json",
                contentType: "application/json"
            });
        }

        readBase64(file) {
            console.log(file)
            //document.getElementById('imageInput').addEventListener('change', function (event) {
            //    const file = event.target.files[0];
            //    if (!file) {
            //        alert("No file selected.");
            //        return;
            //    }

            //    // Validate file type
            //    if (!file.type.startsWith("image/")) {
            //        alert("Please select an image file.");
            //        return;
            //    }

            //    const reader = new FileReader();
            //    reader.onload = function (e) {
            //        const base64String = e.target.result; // Data URL with Base64
            //        document.getElementById('output').textContent = base64String;
            //        console.log("Base64 String:", base64String);
            //    };
            //    reader.onerror = function () {
            //        alert("Error reading file.");
            //    };

            //    reader.readAsDataURL(file); // Converts to Base64
            //});

            //const reader = new FileReader();
            //reader.onload = function (e) {
            //    const base64String = e.target.result; // Data URL with Base64
            //    document.getElementById('output').textContent = base64String;
            //    console.log("Base64 String:", base64String);
            //};
            //reader.onerror = function () {
            //    alert("Error reading file.");
            //};

            //reader.readAsDataURL(file); // Converts to Base64

            var reader = new FileReader();
            reader.onload = function () {

                var arrayBuffer = this.result,
                    array = new Uint8Array(arrayBuffer),
                    binaryString = String.fromCharCode.apply(null, array);

                console.log(binaryString);

            }
            reader.readAsArrayBuffer(this.files[0]);
        }
    }
    new Home();
})();