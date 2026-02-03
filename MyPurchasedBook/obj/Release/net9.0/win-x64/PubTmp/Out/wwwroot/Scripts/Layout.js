(function () {
    class Home {
        constructor() {
            this.mybutton = document.getElementById("myBtn");
            this.mybutton.onclick = this.topFunction()
            this.mybutton.style.display = "block";
        }

        topFunction() {
            console.log('test')

            Swal.fire({
                title: "Add book to my collection",
                input: "text",
                inputAttributes: {
                    autocapitalize: "off"
                },
                showCancelButton: true,
                confirmButtonText: "Look up",
                showLoaderOnConfirm: true,
                preConfirm: async (login) => {
                    try {
                        const githubUrl = `
        https://api.github.com/users/${login}
      `;
                        const response = await fetch(githubUrl);
                        if (!response.ok) {
                            return Swal.showValidationMessage(`
          ${JSON.stringify(await response.json())}
        `);
                        }
                        return response.json();
                    } catch (error) {
                        Swal.showValidationMessage(`
        Request failed: ${error}
      `);
                    }
                },
                allowOutsideClick: () => !Swal.isLoading()
            }).then((result) => {
                if (result.isConfirmed) {
                    Swal.fire({
                        title: `${result.value.login}'s avatar`,
                        imageUrl: result.value.avatar_url
                    });
                }
            });
        }

    }
    new Home();
})();

