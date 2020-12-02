const main = () => {
    loadUserList()

    const addUserForm = document.querySelector(".add-user-form")
    addUserForm.addEventListener("submit", e => {
        e.preventDefault()
        ;(async function () {
            try {
                const response = await fetch("/api/add.php", {
                    method: "POST",
                    body: new FormData(e.target),
                })

                const text = await response.text()

                console.log(text)

                e.target.reset()

                resetPhoto()
                hidePhotoResetBtn()

                loadUserList()
            } catch (e) {
                console.error(e)
            }
        })()
    })

    const photoInput = document.querySelector("#photo")
    const photoPreview = document.querySelector(".add-user-photo-preview")
    const photoReset = document.querySelector(".add-user-photo-reset")
    photoInput.addEventListener("change", e => {
        const file = e.target.files[0]
        const fr = new FileReader()

        fr.onload = e => {
            photoPreview.style.backgroundImage = `url(${e.target.result})`
            photoPreview.innerHTML = ""
            showPhotoResetBtn()
        }

        fr.readAsDataURL(file)
    })

    photoReset.addEventListener("click", resetPhoto)
}

const loadUserList = async () => {
    const response = await fetch("/api/users.php")
    const data = await response.json()

    renderUserList(normalizeData(data))
}

const renderUserList = data => {
    const table = document.querySelector(".user-list-container")
    const tbody = table.querySelector("tbody")

    tbody.innerHTML = ""

    data.map(row => {
        const tr = document.createElement("tr")
        tr.classList.add("user-row")

        for (let prop in row) {
            const value = row[prop]
            const td = document.createElement("td")

            if (prop === "id") {
                continue
            }

            if (prop === "photo") {
                td.classList.add("user-row-photo-container")

                const div = document.createElement("div")
                const img = document.createElement("img")

                const noPhoto =
                    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSPgYHQLH78Sqfe1-DHsMWe_BVKgWmxj293lw&usqp=CAU"

                div.classList.add("user-row-photo")
                div.style.backgroundImage = `url(${value || noPhoto})`

                if (value) {
                    img.src = value
                    img.classList.add("user-row-photo-full")

                    div.appendChild(img)
                    div.addEventListener("click", () => {
                        img.classList.toggle("active")
                    })
                }

                td.appendChild(div)
            } else {
                td.classList.add("user-row-editable")

                td.setAttribute("data-name", prop)

                if (prop === "birthday") {
                    td.innerHTML = normalizeDateTime(value)
                } else {
                    td.innerHTML = value
                }
            }

            tr.appendChild(td)
        }

        const td = document.createElement("td")
        td.classList.add("user-row-actions-container")

        const actionsContainer = document.createElement("div")
        actionsContainer.classList.add("user-row-actions")

        const editIcon = document.createElement("i")
        editIcon.classList.add("fas")
        editIcon.classList.add("fa-pen")
        editIcon.classList.add("edit-btn")
        editIcon.setAttribute("data-id", row.id)
        editIcon.addEventListener("click", () => {
            if (editIcon.classList.contains("fa-pen")) {
                const editable = tr.querySelectorAll(".user-row-editable")

                editable.forEach(input =>
                    input.setAttribute("contenteditable", true)
                )

                editIcon.classList.remove("fa-pen")
                editIcon.classList.add("fa-check")
            } else {
                const editable = tr.querySelectorAll(".user-row-editable")
                const data = new FormData()

                editable.forEach(input => {
                    input.removeAttribute("contenteditable")
                    if (input.dataset.name === "birthday")
                        data.append(
                            input.dataset.name,
                            normalizeDateTimeToDb(input.innerHTML)
                        )
                    else data.append(input.dataset.name, input.innerHTML)
                })

                data.append("id", row.id)
                ;(async function () {
                    const response = await fetch("/api/update.php", {
                        method: "POST",
                        body: data,
                    })

                    const text = await response.text()

                    console.log(text)
                    loadUserList()
                })()

                editIcon.classList.remove("fa-check")
                editIcon.classList.add("fa-pen")
            }
        })

        const delIcon = document.createElement("i")
        delIcon.classList.add("fas")
        delIcon.classList.add("fa-trash")
        delIcon.classList.add("delete-btn")
        delIcon.setAttribute("data-id", row.id)
        delIcon.addEventListener("click", deleteUser)

        actionsContainer.appendChild(editIcon)
        actionsContainer.appendChild(delIcon)

        td.appendChild(actionsContainer)

        tr.appendChild(td)

        tbody.appendChild(tr)
    })
}

const normalizeData = data => {
    return data.map(item => ({
        id: item.id,
        photo: item.photo,
        name: item.name,
        birthday: item.birthday,
        uin: item.uin,
        phone: item.phone,
        adress: item.adress,
    }))
}

const deleteUser = e => {
    const body = new FormData()
    body.append("id", e.target.dataset.id)
    ;(async function () {
        try {
            const response = await fetch("/api/delete.php", {
                method: "POST",
                body,
            })

            const text = await response.text()

            console.log(text)

            loadUserList()
        } catch (e) {
            console.error(e)
        }
    })()
}

const resetPhoto = () => {
    const photoInput = document.querySelector("#photo")
    const photoPreview = document.querySelector(".add-user-photo-preview")

    photoInput.value = ""
    photoPreview.removeAttribute("style")
    photoPreview.innerHTML = "Загрузить фото"
    hidePhotoResetBtn()
}

const showPhotoResetBtn = () => {
    const photoReset = document.querySelector(".add-user-photo-reset")
    photoReset.classList.remove("hidden")
}

const hidePhotoResetBtn = () => {
    const photoReset = document.querySelector(".add-user-photo-reset")
    photoReset.classList.add("hidden")
}

const normalizeDateTime = inputDate => {
    const date = inputDate.split("-")
    const reversed = date.reverse()

    return reversed.join(".")
}

const normalizeDateTimeToDb = inputDate => {
    const date = inputDate.split(".")
    const reversed = date.reverse()

    return reversed.join("-")
}

document.addEventListener("DOMContentLoaded", main)
