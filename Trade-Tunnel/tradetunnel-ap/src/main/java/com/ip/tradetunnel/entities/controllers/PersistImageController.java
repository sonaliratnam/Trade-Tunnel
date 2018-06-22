package com.ip.tradetunnel.entities.controllers;
/**
 * Persist Image controller 
 * 1. Persists the image in the file system (Backup)
 * 2. Persist the image as a Blob in the relational Database
 */
import java.io.IOException;
import java.util.Arrays;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.rest.webmvc.PersistentEntityResource;
import org.springframework.data.rest.webmvc.PersistentEntityResourceAssembler;
import org.springframework.data.rest.webmvc.RepositoryRestController;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.multipart.MultipartFile;

import com.ip.tradetunnel.entities.Image;
import com.ip.tradetunnel.entities.Product;
import com.ip.tradetunnel.entities.repos.ImageRepository;
import com.ip.tradetunnel.entities.repos.ProductRepository;


/*
 * Perists the given media multipart file into the databsae as a blob/
 * @arg id is the product id to which the Image belongs.
 */

@RepositoryRestController
@RequestMapping("/persistImage")
public class PersistImageController {

	@Autowired
	ProductRepository prodRepo;  

	@Autowired
	ImageRepository imageRepo;

	@PostMapping("/single")
	private ResponseEntity<PersistentEntityResource> updateProductStatus(@RequestParam("file") MultipartFile[] uploadfile,
			@RequestParam("prodId") Long id, PersistentEntityResourceAssembler assembler) {
		Product product = prodRepo.findOne(id);

		try {
			saveUploadedFiles(Arrays.asList(uploadfile), product);
		} catch (Exception e) {
			return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
		}

		return ResponseEntity.ok(assembler.toResource(product));

	}

	private void saveUploadedFiles(List<MultipartFile> files, Product prod) throws IOException {

		for (MultipartFile file : files) {

			if (file.isEmpty()) {
				continue; 
			}

			byte[] bytes = file.getBytes();

			Image image = new Image();
			image.setData(bytes);
			image.setImageName(file.getOriginalFilename());
			image.setProduct(prod);
			imageRepo.save(image);
			
			prod.getImage().add(image);
			prodRepo.save(prod);

		}
	}
}
