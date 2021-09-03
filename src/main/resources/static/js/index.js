let classList = []; // danh sach lop hoc

let classStudent = {
    init() {
        $.ajax({
            url: `http://localhost:8080/api/class`,
            async: false,
            method: "GET",
            dataType: "json",
            success: function (data) {
                for (let i = 0; i < data.length; i++) {
                    let newClass = data[i];
                    classList.push(newClass);
                }

            },
            error: function (err) {
                console.log(err.responseJSON);
            }
        });
    }
};

let display = {
    initPage() {
        $('#right-panel').empty();
        $('#right-panel').append(`
        <header id="header" class="header">
            <div>
                <h1 style="margin-left: 42%;">LIST STUDENT</h1>
                <div class="navbar-header">
                </div>
            </div>
        </header>
        <div class="col-lg-4 col-md-4 col-sm-4 col-xs-4" style="margin-left: 1.5%">
            <select class="form-control display mb-3" id="display" onchange="display.showListStudent(0)"
                    style="margin-left: -5%;     width: 45%;">
            </select>
        </div>
        <div class="wrap col-lg-12">
             <div>
             <table class="table">
                  <thead class="thead-dark">

                    <tr class="head">
                        <th scope="col" style="width: 60px">STT</th>
                        <th scope="col" style="width: 70px">ID</th>
                        <th scope="col" style="width: 290px">Name student</th>
                        <th scope="col" style="width: 160px">Date of Birth</th>
                        <th scope="col" style="width: 150px">Gender</th>
                        <th scope="col" style="width: 200px">Phone</th>
                        <th scope="col" >Note</th>
                    </tr>
                    </thead>
                   </table>
            </div>
            <div class="scroll-table">
                <table class="table">
                    <tbody id="showListStudent">
                    </tbody>
                </table>
            </div>
                <button type="button" class="btn btn-primary" onclick="display.exports()" style="margin-left: 90% ">Export</button>
        </div>
    `);
        display.displayClass();
        display.showListStudent(1);
    },

    displayClass() {
        $('.display').empty();
        for (let i = 0; i < classList.length; i++) {
            $('.display').append(`
                   <option value="${classList[i].id}">${classList[i].nameClass}</option>
        `);
        }
        $('#classList-0').click();
    },

    showListStudent(classID) {
        if (classID > 0) {
            $.ajax({
                url: `http://localhost:8080/api/student?class=${Number(classID)}`,
                async: false,
                method: "GET",
                dataType: "json",
                success: function (data) {
                    $('#showListStudent').empty();
                    $.each(data, function (i, v) {
                        $('#showListStudent').append(
                            "<tr>" +
                            "<td>" + i + "</td>" +
                            "<td>" + v.student_id + "</td>" +
                            "<td>" + v.name + "</td>" +
                            "<td>" + v.dob + "</td>" +
                            "<td>" + v.gender + "</td>" +
                            "<td>" + v.phoneNumber + "</td>" +
                            "<td>" + v.note + "</td>" +
                            "</tr>"
                        );
                    })
                }
            })
        } else {
            $.ajax({
                url: `http://localhost:8080/api/student?class=${Number($('#display').val())}`,
                async: false,
                method: "GET",
                dataType: "json",
                success: function (data) {
                    $('#showListStudent').empty();
                    $.each(data, function (i, v) {

                        $('#showListStudent').append(
                            "<tr>" +
                            "<td>" + i + "</td>" +
                            "<td>" + v.student_id + "</td>" +
                            "<td>" + v.name + "</td>" +
                            "<td>" + v.dob + "</td>" +
                            "<td>" + v.gender + "</td>" +
                            "<td>" + v.phoneNumber + "</td>" +
                            "<td>" + v.note + "</td>" +
                            "</tr>"
                        );

                    })

                }

            })
        }

    },

    exports() {
        let studentExport = [];
        $.ajax({
            url: `http://localhost:8080/api/student?class=${Number($('#display').val())}`,
            async: false,
            method: "GET",
            dataType: "json",
            success: function (data) {
                $('#showListStudent').empty();
                $.each(data, function (i, v) {
                    $('#showListStudent').append(
                        "<tr>" +
                        "<td>" + i + "</td>" +
                        "<td>" + v.student_id + "</td>" +
                        "<td>" + v.name + "</td>" +
                        "<td>" + v.dob + "</td>" +
                        "<td>" + v.gender + "</td>" +
                        "<td>" + v.phoneNumber + "</td>" +
                        "<td>" + v.note + "</td>" +
                        "</tr>"
                    );

                })
                studentExport.push(data)
            }

        })

        $.ajax({
            url: `http://localhost:8080/api/student/export`,
            async: false,
            method: "POST",
            dataType: "json",
            contentType: "application/json; charset=utf-8",
            data: JSON.stringify(studentExport[0]),
            success: function (data) {
                console.log("export done");
            },
            error: function (){
                console.log("export err");
            }
        })
    }
};

