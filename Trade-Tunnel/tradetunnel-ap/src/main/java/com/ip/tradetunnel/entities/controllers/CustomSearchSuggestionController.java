
package com.ip.tradetunnel.entities.controllers;

/**
 * Custom Search Contoller.
 * 
 * @author himanshu chhabra
 */
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.rest.webmvc.PersistentEntityResource;
import org.springframework.data.rest.webmvc.PersistentEntityResourceAssembler;
import org.springframework.data.rest.webmvc.RepositoryRestController;
import org.springframework.hateoas.Resources;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.ip.tradetunnel.entities.Product;
import com.ip.tradetunnel.entities.repos.ProductRepository;

@RepositoryRestController
@RequestMapping("/search")
public class CustomSearchSuggestionController {

	@Autowired
	ProductRepository productRepo;

	/*
	 * Custom Search is enabled on product name OR product description
	 * 
	 * @arg word is searched in the Database,
	 * 
	 * @arg userId is used to identify the user initiating the search. This avoids
	 * displaying the users products to itself
	 */
	@GetMapping("/{word}/{userid}")
	public @ResponseBody ResponseEntity<?> getProductListByName(@PathVariable String word, @PathVariable String userid,
			PersistentEntityResourceAssembler assembler) {
		
		List<Product> productList = productRepo.findByProductNameLikeOrProductDescriptionLike("%" + word + "%",
				"%" + word + "%");
		productList = productList.stream()
				.filter(product -> product.getUserProfile().getId() != Integer.parseInt(userid))
				.collect(Collectors.toList());

		List<PersistentEntityResource> halProds = new ArrayList<PersistentEntityResource>();
		for (Product prod : productList) {
			halProds.add(assembler.toResource(prod));
		}
		Resources<PersistentEntityResource> resources = new Resources<PersistentEntityResource>(halProds);

		return ResponseEntity.ok(resources);
	}
}