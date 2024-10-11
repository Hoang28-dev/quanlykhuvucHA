class khuvuc {
  constructor(maKV, tenKV, diaChi, SDT, trangThai) {
    this.maKV = maKV;
    this.tenKV = tenKV;
    this.diaChi = diaChi;
    this.SDT = SDT;
    this.trangThai = trangThai;
  }
  input() {
    this.maKV = document.getElementById("maKV").value;
    this.tenKV = document.getElementById("tenKV").value;
    this.diaChi = document.getElementById("diaChi").value;
    this.SDT = document.getElementById("SDT").value;
    this.trangThai = document.getElementById("select").value;

    // if (document.getElementById("gender-male").checked) {
    //   this.gender = document.getElementById("gender-male").value;
    // } else if ((gender = document.getElementById("gender-female").checked)) {
    //   this.gender = document.getElementById("gender-female").value;
    // }

    console.log(this);
    console.log(this.maKV);
  }
  check() {
    // check đầy đủ thông tin
    if (_.isEmpty(this.maKV)) {
      let ok = document.getElementById("maKV-error");
      ok.innerHTML = "Vui lòng nhập đầy đủ thông tin!";
    } else {
      let ok = document.getElementById("maKV-error");
      ok.innerHTML = "";
    }
    if (_.isEmpty(this.tenKV)) {
      let ok = document.getElementById("tenKV-error");
      ok.innerHTML = "Vui lòng nhập đầy đủ thông tin!";
    } else {
      let ok = document.getElementById("tenKV-error");
      ok.innerHTML = "";
    }
    if (_.isEmpty(this.diaChi)) {
      let ok = document.getElementById("diaChi-error");
      ok.innerHTML = "Vui lòng nhập đầy đủ thông tin!";
    } else {
      let ok = document.getElementById("diaChi-error");
      ok.innerHTML = "";
    }
    if (_.isEmpty(this.SDT)) {
      let ok = document.getElementById("SDT-error");
      ok.innerHTML = "Vui lòng nhập đầy đủ thông tin!";
    } else {
      let ok = document.getElementById("SDT-error");
      ok.innerHTML = "";
    }
    // if (_.isEmpty(this.gender)) {
    //   let ok = document.getElementById("gender-error");
    //   ok.innerHTML = "Vui lòng nhập đầy đủ thông tin!";
    // } else {
    //   let ok = document.getElementById("gender-error");
    //   ok.innerHTML = "";
    // }
    let check = true;
    let inf = localStorage.getItem("inf")
      ? JSON.parse(localStorage.getItem("inf"))
      : [];
    // check trùng lặp
    for (let index = 0; index < inf.length; index++) {
      const element = inf[index];
      if (element.maKV === this.maKV) {
        let ok = document.getElementById("maKV-error");
        ok.innerHTML = "Mã khu vực đã tồn tại!";
        check = false;
      } else {
        let ok = document.getElementById("maKV-error");
        ok.innerHTML = "";
        check = true;
      }
    }
    for (let index = 0; index < inf.length; index++) {
      const element = inf[index];
      if (element.SDT === this.SDT) {
        let ok = document.getElementById("SDT-error");
        ok.innerHTML = "Số điện thoại đã tồn tại!";
        check = false;
      } else {
        let ok = document.getElementById("SDT-error");
        ok.innerHTML = "";
        check = true;
      }
    }
    return check;
  }
  hienthi() {
    let inf = localStorage.getItem("inf")
      ? JSON.parse(localStorage.getItem("inf"))
      : [];
    // falsy
    // lay thong tin tu localstorage ra trả về các mảng
    // console.log(students.length);
    if (inf.length === 0) {
      document.getElementById("table-field").style.display = "none";
      return false;
    }
    document.getElementById("table-field").style.display = "block";

    let tableContent = `<tr>
            <td>#</td>
            <td>Mã khu vực</td>
            <td>Tên khu vực</td>
            <td>Địa chỉ</td>
            <td>Số điện thoại</td>
            <td>Trạng thái</td>
          </tr>`;
    inf.forEach((it, index) => {
      let itemID = index;
      index++;
      tableContent += `<tr id="r${index}" class="tr" onclick="showinfo(${itemID})"  onmousemove="hov(${itemID})" onmouseout="hideinf(${itemID})">
                    <td>${index}</td>
                    <td>${it.maKV}</td>
                    <td>${it.tenKV}</td>
                    <td>${it.diaChi}</td>
                    <td>${it.SDT}</td>
                    <td>${it.trangThai}</td>
                    <td><a href="#" onclick='xoa(${itemID})'>Delete</a> || <a id="btn-edit" href="#"  onclick='edit()' >Edit</a></td>
                  </tr>`;
    });
    document.getElementById("table-KV").innerHTML = tableContent;
  }
  luu() {
    if (
      this.maKV &&
      this.tenKV &&
      this.diaChi &&
      this.SDT &&
      this.trangThai &&
      this.check
    ) {
      console.log("ok2");
      let inf = localStorage.getItem("inf")
        ? JSON.parse(localStorage.getItem("inf"))
        : [];
      // lay thong tin tu localstorage ra trả về các mảng
      // let students = [];
      console.log(inf);
      inf.push({
        maKV: this.maKV,
        tenKV: this.tenKV,
        diaChi: this.diaChi,
        SDT: this.SDT,
        trangThai: this.trangThai,
      });
      // add phàn tử mới vào mảng
      console.log(inf);
      localStorage.setItem("inf", JSON.stringify(inf));
      // Chuyển về chuỗi và Truyền giá trị vào strorage
      // LocalStorage chỉ lưu chuỗi văn bản không lưu object
      setnull();
      this.hienthi();
    }
  }
  xoa(id) {
    let inf = localStorage.getItem("inf")
      ? JSON.parse(localStorage.getItem("inf"))
      : [];
    inf.splice(id, 1);
    // students[0].fullname='ádf'
    console.log(inf);
    console.log(inf[id]);

    localStorage.setItem("inf", JSON.stringify(inf));
  }
  showinf(id) {
    let inf = localStorage.getItem("inf")
      ? JSON.parse(localStorage.getItem("inf"))
      : [];
    document.getElementById("maKV").value = inf[id].maKV;
    document.getElementById("tenKV").value = inf[id].tenKV;
    document.getElementById("diaChi").value = inf[id].diaChi;
    document.getElementById("SDT").value = inf[id].SDT;
    op = document.getElementById("select").value = inf[id].trangThai;
    op.seleted = "true";
    // console.log(students[id].gender);
    // if (inf[id].gender == "male") {
    //   document.getElementById("gender-male").checked = true;
    //   document.getElementById("gender-female").checked = false;
    // } else if (inf[id].gender == "female") {
    //   document.getElementById("gender-female").checked = true;
    //   document.getElementById("gender-male").checked = false;
    // }
    const tr = document.getElementsByTagName("tr");
  }
  hide() {
    document.getElementById("maKV").value = "";
    document.getElementById("tenKV").value = "";
    document.getElementById("diaChi").value = "";
    document.getElementById("SDT").value = "";
    document.getElementById("female").checked = false;
    document.getElementById("male").checked = false;
  }
  edit() {
    // document.getElementById("btn-save").classList
    if ((document.getElementById("btn-save").style.display = "none")) {
      document.getElementById("btn-save").style.display = "inline-block";
      document.getElementById("btn-add").style.display = "none";
      document.getElementById("maKV").disabled = true;
    }
  }
  search() {
    let inf = localStorage.getItem("inf")
        ? JSON.parse(localStorage.getItem("inf"))
        : [];
    let search = document.getElementById("txtSearch").value.toLowerCase();
    let tableContent = `<tr>
        <th>#</th>
        <th>Mã khu vực</th>
        <th>Tên khu vực</th>
        <th>Địa chỉ</th>
        <th>Số điện thoại</th>
        <th>Trạng thái</th>
    </tr>`;
    let sl = 0;
    for (let index = 0; index < inf.length; index++) {
        const e = inf[index];
        let itemID = index; // Khai báo itemID bên ngoài vòng lặp
        if (e.tenKV.toLowerCase().includes(search)) {
            sl++;
            tableContent += `<tr id="r${sl}" class="tr" onclick="showinfo(${itemID})" onmousemove="hov(${itemID})" onmouseout="hideinf(${itemID})">
                <td>${index}</td>
                <td>${e.maKV}</td>
                <td>${e.tenKV}</td>
                <td>${e.diaChi}</td>
                <td>${e.SDT}</td>
                <td>${e.trangThai}</td>
                <td><a href="#" onclick='xoa(${itemID})'>Delete</a> || <a id="btn-edit" href="#" onclick='edit(${itemID})' >Edit</a></td>
            </tr>`;
        }
    }
    document.getElementById("table-KV").innerHTML = tableContent;
  }
}
function setnull() {
  let maKV = document.getElementById("maKV-error");
  maKV.innerHTML = "";
  let tenKV = document.getElementById("tenKV-error");
  tenKV.innerHTML = "";
  let diaChi = document.getElementById("diaChi-error");
  diaChi.innerHTML = "";
  let SDT = document.getElementById("SDT-error");
  SDT.innerHTML = "";
  // let gender = document.getElementById("gender-error");
  // gender.innerHTML = "";
  if ((document.getElementById("btn-add").style.display = "none")) {
    document.getElementById("btn-add").style.display = "inline-block";
    document.getElementById("btn-save").style.display = "none";
    document.getElementById("maKV").disabled = false;
  }
  document.getElementById("maKV").value = "";
  document.getElementById("tenKV").value = "";
  document.getElementById("diaChi").value = "";
  document.getElementById("SDT").value = "";
  document.getElementById("defaul").seleted = "true";
  // document.getElementById("gender-male").checked = true;
  // document.getElementById("gender-female").checked = false;
}
function hideinf() {
  kv.hide();
}
function hov(id) {
  kv.showinf(id);
}
function showinfo(id) {
  const tr = document.getElementsByTagName("tr");
  //   console.log(tr);

  for (let index = 0; index < tr.length; index++) {
    const element = tr[index];
    element.removeAttribute("onmousemove");
    element.removeAttribute("onmouseout");
    element.classList.remove("ative");
    element.classList.remove("tr");
  }
  tr[id + 1].classList.toggle("ative");
  kv.showinf(id);
}
function xoa(id) {
  kv.xoa(id);
  kv.hienthi();
}
function add() {
  let maKV = document.getElementById("maKV").value;
  let tenKV = document.getElementById("tenKV").value;
  let diaChi = document.getElementById("diaChi").value;
  let SDT = document.getElementById("SDT").value;
  let trangThai = document.getElementById("select").value;

  // let gender = "";
  // if (document.getElementById("gender-male").checked) {
  //   gender = document.getElementById("gender-male").value;
  // } else if (document.getElementById("gender-female").checked) {
  //   gender = document.getElementById("gender-female").value;
  // }
  const kv = new khuvuc(maKV, tenKV, diaChi, SDT, trangThai);
  console.log(kv.SDT);
  kv.check();
  kv.luu();
  // setnull();
}
function hienthi() {
  kv.hienthi();
}
function edit() {
  setnull();
  kv.edit();
  // kv.hienthi();
  console.log("edit");
}
function btnluu() {
  console.log("luu");
  let inf = localStorage.getItem("inf")
    ? JSON.parse(localStorage.getItem("inf"))
    : [];
  console.log(document.getElementById("maKV").value);
  // console.log(inf[1].maKV);
  // let index = "";
  let id = "";
  for (let index = 0; index < inf.length; index++) {
    const element = inf[index].maKV;
    console.log(element);
    if (element === document.getElementById("maKV").value) {
      id = index;
      console.log(id);
      break;
    }
  }
  // let index = inf.maKV.indexOf(document.getElementById("maKV").value);
  console.log(id);
  console.log(inf[id]);
  inf[id].maKV = document.getElementById("maKV").value;
  inf[id].tenKV = document.getElementById("tenKV").value;
  inf[id].diaChi = document.getElementById("diaChi").value;
  inf[id].SDT = document.getElementById("SDT").value;
  inf[id].trangThai = document.getElementById("select").value;

  // if (document.getElementById("gender-male").checked) {
  //   inf[id].gender = document.getElementById("gender-male").value;
  // } else if ((gender = document.getElementById("gender-female").checked)) {
  //   inf[id].gender = document.getElementById("gender-female").value;
  // }
  localStorage.setItem("inf", JSON.stringify(inf));
  hienthi();
  setnull();
  id.stopPropagation();
}
function search(){
  kv.search()
}
const kv = new khuvuc();
window.onload = kv.hienthi();

