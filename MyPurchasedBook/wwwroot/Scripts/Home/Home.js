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

            //this.btnAdd.style.display = "block";
            //this.btnAdd.addEventListener("click", (e) => {
            //    e.preventDefault();
            //    //thisClass.CheckCamera();

            //    const AddModal = document.getElementById('AddModal')
            //    console.log(AddModal)
            //    if (AddModal) {
            //        //exampleModal.addEventListener('show.bs.modal',async (event) => {
            //        //    // Button that triggered the modal
            //        //    const button = event.relatedTarget
            //        //    // Extract info from data-bs-* attributes
            //        //    const recipient = button.getAttribute('data-bs-whatever')
            //        //    // If necessary, you could initiate an Ajax request here
            //        //    // and then do the updating in a callback.

            //        //    // Update the modal's content.
            //        //    const modalTitle = exampleModal.querySelector('.modal-title')
            //        //    const modalBodyInput = exampleModal.querySelector('.modal-body input')

            //        //    //modalTitle.textContent = `New message to ${recipient}`
            //        //    //modalBodyInput.value = recipient

            //        //    //await thisClass.initSelect2()
            //        //})

            //        const modal = new Modal(AddModal, {
            //            backdrop: false,
            //            keyboard: true,
            //            focus: true
            //        });
            //        modal.show();
            //    }
            //});
















            await $.ajax({
                url: `${self.location.href}api/Book/GetBook`,
                type: "GET",
                success: function (data) {
                    if (data.length > 0) {
                        document.getElementById('custom-cards').replaceChildren();
                        //console.log(Object.entries(data))

                        const perRow = 3

                        const result = data.reduce((resultArray, item, index) => {
                            const chunkIndex = Math.floor(index / perRow)

                            if (!resultArray[chunkIndex]) {
                                resultArray[chunkIndex] = [] // start a new chunk
                            }

                            resultArray[chunkIndex].push(item)

                            return resultArray
                        }, [])

                        //console.log(result)

                        //Object.entries(result).forEach((value, index) => {
                        //    //console.log(index)
                        //    //console.log(value[1])
                        //    thisClass.createCard(value[1])
                        //})

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
            const div = document.createElement("div");
            div.className = "row row-cols-1 row-cols-lg-3 align-items-stretch g-4 py-3";




            /*
            










                @* <img src="Contents/img/unsplash-photo-2.jpg" alt="Alternate Text" height="381" /> *@
                <div class="d-flex flex-column h-100 p-5 pb-3 text-white text-shadow-1" height="381" style="background-image: url('Contents/img/unsplash-photo-3.jpg');">
                    <h3 class="pt-5 mt-5 mb-4 display-6 lh-1 fw-bold">Much longer title that wraps to multiple lines</h3>
                    <ul class="d-flex list-unstyled mt-auto">
                        <li class="me-auto">
                            <img src="https://github.com/twbs.png" alt="Bootstrap" width="32" height="32" class="rounded-circle border border-white">
                        </li>
                        <li class="d-flex align-items-center me-3">
                            <svg class="bi me-2" width="1em" height="1em" role="img" aria-label="Location"><use xlink:href="#geo-fill"></use></svg> <small>Pakistan</small>
                        </li>
                        <li class="d-flex align-items-center">
                            <svg class="bi me-2" width="1em" height="1em" role="img" aria-label="Duration"><use xlink:href="#calendar3"></use></svg> <small>4d</small>
                        </li>
                    </ul>
                </div>














            */



            //console.log(arr)
            arr.forEach((value, index) => {
                //console.log(index)
                //console.log(value)

                const divCol = document.createElement("div");
                divCol.className = "col";

                const divCard = document.createElement("div");
                divCard.className = "card card-cover h-100 overflow-hidden text-bg-dark rounded-4 shadow-lg CardOnHover";
                //divCard.className = "card card-cover h-100 overflow-hidden shadow-lg";

                const img = document.createElement("img");
                img.height = 400;
                //img.src = 'Contents/img/unsplash-photo-2.jpg';
                img.src = `data:${value.ImageType};base64, ${value.Image}`;
                img.onclick = () => {
                    console.log(value.ISBN)
                };

                const divDetail = document.createElement("div");
                divDetail.className = "d-flex flex-column h-100 p-5 pb-3 text-white text-shadow-1";

                const h3 = document.createElement("div");
                h3.className = "pt-5 mt-5 mb-4 display-6 lh-1 fw-bold";

                const ul = document.createElement("div");
                ul.className = "d-flex list-unstyled mt-auto";

                const liTitle = document.createElement("li");
                liTitle.className = "d-flex align-items-center me-auto";

                //const divDetail2 = document.createElement("div");
                //divDetail2.className = "desc";
                //divDetail2.innerHTML = "desc";

                //const svg = document.createElement("svg");
                //svg.className = "bi me-2";
                //svg.style.height = "1em";
                //svg.style.width = "1em";


                /*
                
                 <div class="responsive">
        <div class="gallery">
                <img src="img_5terre.jpg" alt="Cinque Terre" width="600" height="400">
            <div class="desc">Add a description of the image here</div>
        </div>
    </div>
                
                */












                const span = document.createElement("span");
                span.innerText = value.title;




                liTitle.appendChild(span);
                ul.appendChild(liTitle);

                divDetail.appendChild(h3);
                divDetail.appendChild(ul);
                divCard.appendChild(img);
                //divCard.appendChild(divDetail);
                //divCard.appendChild(divDetail2);
                divCol.appendChild(divCard);
                div.appendChild(divCol);
            })
            document.getElementById('custom-cards').appendChild(div);
        }
    }
    new Home();
})();