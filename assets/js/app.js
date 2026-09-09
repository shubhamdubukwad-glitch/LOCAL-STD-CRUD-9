var cl = console.log;

const stdForm = document.getElementById('stdForm')
const fname = document.getElementById('fname')
const lname = document.getElementById('lname')
const email = document.getElementById('email')
const contect = document.getElementById('contect')
const address = document.getElementById('address')
const addstdBtn = document.getElementById('addstdBtn')
const updatestdBtn = document.getElementById('updatestdBtn')
const stdcontainer = document.getElementById('stdcontainer')

// let stdArr = [
//     {
//         fname: "shubham",
//         lname: "dubukwad",
//         email: "shubhamdubukwad32@gmail.com",
//         contect: 8600660293,
//         address: "gudsoor",
//         id: '2341'
//     },
//     {
//         fname: "vishal",
//         lname: "kale",
//         email: "viskal2@.com",
//         contect: 435260293,
//         address: "pune",
//         id: '234541'
//     },
//     {
//         fname: "kiran",
//         lname: "patil",
//         email: "kiranpatil@.com",
//         contect: 46874293,
//         address: "udgir",
//         id: '4536453'
//     },
//     {
//         fname: "kartik",
//         lname: "allamkhane",
//         email: "kartik1212@.com",
//         contect: 456566668654,
//         address: "bidar",
//         id: '6546'
//     },

// ];
// localStorage.setItem('stdArr', JSON.stringify(stdArr));


let sdtjson = localStorage.getItem('stdArr');
// cl(sdtjson)

let stdArr = JSON.parse(localStorage.getItem('stdArr'))
// cl(stdArr)

//readstd//
function readstd(arr) {
    let result = ``;
    arr.forEach((ele, i) => {
        result += `<tr id="${ele.id}">
                                        <td>${i + 1}</td>
                                        <td>${ele.fname}</td>
                                        <td>${ele.lname}</td>
                                        <td>${ele.email}</td>
                                        <td>${ele.contect}</td>
                                        <td>${ele.address}</td>
                                        <th>
                                            <i onclick="editstd(this)" class="fa-regular fa-pen-to-square fa-2x text-primary"></i>
                                        </th>
                                        <th> 
                                            <i onclick="deletestd(this)" class="fa-solid fa-trash fa-2x text-danger"></i>
                                        </th>
                                    </tr>`;
    });
    stdcontainer.innerHTML = result;
}
readstd(stdArr)

//createstd//
function oncreatestd(ele) {
    ele.preventDefault()
    let createobj = {
        fname: fname.value,
        lname: lname.value,
        email: email.value,
        contect: contect.value,
        address: address.value,
        id: Date.now().toString()
    }
    stdArr.push(createobj)
    stdForm.reset()
    localStorage.setItem('stdArr', JSON.stringify(stdArr))

    let tr = document.createElement('tr')
    tr.innerHTML = `                      <td>${stdArr.length}</td>
                                        <td>${createobj.fname}</td>
                                        <td>${createobj.lname}</td>
                                        <td>${createobj.email}</td>
                                        <td>${createobj.contect}</td>
                                        <td>${createobj.address}</td>
                                        <th>
                                            <i onclick="editstd(this)" class="fa-regular fa-pen-to-square fa-2x text-primary"></i>
                                        </th>
                                        <th> 
                                            <i  onclick="deletestd(this)" class="fa-solid fa-trash fa-2x text-danger"></i>
                                        </th>`;
    stdcontainer.append(tr)

    Swal.fire({
        title: 'STD CREATED',
        text: 'Do you want to continue',
        icon: 'success',
        timer: 4000
    })
}

//editstd//
function editstd(ele) {
    let editid = ele.closest('tr').id;
    localStorage.setItem('editid', editid)
    let editobj = stdArr.find(p => p.id === editid)

    fname.value = editobj.fname;
    lname.value = editobj.lname;
    email.value = editobj.email;
    contect.value = editobj.contect;
    address.value = editobj.address

    addstdBtn.classList.add('d-none')
    updatestdBtn.classList.remove('d-none');

}

//updatestd//
function onupdatestd() {
    let updateid = localStorage.getItem('editid');
    localStorage.removeItem('editid')
    let updateobj = {
        fname: fname.value,
        lname: lname.value,
        email: email.value,
        contect: contect.value,
        address: address.value,
        id: updateid
    }
    let getIndex = stdArr.findIndex(p => p.id === updateid)
    stdArr[getIndex] = updateobj;
    localStorage.setItem('stdArr', JSON.stringify(stdArr))

    let tr = document.getElementById(updateid).children
    tr[1].innerText = updateobj.fname;
    tr[2].innerText = updateobj.lname;
    tr[3].innerText = updateobj.email;
    tr[4].innerText = updateobj.contect;
    tr[5].innerText = updateobj.address;
    stdForm.reset()
    addstdBtn.classList.remove('d-none');
    updatestdBtn.classList.add('d-none');

    Swal.fire({
        title: 'STD updated successfully',
        text: 'Do you want to continue',
        icon: 'success',
        timer: 4000
    })
}


//deletestd//
function deletestd(ele) {
    let deleteid = ele.closest('tr').id;
    let getconfermation = confirm(`are you sure can delete your information ?`)
    if (getconfermation) {
        let getIndex = stdArr.findIndex(p => p.id === deleteid)
        stdArr.splice(getIndex, 1)
        ele.closest('tr').remove()
        let allrows=document.querySelectorAll('#stdcontainer tr td:first-child');
        allrows.forEach((ele,i)=>{ele.innerText=i+1})
        localStorage.setItem('stdArr', JSON.stringify(stdArr))

        Swal.fire({
            title: 'STD deleted',
            text: 'Do you want to continue',
            icon: 'success',
            timer: 4000
        })
    }
}
stdForm.addEventListener('submit', oncreatestd);
updatestdBtn.addEventListener('click', onupdatestd);