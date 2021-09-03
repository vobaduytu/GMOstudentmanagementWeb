package com.example.demo.controller;

import com.example.demo.model.Student;
import com.example.demo.service.StudentClassService;
import com.example.demo.service.StudentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;

import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;



@Controller
@RequestMapping("student")
public class StudentController {

    @GetMapping(value = "")
    public String todoList() {
        return "addStudent";
    }

}
