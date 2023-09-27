package com.op2.op2.web;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

import com.op2.op2.domain.Category;
import com.op2.op2.domain.CategoryRepository;
// import org.springframework.web.bind.annotation.RequestParam;


@Controller
public class CategoryController {
    
    @Autowired
    private CategoryRepository categoryRepository;

    // List all Categories
    @RequestMapping(path = "/categorylist", method = RequestMethod.GET)
    public String categoryList(Model model) {
        List<Category> categories = (List<Category>) categoryRepository.findAll();
        model.addAttribute("categories", categories);
        return "categorylist";
    }

    //Add category
    @GetMapping("/addCategory")
    public String addCategory(Model model) {
        model.addAttribute("newcategory", new Category());
        return "addcategory";
    }

    //Edit category
    @GetMapping("/editCategory/{categoryName}")
    public String editCategory(@PathVariable("categoryName") String categoryName, Model model) {
        model.addAttribute("editCategory", categoryRepository.findById(categoryName));
        return "editcategory";
    }
    
    //Save category
    @PostMapping("/saveCategory")
    public String saveCategory(Category category) {
        categoryRepository.save(category);
        return "redirect:categorylist";
    }

    @RequestMapping(value="/delete/{categoryName}", method=RequestMethod.GET)
    public String deleteCategory(@PathVariable("categoryName") String categoryName)  {
        categoryRepository.deleteById(categoryName);
        return "redirect:/categorylist";
    }
    
}
