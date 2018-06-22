package com.ip.tradetunnel.entities.controllers;

/**
 * Average price controller for Specific Sub Category of products
 */
import java.util.Arrays;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.rest.webmvc.RepositoryRestController;
import org.springframework.hateoas.Resources;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.ip.tradetunnel.entities.Product;
import com.ip.tradetunnel.entities.SubCategories;
import com.ip.tradetunnel.entities.repos.ProductRepository;
import com.ip.tradetunnel.entities.repos.SubCategoriesRepository;

/*
 * Average price of all the products that belong to a subcategory is calculated and returned as floating point
 */
@RepositoryRestController
@RequestMapping("/average")
public class AvgPriceRangeContoller {

	@Autowired
	ProductRepository productRepo;
	@Autowired
	SubCategoriesRepository subcatrepo;

	@GetMapping("/{subcategoryID}")
	public @ResponseBody ResponseEntity<?> getAveragePrice(@PathVariable Long subcategoryID) {
		float totalCost = 0.00f;
		Float averageCost = 0.00f;
		SubCategories subcat = subcatrepo.findOne(subcategoryID);
		if (subcat != null) {
			List<Product> product = productRepo.findBySubcategory(subcat);
			if (!product.isEmpty()) {
				for (Product prod : product) {
					totalCost += prod.getPrice();
				}

				averageCost = totalCost / product.size();
			}
		}

		List<Float> list = Arrays.asList(averageCost);
		Resources<Float> resources = new Resources<Float>(list);

		return ResponseEntity.ok(resources);
	}

}
