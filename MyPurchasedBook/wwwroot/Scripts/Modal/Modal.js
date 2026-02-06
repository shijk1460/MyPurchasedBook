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

            this.btnConfirm.addEventListener('click', () => {
                let requireElement = document.querySelectorAll('[required]');
                let containsValue = Object.entries(requireElement).map((c) => c[1].value.length > 0);
                let checkRequired = containsValue.every(function (v) { return v === true })
                if (checkRequired) thisClass.AddBook()
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

        DropdownSelect2(){
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

        AddBook() {
            let data = {}
            Array.prototype.forEach.call(this.addBookClass, (e) => {
                data[`${e.id}`] = e.value
            })

            console.log(data)
        }
    }
    new Home();
})();