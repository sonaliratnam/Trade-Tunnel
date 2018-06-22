package com.ip.tradetunnel.entities.controllers;

/**
 * Update Product status controller
 */
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.rest.webmvc.PersistentEntityResource;
import org.springframework.data.rest.webmvc.PersistentEntityResourceAssembler;
import org.springframework.data.rest.webmvc.RepositoryRestController;
import org.springframework.data.rest.webmvc.ResourceNotFoundException;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;

import com.ip.tradetunnel.entities.Product;
import com.ip.tradetunnel.entities.enumerations.Status;
import com.ip.tradetunnel.entities.repos.ProductRepository;

/*
 * following function works as a toggle to change the status of the product.
 * @id is the product whose status will be updated
 */
@RepositoryRestController
@RequestMapping("/product")
public class UpdateProductController {

	@Autowired
	ProductRepository prodRepo;

	@PatchMapping("/{id}")	
	private ResponseEntity<PersistentEntityResource> updateProductStatus(@PathVariable Long id,
			PersistentEntityResourceAssembler assembler) {

		Product product = prodRepo.findOne(id);

		if (product != null) {
			if (product.getStat() == Status.unsold) {
				product.setStat(Status.sold);
			} else {
				product.setStat(Status.unsold);
			}

			prodRepo.save(product);

			return ResponseEntity.ok(assembler.toResource(product));
		}

		throw new ResourceNotFoundException("No Product with id " + id + " Found");
	}

}