// function khuvuc(maKV, tenKV, diaChi, SDT, gender) {
//   this.maKV = maKV;
//   this.tenKV = tenKV;
//   this.diaChi = diaChi;
//   this.SDT = SDT;
//   this.gender = gender;
//   // phương thức=====

//   this.add = function () {
//     // console.log("ok");
//     const kv = new khuvuc();
//     kv.maKV = document.getElementById("maKV").value;
//     kv.tenKV = document.getElementById("tenKV").value;
//     kv.diaChi = document.getElementById("diaChi").value;
//     kv.SDT = document.getElementById("SDT").value;
//     if (document.getElementById("gender-male").checked) {
//       kv.gender = document.getElementById("gender-male").value;
//     } else if ((gender = document.getElementById("gender-female").checked)) {
//       kv.gender = document.getElementById("gender-female").value;
//     }
//     console.log(kv);
//     console.log(kv.maKV);
//     console.log("ok1");

//     if (_.isEmpty(kv.maKV)) {
//       let ok = document.getElementById("maKV-error");
//       ok.innerHTML = "Vui lòng nhập đầy đủ thông tin!";
//     } else {
//       let ok = document.getElementById("maKV-error");
//       ok.innerHTML = "";
//     }
//     if (_.isEmpty(kv.tenKV)) {
//       let ok = document.getElementById("tenKV-error");
//       ok.innerHTML = "Vui lòng nhập đầy đủ thông tin!";
//     } else {
//       let ok = document.getElementById("maKV-error");
//       ok.innerHTML = "";
//     }
//     if (_.isEmpty(kv.diaChi)) {
//       let ok = document.getElementById("diaChi-error");
//       ok.innerHTML = "Vui lòng nhập đầy đủ thông tin!";
//     } else {
//       let ok = document.getElementById("diaChi-error");
//       ok.innerHTML = "";
//     }
//     if (_.isEmpty(kv.SDT)) {
//       let ok = document.getElementById("SDT-error");
//       ok.innerHTML = "Vui lòng nhập đầy đủ thông tin!";
//     } else {
//       let ok = document.getElementById("SDT-error");
//       ok.innerHTML = "";
//     }
//     if (_.isEmpty(kv.gender)) {
//       let ok = document.getElementById("gender-error");
//       ok.innerHTML = "Vui lòng nhập đầy đủ thông tin!";
//     } else {
//       let ok = document.getElementById("gender-error");
//       ok.innerHTML = "";
//     }

