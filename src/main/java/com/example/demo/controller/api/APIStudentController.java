package com.example.demo.controller.api;

import com.example.demo.dto.StudentDTO;
import com.example.demo.model.Student;

import com.example.demo.service.StudentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;


import java.util.List;


@RestController
@RequestMapping(value = "/api/student")
public class APIStudentController {
    @Autowired
    private StudentService studentService;

    @GetMapping
    public ResponseEntity<?> findById(@RequestParam("class") long id) {
        List<Student> students = studentService.showAllStudent(id);
        if (!students.isEmpty()) {
            return new ResponseEntity<>(students, HttpStatus.OK);
        }
        return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }

    @PostMapping
    public ResponseEntity<?> create(@RequestBody List<StudentDTO> studentList) {
        try {
            for (StudentDTO studentDTO : studentList) {
                if (studentDTO.getChecked()) {
                    studentService.save(studentDTO.getStudent());
                }
            }
            return new ResponseEntity<>("OK", HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }

    }

    @PostMapping("/export")
    public ResponseEntity<?> exportStudent(@RequestBody List<Student> studentList) {
        try {
            studentService.exportToExcel(studentList);
            return new ResponseEntity<>("OK", HttpStatus.OK);

        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
    }


}
