
package com.example.crud;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping("/api/users")
public class CallerController {
	
	@Autowired
	private UserRepository userRepository;
	
	@GetMapping
	public List<students> getAllUsers(){
		return userRepository.findAll();
	}
	
	@PostMapping
	public students createUser(@RequestBody students user) {
		return userRepository.save(user);

	}
	
}