//     if (kv.maKV && kv.tenKV && kv.diaChi && kv.SDT && kv.gender) {
//       console.log("ok2");
//       let inf = localStorage.getItem("inf")
//         ? JSON.parse(localStorage.getItem("inf"))
//         : [];
//       // lay thong tin tu localstorage ra trả về các mảng
//       // let students = [];
//       console.log(inf);
//       inf.push({
//         maKV: kv.maKV,
//         tenKV: kv.tenKV,
//         diaChi: kv.diaChi,
//         SDT: kv.SDT,
//         gender: kv.gender,
//       });
//       // add phàn tử mới vào mảng
//       console.log(inf);

//       localStorage.setItem("inf", JSON.stringify(inf));
//       // Chuyển về chuỗi và Truyền giá trị vào strorage
//       // LocalStorage chỉ lưu chuỗi văn bản không lưu object
//       this.render();
//     }
//   };

//   // Chức năng xoá
//   this.delete = function () {
//     let inf = localStorage.getItem("inf")
//       ? JSON.parse(localStorage.getItem("inf"))
//       : [];
//     inf.splice(id, 1);
//   };

//   this.render = function () {
//     let inf = localStorage.getItem("inf")
//       ? JSON.parse(localStorage.getItem("inf"))
//       : [];
//     // falsy
//     // lay thong tin tu localstorage ra trả về các mảng
//     // console.log(students.length);
//     if (inf.length === 0) {
//       document.getElementById("table-field").style.display = "none";
//       return false;
//     }
//     document.getElementById("table-field").style.display = "block";

//     let tableContent = `<tr>
//               <td>#</td>
//               <td>Mã khu vực</td>
//               <td>Tên khu vực</td>
//               <td>Địa chỉ</td>
//               <td>Số điện thoại</td>
//               <td>Giới tính</td>
//             </tr>`;
//     inf.forEach((kv, index) => {
//       let itemID = index;
//       index++;
//       tableContent += `<tr>
//                       <td>${index}</td>
//                       <td>${kv.maKV}</td>
//                       <td>${kv.tenKV}</td>
//                       <td>${kv.diaChi}</td>
//                       <td>${kv.SDT}</td>
//                       <td>${kv.gender}</td>
//                       <td><a href="#" onclick='deleteStudent(${itemID})'>Delete</a> || <a href="#" onclick='deleteStudent(${itemID})'>Edit</a></td>
//                     </tr>`;
//     });
//     document.getElementById("table-KV").innerHTML = tableContent;
//   };
// }

// function add() {
//   const kv = new khuvuc();
//   kv.add();
// }
// const kv = new khuvuc();
// window.onload = kv.hienthi();
