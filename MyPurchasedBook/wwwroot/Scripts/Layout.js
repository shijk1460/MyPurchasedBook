(function () {
    class Layout {
        constructor() {
            this.btnAdd = document.getElementById("btnAdd");
            this.init()
        }

        init() {
            const thisClass = this;
            this.btnAdd.style.display = "block";
            this.btnAdd.addEventListener("click", () => {
                //thisClass.CheckCamera();

                const exampleModal = document.getElementById('exampleModal')
                if (exampleModal) {
                    exampleModal.addEventListener('show.bs.modal',async (event) => {
                        // Button that triggered the modal
                        const button = event.relatedTarget
                        // Extract info from data-bs-* attributes
                        const recipient = button.getAttribute('data-bs-whatever')
                        // If necessary, you could initiate an Ajax request here
                        // and then do the updating in a callback.

                        // Update the modal's content.
                        const modalTitle = exampleModal.querySelector('.modal-title')
                        const modalBodyInput = exampleModal.querySelector('.modal-body input')

                        //modalTitle.textContent = `New message to ${recipient}`
                        //modalBodyInput.value = recipient

                        //await thisClass.initSelect2()
                    })
                }
            });

            
        }

        //async initSelect2() {
        //    $('#mySelect2').select2({
        //        tags: true,
        //        createTag: function (params) {
        //            if (params.term.indexOf('@@') === -1) {
        //                return null;
        //            }

        //            return {
        //                id: params.term,
        //                text: params.term
        //            }
        //        },
        //        insertTag: function (data, tag) {
        //            // Insert the tag at the end of the results
        //            data.push(tag);
        //        },
        //        placeholder: {
        //            id: '-1', // the value of the option
        //            text: 'Select an option'
        //        }
        //    });

        //    //$('#mySelect2').select2()
        //}

        CheckCamera() {
            const thisClass = this;
            const codeReader = new ZXing.BrowserMultiFormatReader()
            codeReader.listVideoInputDevices().then((videoInputDevices) => {
                if (videoInputDevices.length >= 1) {
                    videoInputDevices.forEach((element) => {
                        //        const sourceOption = document.createElement('option')
                        //        sourceOption.text = element.label
                        //        sourceOption.value = element.deviceId
                        //        sourceSelect.appendChild(sourceOption)
                        //console.log(element)
                        //console.log(navigator.mediaDevices)
                        if (navigator.mediaDevices.enumerateDevices.length > 0) {
                            const thisClass = this

                            Swal.fire({
                                title: `<h1 id="swal-header" class="d-none">Add Book</h1>`,
                                customClass: 'swal-height',
                                width: 600,
                                padding: 10,
                                html: `<video id="video" class="w-100" style="border: 1px solid gray"></video><button id="scan_again" class="d-none">Scan Again</button>`,
                                showLoaderOnConfirm: true,
                                showCloseButton: false,
                                showCancelButton: true,
                                focusConfirm: false,
                                showConfirmButton: false,
                                cancelButtonText: `Cancel`,
                                cancelButtonAriaLabel: "Thumbs down",
                                allowOutsideClick: () => {
                                    !Swal.isLoading()
                                    codeReader.stopStreams()
                                    document.getElementById('video').classList.add('d-none')
                                    $('.swal2-close').trigger('click')
                                }
                            })

                            document.getElementById('swal2-title').classList.add('d-none')
                            //document.querySelector('.swal2-actions').classList.add('d-none')

                            document.getElementById("scan_again").addEventListener("click", () => {
                                document.getElementById('video').classList.remove('d-none')
                                thisClass.ReadBarcode()
                            })

                            this.ReadBarcode()
                        }
                        else {
                            //Toastify({
                            //    text: `Don't have camera`,
                            //    duration: 3000,
                            //    destination: "https://github.com/apvarun/toastify-js",
                            //    newWindow: true,
                            //    close: false,
                            //    gravity: "top", // `top` or `bottom`
                            //    position: "center", // `left`, `center` or `right`
                            //    stopOnFocus: true, // Prevents dismissing of toast on hover
                            //    style: {
                            //        //background: "linear-gradient(to right, #00b09b, #96c93d)",
                            //        background: "linear-gradient(to right, #b00000, #b01500)",
                            //    },
                            //    onClick: function () { } // Callback after click
                            //}).showToast();
                            thisClass.AddBook();
                        }
                        //console.log(navigator.mediaDevices.getUserMedia(element))
                    })
                }
            })
            //const thisClass = this

            //Swal.fire({
            //    title: `<h1 id="swal-header" class="d-none">Add Book</h1>`,
            //    customClass: 'swal-height',
            //    width: 600,
            //    padding: 10,
            //    html: `<video id="video" class="w-100" style="border: 1px solid gray"></video><button id="scan_again" class="d-none">Scan Again</button`,
            //    showLoaderOnConfirm: true,
            //    //preConfirm: async (login) => {
            //    //    try {
            //    //        document.getElementById('video').classList.remove('d-none')
            //    //        thisClass.ReadBarcode()

            //    //        //const githubUrl = `https://api.github.com/users/${login}`;
            //    //        //const response = await fetch(githubUrl);
            //    //        //if (!response.ok) {
            //    //        //    return Swal.showValidationMessage(`${JSON.stringify(await response.json())}`);
            //    //        //}
            //    //        //return response.json();
            //    //    } catch (error) {
            //    //        Swal.showValidationMessage(`Request failed: ${error}`);
            //    //    }
            //    //},
            //    showCloseButton: false,
            //    showCancelButton: true,
            //    focusConfirm: false,
            //    //confirmButtonText: `<i class="fa fa-thumbs-up"></i> Add`,
            //    showConfirmButton: false,
            //    cancelButtonText: `Cancel`,
            //    cancelButtonAriaLabel: "Thumbs down",
            //    allowOutsideClick: () => {
            //        !Swal.isLoading()
            //        codeReader.stopStreams()
            //        document.getElementById('video').classList.add('d-none')
            //        $('.swal2-close').trigger('click')
            //    }
            //})/*.then((result) => {
            //        if (result.isConfirmed) {
            //            //Swal.fire({
            //            //    title: `${result.value.login}'s avatar`,
            //            //    imageUrl: result.value.avatar_url
            //            //});

            //            document.getElementById('video').classList.remove('d-none')
            //            thisClass.ReadBarcode()
            //        }
            //    });*/

            //document.getElementById('swal2-title').classList.add('d-none')
            ////document.querySelector('.swal2-actions').classList.add('d-none')

            //document.getElementById("scan_again").addEventListener("click", () => {
            //    document.getElementById('video').classList.remove('d-none')
            //    thisClass.ReadBarcode()
            //})

            //this.ReadBarcode()
            //codeReader.listVideoInputDevices().then((videoInputDevices) => {
            //        //const sourceSelect = document.getElementById('sourceSelect')
            //        selectedDeviceId = videoInputDevices[0].deviceId
            //        //if (videoInputDevices.length >= 1) {
            //        //    videoInputDevices.forEach((element) => {
            //        //        const sourceOption = document.createElement('option')
            //        //        sourceOption.text = element.label
            //        //        sourceOption.value = element.deviceId
            //        //        sourceSelect.appendChild(sourceOption)
            //        //    })

            //        //    sourceSelect.onchange = () => {
            //        //        selectedDeviceId = sourceSelect.value;
            //        //    };

            //        //    const sourceSelectPanel = document.getElementById('sourceSelectPanel')
            //        //    sourceSelectPanel.style.display = 'block'
            //        //}

            //        //document.getElementById('startButton').addEventListener('click', () => {
            //            codeReader.decodeFromVideoDevice(selectedDeviceId, 'video', (result, err) => {
            //                if (result) {
            //                    //console.log(result)
            //                    console.log(result.text)
            //                    //console.log(codeReader)
            //                    codeReader.stopStreams()
            //                    document.getElementById('video').classList.add('d-none')
            //                    document.getElementById('swal-header').classList.remove('d-none')
            //                    document.getElementById('swal2-title').classList.remove('d-none')
            //                    document.querySelector('.swal2-actions').classList.remove('d-none')

            //                    Toastify({
            //                        text: `${result.text}`,
            //                        duration: 3000,
            //                        destination: "https://github.com/apvarun/toastify-js",
            //                        newWindow: true,
            //                        close: false,
            //                        gravity: "top", // `top` or `bottom`
            //                        position: "center", // `left`, `center` or `right`
            //                        stopOnFocus: true, // Prevents dismissing of toast on hover
            //                        style: {
            //                            background: "linear-gradient(to right, #00b09b, #96c93d)",
            //                        },
            //                        onClick: function () { } // Callback after click
            //                    }).showToast();





            //                    //$('.swal2-close').trigger('click')

            //                    //document.getElementById('result').textContent = result.text
            //                }
            //                if (err && !(err instanceof ZXing.NotFoundException)) {
            //                    console.error(err)
            //                    //document.getElementById('result').textContent = err
            //                }
            //            })
            //            //console.log(`Started continous decode from camera with id ${selectedDeviceId}`)
            //        //})

            //        //document.getElementById('resetButton').addEventListener('click', () => {
            //        //    codeReader.reset()
            //        //    document.getElementById('result').textContent = '';
            //        //    console.log('Reset.')
            //        //})

            //    })
            //    .catch((err) => {
            //        console.error(err)
            //    })

            /*
         
<script type="text/javascript">
window.addEventListener('load', function () {
  let selectedDeviceId;
  const codeReader = new ZXing.BrowserMultiFormatReader()
  console.log('ZXing code reader initialized')
  codeReader.listVideoInputDevices()
    .then((videoInputDevices) => {
      const sourceSelect = document.getElementById('sourceSelect')
      selectedDeviceId = videoInputDevices[0].deviceId
      if (videoInputDevices.length >= 1) {
        videoInputDevices.forEach((element) => {
          const sourceOption = document.createElement('option')
          sourceOption.text = element.label
          sourceOption.value = element.deviceId
          sourceSelect.appendChild(sourceOption)
        })

        sourceSelect.onchange = () => {
          selectedDeviceId = sourceSelect.value;
        };

        const sourceSelectPanel = document.getElementById('sourceSelectPanel')
        sourceSelectPanel.style.display = 'block'
      }

      document.getElementById('startButton').addEventListener('click', () => {
        codeReader.decodeFromVideoDevice(selectedDeviceId, 'video', (result, err) => {
          if (result) {
            console.log(result)
            document.getElementById('result').textContent = result.text
          }
          if (err && !(err instanceof ZXing.NotFoundException)) {
            console.error(err)
            document.getElementById('result').textContent = err
          }
        })
        console.log(`Started continous decode from camera with id ${selectedDeviceId}`)
      })

      document.getElementById('resetButton').addEventListener('click', () => {
        codeReader.reset()
        document.getElementById('result').textContent = '';
        console.log('Reset.')
      })

    })
    .catch((err) => {
      console.error(err)
    })
})
</script>
            
            
            
            
            
            
            
            
            
            */
        }

        ReadBarcode() {
            let selectedDeviceId;
            const codeReader = new ZXing.BrowserMultiFormatReader()
            codeReader.listVideoInputDevices().then((videoInputDevices) => {
                //const sourceSelect = document.getElementById('sourceSelect')
                selectedDeviceId = videoInputDevices[0].deviceId
                //if (videoInputDevices.length >= 1) {
                //    videoInputDevices.forEach((element) => {
                //        const sourceOption = document.createElement('option')
                //        sourceOption.text = element.label
                //        sourceOption.value = element.deviceId
                //        sourceSelect.appendChild(sourceOption)
                //    })

                //    sourceSelect.onchange = () => {
                //        selectedDeviceId = sourceSelect.value;
                //    };

                //    const sourceSelectPanel = document.getElementById('sourceSelectPanel')
                //    sourceSelectPanel.style.display = 'block'
                //}

                //document.getElementById('startButton').addEventListener('click', () => {
                codeReader.decodeFromVideoDevice(selectedDeviceId, 'video', (result, err) => {
                    if (result) {
                        //console.log(result)
                        console.log(result.text)
                        //console.log(codeReader)
                        codeReader.stopStreams()
                        document.getElementById('video').classList.add('d-none')
                        document.getElementById('swal-header').classList.remove('d-none')
                        document.getElementById('swal2-title').classList.remove('d-none')
                        //document.querySelector('.swal2-actions').classList.remove('d-none')

                        Toastify({
                            text: `${result.text}`,
                            duration: 3000,
                            destination: "https://github.com/apvarun/toastify-js",
                            newWindow: true,
                            close: false,
                            gravity: "top", // `top` or `bottom`
                            position: "center", // `left`, `center` or `right`
                            stopOnFocus: true, // Prevents dismissing of toast on hover
                            style: {
                                background: "linear-gradient(to right, #00b09b, #96c93d)",
                            },
                            onClick: function () { } // Callback after click
                        }).showToast();





                        //$('.swal2-close').trigger('click')

                        //document.getElementById('result').textContent = result.text
                    }
                    if (err && !(err instanceof ZXing.NotFoundException)) {
                        console.error(err)
                        //document.getElementById('result').textContent = err
                    }
                })
                //})

                //document.getElementById('resetButton').addEventListener('click', () => {
                //    codeReader.reset()
                //    document.getElementById('result').textContent = '';
                //    console.log('Reset.')
                //})

            })
        }

        AddBook() {
            let htmlBody = `<div class="w-100 overflow">
                                <div class="input-group mb-3">
                                    <span class="input-group-text">Title</span>
                                    <input type="text" id="Title" class="form-control">
                                </div>

                                <div class="input-group mb-3">
                                    <span class="input-group-text">ISBN</span>
                                    <input type="text" id="ISBN" minlength="13" maxlength="13" class="form-control">
                                </div>

                                <div class="input-group mb-3">
                                    <span class="input-group-text">Author</span>
                                    <select class="form-select sdsd">
                                       
                                    </select>
                                </div>

                                <div class="input-group mb-3">
                                    <span class="input-group-text">Publisher</span>
                                    <input type="text" id="Publisher" class="form-control">
                                </div>

                                <div class="input-group mb-3">
                                    <span class="input-group-text">Publish Date</span>
                                    <input type="text" id="PublishDate" class="form-control">
                                </div>

                                <div class="input-group mb-3">
                                    <span class="input-group-text">Categories</span>
                                    <input type="text" id="Categories" class="form-control">
                                </div>

                                <div class="input-group mb-3">
                                    <span class="input-group-text">Description</span>
                                    <textarea id="Description" class="form-control"></textarea>
                                </div>

                                <div class="input-group mb-3">
                                    <span class="input-group-text">Image</span>
                                    <input class="form-control" type="file" id="Image">
                                </div>
                            </div>`;

            Swal.fire({
                title: `<h1 id="swal-header">Add Book</h1>`,
                customClass: 'swal-height',
                width: 600,
                padding: 10,
                html: htmlBody,
                showLoaderOnConfirm: true,
                showCloseButton: false,
                showCancelButton: true,
                focusConfirm: false,
                showConfirmButton: true,
                cancelButtonText: `Cancel`,
                cancelButtonAriaLabel: "Thumbs down",
                allowOutsideClick: false
                //allowOutsideClick: () => {
                //    !Swal.isLoading()
                //    $('.swal2-close').trigger('click')
                //}
            }).then((result) => {
                if (result.isConfirmed) {
                    console.log("work")
                }
            })


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

                //$(".form-select").select2({
                //    data: data
                //})

                //<select class="form-select" id="Author" name="states[]" multiple="multiple">
                //    <option value="AL">Alabama</option>
                //</select>
            (".sdsd").select2({
                data: data,
                createTag: function (params) {
                    // Don't offset to create a tag if there is no @ symbol
                    if (params.term.indexOf('@') === -1) {
                        // Return null to disable tag creation
                        return null;
                    }

                    return {
                        id: params.term,
                        text: params.term
                    }
                }
            });
        }
    }
    new Layout();
})();

