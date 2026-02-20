(function () {
    class Home {
        constructor() {
            this.Title = document.getElementById("Title")
            this.Image = document.getElementById("Image")
            this.divImage = document.getElementById("divImage")
            this.output = document.getElementById('output');
            this.isbn = document.getElementById("ISBN")
            this.elementsSelect = document.body.getElementsByTagName('select');
            this.btnConfirm = document.getElementById('btnConfirm');
            this.addBookClass = document.querySelectorAll('.addBook');
            this.price = document.getElementById("Price")

            this.DropdownSelect2();
            this.init()
        }

        init() {
            const thisClass = this;
            this.SetYear();

            this.Title.addEventListener("blur", async (e) => {
                if (e.target.value) {
                    await $.ajax({
                        type: 'GET',
                        url: `${self.location.href}api/Book/CheckTitleBook`,
                        data: { "TitleName": `${e.target.value}`, },
                        error: function (e) {
                            console.log(e);
                        },
                        dataType: "json",
                        contentType: "application/json",
                    }).done((res) => {
                        if (res) {
                            ToastMessage(`${e.target.value} already exist`)
                            e.target.value = '';
                        }
                        else return
                    });
                }
            })

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

            this.isbn.addEventListener("blur", (e) => {
                if (e.target.value.length == 10 || e.target.value.length == 13) {
                    e.preventDefault();

                    $.ajax({
                        type: 'GET',
                        url: `${self.location.href}api/Book/CheckISBN`,
                        data: { "ISBN": `${e.target.value}`, },
                        error: function (e) {
                            console.log(e);
                        },
                        dataType: "json",
                        contentType: "application/json",
                    }).done((res) => {
                        if (res) {
                            if (e.target.value) ToastMessage(`${e.target.value} already exist`)
                            e.target.value = '';
                        }
                        else return
                    });

                    if (e.target.value.length == 10) {
                        let checkISBN10digit = thisClass.CheckISBN10(e.target.value)
                        if (checkISBN10digit != e.target.value.charAt(e.target.value.length - 1)) thisClass.SetInvalidISBN(e.target)
                    }
                    else {
                        let checkISBN13digit = thisClass.CheckISBN13(e.target.value)
                        if (checkISBN13digit != e.target.value.charAt(e.target.value.length - 1)) thisClass.SetInvalidISBN(e.target)
                    }
                }
                else thisClass.SetInvalidISBN(e.target)
            });

            Array.prototype.forEach.call(this.elementsSelect, (e) => {
                if (e.required) {
                    if (e.nextElementSibling) {
                        e.nextElementSibling.children[0].children[0].classList.add('select2Required')
                    }

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

            this.price.addEventListener("beforeinput", (e) => {
                if (!((e.data >= 0 && e.data <= 9) || e.data == '.')) {
                    e.preventDefault();
                }
            });

            this.price.addEventListener("blur", (e) => {
                if (isNaN(parseFloat(e.target.value).toFixed(2))) e.target.value = ''
                else e.target.value = parseFloat(e.target.value).toFixed(2)
            });
        }

        async DropdownSelect2() {
            await this.GetAuthorList()

            await this.GetPublisherList()

            await this.GetCategoriesList()
        }

        async GetAuthorList() {
            const thisClass = this
            await $.ajax({
                type: 'GET',
                url: `${self.location.href}api/Author/GetAuthorList`,
                error: function (e) {
                    console.log(e);
                },
                dataType: "json",
                contentType: "application/json",
            }).done((res) => {
                let data = thisClass.SetDataSelect2(res)

                $('#AuthorSelect2').select2({
                    dropdownParent: $('#AddModal'),
                    tags: true,
                    allowClear: true,
                    placeholder: 'Select/Add Author(s)',
                    data: data,
                }).val(null).trigger('change');
            });
        }

        async GetPublisherList() {
            const thisClass = this
            await $.ajax({
                type: 'GET',
                url: `${self.location.href}api/Publisher/GetPublisherList`,
                error: function (e) {
                    console.log(e);
                },
                dataType: "json",
                contentType: "application/json",
            }).done((res) => {
                let data = thisClass.SetDataSelect2(res)

                $('#PublisherSelect2').select2({
                    dropdownParent: $('#AddModal'),
                    tags: true,
                    allowClear: true,
                    placeholder: 'Select/Add Publisher(s)',
                    data: data,
                }).val(null).trigger('change');
            });
        }

        async GetCategoriesList() {
            const thisClass = this
            await $.ajax({
                type: 'GET',
                url: `${self.location.href}api/Category/GetCategoryList`,
                error: function (e) {
                    console.log(e);
                },
                dataType: "json",
                contentType: "application/json",
            }).done((res) => {
                let data = thisClass.SetDataSelect2(res)

                $('#CategoriesSelect2').select2({
                    dropdownParent: $('#AddModal'),
                    tags: true,
                    allowClear: true,
                    placeholder: 'Select/Add Author(s)',
                    data: data,
                }).val(null).trigger('change');
            });
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
            let book = new Object;
            let imageType = ""
            Array.prototype.forEach.call(this.addBookClass, (e) => {
                if (e.id == 'Image') {
                    if (thisClass.output.src) book[`${e.id}`] = thisClass.output.src
                    if (e.files[0]) imageType = e.files[0].type
                }
                else if (e.id == 'Price') book[`${e.id}`] = parseFloat($(e).val()).toFixed(2)
                else book[`${e.id.replace('Select2', '')}`] = $(e).val()
            })

            let renameImage = book.Image ? book.Image.replace(`data:${imageType};base64,`, "") : ""
            await $.ajax({
                type: document.getElementById('AddBookLabel').innerHTML == 'Add Book' ? 'POST' : 'PUT',
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
                    "ImageType": `${imageType}`,
                    "Price": `${book.Price}`
                }),
                error: function (e) {
                    console.log(e);
                },
                dataType: "json",
                contentType: "application/json"
            });
            
            $('#AddModal').modal('toggle');
        }

        CheckISBN10(digits) {
            let i, s = 0, t = 10;

            for (i = 0; i < 9; i++) {
                s += digits[i] * t;
                t = t - 1;
            }
            return (11 - (s % 11)) % 11;
        }

        CheckISBN13(digits) {
            let i, s = 0, t = 0, odd = 1, even = 3;
            for (i = 0; i < 12; ++i) {
                if (i % 2 == 0) t = digits[i] * odd;
                else t = digits[i] * even;
                s += t;
            }

            return 10 - (s % 10) == 10 ? 0 : 10 - (s % 10);
        }

        SetInvalidISBN(input) {
            input.value = ''
            ToastMessage(`Your ISBN not valid`)
        }

        SetDataSelect2(arr) {
            let data = []
            if (arr.length > 0) arr.forEach((item) => {
                let list = {}
                list.id = item.ID
                list.text = item.Name
                data.push(list)
            })

            return data
        }

        SetYear() {
            $('#PublishDate').Zebra_DatePicker({
                format: 'Y'   
            });
        }
    }
    new Home();
})();