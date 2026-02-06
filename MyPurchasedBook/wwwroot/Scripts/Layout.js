(function () {
    class Layout {
        constructor() {
            this.btnAdd = document.getElementById("btnAdd");
            this.init()
        }

        init() {
            const thisClass = this;
            this.btnAdd.style.display = "block";
            this.btnAdd.addEventListener("click", (e) => {
                e.preventDefault();
                const AddModal = document.getElementById('AddModal')
                if (AddModal) {
                    $('#AddModal').modal('toggle');
                }
            });
        }

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
                            //thisClass.AddBook();
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
    }
    new Layout();
})();

