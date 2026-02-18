(function () {
    class Home {
        constructor() {
            this.addBookClass = document.querySelectorAll('.addBook');
            this.addModal = document.getElementById('AddModal');
            this.Image = document.getElementById("Image")
            this.init()
        }

        init() {
            const thisClass = this
            this.GetBooks()
            this.addModal.addEventListener('hidden.bs.modal', () => {
                Array.prototype.forEach.call(thisClass.addBookClass, (e) => {
                    e.value = '';
                    if (e.type === 'file' && e.id === 'Image') {
                        var event = new Event('change');
                        thisClass.Image.dispatchEvent(event);
                    }
                    $(e).trigger('change')
                })
                thisClass.GetBooks()
            })

        }

        async GetBooks() {
            const thisClass = this

            await $.ajax({
                url: `${self.location.href}api/Book/GetBook`,
                type: "GET",
                success: function (data) {
                    if (data.length > 0) {
                        document.getElementById('custom-cards').replaceChildren();
                        const perRow = 3

                        const result = data.reduce((resultArray, item, index) => {
                            const chunkIndex = Math.floor(index / perRow)

                            if (!resultArray[chunkIndex]) {
                                resultArray[chunkIndex] = []
                            }

                            resultArray[chunkIndex].push(item)

                            return resultArray
                        }, [])

                        for (var i = 0; i < result.length; i++) {
                            thisClass.createCard(result[i])
                        }


                        document.getElementById('ft_card').classList.remove('d-none')
                    } else {
                        document.getElementById('ft_card').classList.add('d-none')
                    }
                }
            });
        }

        createCard(arr) {
            const thisClass = this
            const div = document.createElement("div");
            div.className = "row row-cols-1 row-cols-lg-3 align-items-stretch g-4 py-3";

            //console.log(arr)
            arr.forEach((value, index) => {
                //console.log(index)
                //console.log(value)

                const divCol = document.createElement("div");
                divCol.className = "col";

                const divCard = document.createElement("div");
                divCard.className = "card card-cover h-100 overflow-hidden text-bg-dark rounded-4 shadow-lg CardOnHover";

                const img = document.createElement("img");
                img.height = 400;
                img.src = `data:${value.ImageType};base64, ${value.Image}`;
                img.alt = `${value.Title}`
                img.onclick = () => {
                    let htmlbody = `<div class="row">
                                        <div class="col-12 col-md-6">
                                            <img id="video" class="w-100" style="border: 1px solid gray" src="data:${value.ImageType};base64, ${value.Image}"/>
                                        </div>
                                        <div class="col-12 col-md-6">
                                            <div><label class="col-form-label"><span class="font-bold">${value.Title}</span></label></div>
                                            <div><label class="col-form-label"><span class="font-bold">ISBN :</span> ${value.ISBN}</label></div>
                                            <div><label class="col-form-label"><span class="font-bold">ผู้เขียน :</span> ${value.Author}</label></div>
                                            <div><label class="col-form-label"><span class="font-bold">สำนักพิมพ์ :</span> ${value.Publisher}</label></div>
                                            <div><label class="col-form-label"><span class="font-bold">ปีที่พิมพ์ :</span> ${new Date(value.PublishDate).getFullYear()}</label></div>
                                            <div><label class="col-form-label"><span class="font-bold">หมวดหมู่ :</span> ${value.Categories}</label></div>
                                        </div>
                                        <div class="col-12">
                                            ${value.Description}
                                        </div>
                                    </div>`

                    Swal.fire({
                        customClass: 'swal-height',
                        width: 800,
                        padding: 10,
                        html: htmlbody,
                        showLoaderOnConfirm: true,
                        showCloseButton: false,
                        showDenyButton: true,
                        showCancelButton: true,
                        focusConfirm: false,
                        showConfirmButton: true,
                        cancelButtonText: `Close`,
                        confirmButtonText: "Edit",
                        denyButtonText: `Delete`,
                        draggable: true,
                        allowOutsideClick: () => {
                            !Swal.isLoading()
                            $('.swal2-close').trigger('click')
                        }
                    }).then((result) => {
                        if (result.isConfirmed) {
                            $('#AddModal').modal('toggle');
                            document.getElementById('AddBookLabel').innerHTML = 'Edit Book'
                            document.getElementById('Title').value = `${value.Title}`
                            document.getElementById('ISBN').value = `${value.ISBN}`
                            document.getElementById('ISBN').disabled = true
                            if (value.Author) {
                                let AuthorList = value.Author.split(',');
                                if (AuthorList.length > 0) {
                                    for (var i = 0; i < AuthorList.length; i++) {
                                        let optionsValue = Object.entries(document.querySelectorAll('#AuthorSelect2 option')).filter((option) => option[1].text == `${AuthorList[i]}`)
                                        optionsValue[0][1].selected = true
                                    }
                                }
                                $('#AuthorSelect2').trigger('change');
                            }

                            if (value.Publisher) {
                                let optionsValue = Object.entries(document.querySelectorAll('#PublisherSelect2 option')).filter((option) => option[1].text == `${value.Publisher}`)

                                $('#PublisherSelect2').val(`${optionsValue[0][1].value}`).trigger('change');
                            }
                            document.getElementById('PublishDate').value = `${new Date(value.PublishDate).getFullYear()}`

                            if (value.Categories) {
                                let CategoryList = value.Categories.split(',');
                                if (CategoryList.length > 0) {
                                    for (var i = 0; i < CategoryList.length; i++) {
                                        let optionsValue = Object.entries(document.querySelectorAll('#CategoriesSelect2 option')).filter((option) => option[1].text == `${CategoryList[i]}`)
                                        optionsValue[0][1].selected = true
                                    }
                                }
                                $('#CategoriesSelect2').trigger('change');
                            } 

                            document.getElementById('Description').value = `${value.Description}`

                            if (value.ImageType) {
                                const blob = new Blob([`data:${value.ImageType};base64, ${value.Image}`], { type: `${value.ImageType}` });

                                // Create a File object
                                const file = new File([blob], `image.${value.ImageType == 'image/jpeg' ? 'jpg' : 'png'}`, { type: `${value.ImageType}` });

                                // Create a DataTransfer object and add the file
                                const dataTransfer = new DataTransfer();
                                dataTransfer.items.add(file);

                                // Assign the file list to the input element
                                document.getElementById('Image').files = dataTransfer.files;
                                $('#Image').trigger('change')
                                    
                                document.getElementById('output').src = `data:${value.ImageType};base64, ${value.Image}`;
                                document.getElementById('divImage').classList.remove('d-none')
                            }
                            
                            !Swal.isLoading()
                            $('.swal2-close').trigger('click')
                        } else if (result.isDenied) {
                            !Swal.isLoading()
                            $('.swal2-close').trigger('click')
                            Swal.fire({
                                title: "Are you sure?",
                                text: "You won't be able to revert this!",
                                icon: "warning",
                                showCancelButton: true,
                                confirmButtonColor: "#3085d6",
                                cancelButtonColor: "#d33",
                                confirmButtonText: "Yes, delete it!"
                            }).then((result) => {
                                if (result.isConfirmed) {
                                    $.ajax({
                                        type: 'DELETE',
                                        url: `${self.location.href}api/Book/${value.ISBN}`,
                                        error: function (e) {
                                            console.log(e);
                                        },
                                        dataType: "json",
                                        contentType: "application/json",
                                    }).done(() => {
                                        Swal.fire({
                                            title: "Deleted!",
                                            text: "Your file has been deleted.",
                                            icon: "success"
                                        });
                                        thisClass.GetBooks()
                                    });
                                }
                            });
                        }
                    });
                };

                divCard.appendChild(img);
                divCol.appendChild(divCard);
                div.appendChild(divCol);
            })
            document.getElementById('custom-cards').appendChild(div);
        }
    }
    new Home();
})();