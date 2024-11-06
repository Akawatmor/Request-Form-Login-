package com.example.crud;

import jakarta.persistence.*;

import lombok.Data;


@Data
@Entity
@Table(name="students")
public class students {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id ; 
	
	@Column(name = "eng_name", nullable = false)
	private String displayname_en ; 
	
	@Column(name = "email", nullable = false)
	private String email ;
	
	@Column(name = "faculty", nullable = false)
	private String faculty ;
	
	@Column(name = "type", nullable = false)
	private String type ;
	
	@Column(name = "user_name", nullable = false)
	private String username ;


	
}