let student = {
    initPage() {
        $('#right-panel').empty();
        $('#right-panel').append(`
        <header id="header" class="header">
            <div>
                <h1 style="margin-left: 42%;">ADD Student</h1>
                <div class="navbar-header">
                </div>
            </div>
        </header>
        <div class="content">
            <div class="animated fadeIn">
                <div class="row">
                    <div class="col-lg-12">
                        <div class="table-stats order-table ov-h">
                            <table class="table ">
                                <thead>
                                <tr>
                                    <th class="serial" style="padding-left: 1.5%">
                                        <div class="form-check">
                                            <input class="form-check-input" type="checkbox" value="" id="flexCheckDefault">
                                            <label class="form-check-label" for="flexCheckDefault">
                                            </label>
                                        </div>
                                    </th>
                                    <th style="padding-left: 3%">class</th>
                                    <th style="padding-left: 5%">Name Student</th>
                                    <th style="padding-left: 8%">Dob</th>
                                    <th style="padding-left: 3%">gender</th>
                                    <th style="padding-left: 5%">Phone Number</th>
                                    <th style="padding-right: 8%">Note</th>
                                </tr>
                                </thead>
                                <tbody id="std-list">
    
                                </tbody>
                            </table>
                            <div class="modal-footer">
                                <button type="button" class="btn btn-primary" onclick="student.save()">Save</button>
                                <button type="button" class="btn btn-danger" onclick="student.clearForm()">Clear</button>
                            </div>
                        </div>
                    </div>
    
                </div>
            </div>
        </div>
        <div class="clearfix"></div>
    `);
        student.showAddListStudent();
    },

    showAddListStudent() {
        $('#std-list').empty();
        for (let i = 0; i < 10; i++) {
            $('#std-list').append(`
        <tr>
            <td class="serial">
                <div class="form-check">
                    <input class="form-check-input student-rows" id="student-checker-${i}" type="checkbox" value="">
                    <label class="form-check-label" for="flexCheckDefault">
                    </label>
                </div>
            </td>
            <td>
                <select class="form-control class-list" id="class-list-${i}" style="background-color: white; width: 88px;height: 35px;">
               
                </select>
            </td>
            <td >
                <input type="hidden" id="id">
                <input type="text" class="form-control" id="name-${i}" required style="height: 35px;">
            </td>
            <td >
                <input type="date" class="form-control" id="dob-${i}" required style="height: 35px;">
            </td>
            <td >
                <select class="form-control" id="gender-${i}" style="background-color: white" style="height: 35px;">
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                </select>
            </td>
            <td >
                <input type="text" class="form-control" id="phone-${i}" required style="height: 35px;">
            </td>
            <td >
                <input type="text" class="form-control" id="note-${i}" required style="height: 35px;">
            </td>
        </tr>
        `);
        }

        $('.class-list').empty();
        for (let i = 0; i < classList.length; i++) {
            $('.class-list').append(`
               <option value="${classList[i].id}">${classList[i].nameClass}</option>
        `);
        }

        $("#flexCheckDefault").click(function () {
            $(".student-rows").prop('checked', $(this).prop('checked'));
        });

        $(".student-rows").change(function () {
            if (!$(this).prop("checked")) {
                $("#flexCheckDefault").prop("checked", false);
            }
        });
    },

    save() {
        let students = [];
        for (let i = 0; i < 10; i++) {
            let studentDTO = {};
            let student = {
                name: $(`#name-${i}`).val(),
                gender: $(`#gender-${i}`).val(),
                phoneNumber: $(`#phone-${i}`).val(),
                dob: $(`#dob-${i}`).val(),
                note: $(`#note-${i}`).val()
            }
            student.studentClass = {id: Number($(`#class-list-${i}`).val())};
            studentDTO.student = student;
            studentDTO.checked = document.querySelector(`#student-checker-${i}`).checked;
            students.push(studentDTO);
        }
        $.ajax({
            url: `http://localhost:8080/api/student`,
            async: false,
            method: "POST",
            dataType: "json",
            contentType: "application/json; charset=utf-8",
            data: JSON.stringify(students),
            success: function () {
            },
            error: function () {
                for (let i = 0; i < 10; i++) {
                    $(`#name-${i}`).val("");
                    $(`#gender-${i}`).val("male");
                    $(`#phone-${i}`).val("");
                    $(`#dob-${i}`).val("");
                    $(`#note-${i}`).val("");
                    $(`#class-list-${i}`).val(1);
                    document.querySelector(`#student-checker-${i}`).checked = false;
                }
            }


        });
        console.log(students)

    },
    clearForm() {
        for (let i = 0; i < 10; i++) {
            if (document.querySelector(`#student-checker-${i}`).checked) {
                $(`#name-${i}`).val("");
                $(`#gender-${i}`).val("male");
                $(`#phone-${i}`).val("");
                $(`#dob-${i}`).val("");
                $(`#note-${i}`).val("");
                $(`#class-list-${i}`).val(1);
                document.querySelector(`#student-checker-${i}`).checked = false;
            }
        }
    }
};
let exit = {
    initPage() {
        $('#index-exit').empty();
        $('#index-exit').append(`
       <div>
       <h1 style="margin-left: 40%; margin-top: 20%">Goodbye....!</h1>
</div>
    `)

    }
}

$('#flexCheckDefault').change(function () {
    $('.student-rows').prop('checked', this.checked);
});

$('.student-rows').change(function () {
    if ($('.student-rows:checked').length === $('.student-rows').length) {
        $('#flexCheckDefault').prop('checked', true);
    } else {
        $('#flexCheckDefault').prop('checked', false);
    }
});

$(document).ready(function () {
    classStudent.init();
    display.initPage();
    display.displayClass();
});