package com.ip.tradetunnel.entities.controllers;
/**
 * Custom Filter Controller 
 * @author himanshu chhabra
 */
import java.util.ArrayList;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.rest.webmvc.PersistentEntityResource;
import org.springframework.data.rest.webmvc.PersistentEntityResourceAssembler;
import org.springframework.data.rest.webmvc.RepositoryRestController;
import org.springframework.hateoas.Resources;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.ip.tradetunnel.entities.Address;
import com.ip.tradetunnel.entities.Categories;
import com.ip.tradetunnel.entities.Product;
import com.ip.tradetunnel.entities.SubCategories;
import com.ip.tradetunnel.entities.UserProfile;
import com.ip.tradetunnel.entities.repos.AddressRepository;
import com.ip.tradetunnel.entities.repos.CategoriesRepository;
import com.ip.tradetunnel.entities.repos.ProductRepository;
import com.ip.tradetunnel.entities.repos.SubCategoriesRepository;
import com.ip.tradetunnel.entities.repos.UserProfileRepository;
import com.ip.tradetunnel.filters.FilterCriteria;
import com.ip.tradetunnel.filters.Price;

@RepositoryRestController
@RequestMapping("/products/filter")

public class FilterController {

	@Autowired
	ProductRepository prodRepo;
	@Autowired
	CategoriesRepository catRepo;
	@Autowired
	SubCategoriesRepository subcatRepo;
	@Autowired
	AddressRepository addressRepo;
	@Autowired
	UserProfileRepository userRepo;

	/*
	 * Filters the products from the database based on @args FilterCriteria. 
	 * @id is the user Id, to identify the user making the request as it is stateless. This is to avoid returning users own products to itself
	 * Sample Filter Criteria Received as a HTTP request:
	 * 		{
			"categories": [
        		"Electronics",
        		"Furniture"
        		],
        	"subcategories" :[
        		"Laptop"
        		],
    		"range" : {
				"from"  : 5.12,
				"to"    : 15.2
			},
    		"city" : "Syracuse"
			} 
	 */
	
	@PostMapping("/{id}")
	private @ResponseBody ResponseEntity<?> filterProducts(@RequestBody FilterCriteria criteria,@PathVariable Long id,
			PersistentEntityResourceAssembler assembler) {
		List<Product> productList = new ArrayList<Product>();

		if (criteria != null) {
			if (criteria.getCategories() != null) {
				Set<String> categories = criteria.getCategories();
				for (String category : categories) {
					List<Categories> categoryNameList = catRepo.findByCategoryName(category);
					if (!categoryNameList.isEmpty()) {
						for (Categories cat : categoryNameList)
							productList.addAll(prodRepo.findByCategory(cat));
					}
				}
			}

			if (criteria.getSubcategories() != null) {
				Set<String> subcategories = criteria.getSubcategories();
				List<Product> subList = new ArrayList<Product>();
				for (String subCategory : subcategories) {
					List<SubCategories> subcategoryNameList = subcatRepo.findBySubcategoryName(subCategory);
					if (!subcategoryNameList.isEmpty()) {
						for (SubCategories subcat : subcategoryNameList) {
							 subList.addAll(prodRepo.findBySubcategory(subcat));
						}
					}
				}
				productList = merge(productList, subList);
			}

			if (criteria.getRange() != null) {
				Price price = criteria.getRange();
				if (price != null) {
					List<Product> between = prodRepo.findByPriceBetween(price.getFrom(), price.getTo());
					productList = merge(productList, between);
				}
			}

			if (criteria.getCity() != null) {
				String city = criteria.getCity();
				Set<Address> addList = addressRepo.findByCity(city);
				List<UserProfile> userList = new ArrayList<UserProfile>();
				for (Address add : addList) {
					userList.addAll(userRepo.findByAddress(add));
				}

				List<List<Product>> prods = userList.stream().map(user -> prodRepo.findByUserProfile(user)).distinct()
						.collect(Collectors.toList());
				List<Product> products = new ArrayList<Product>();
				prods.stream().forEach(prod -> products.addAll(prod));
				productList = merge(productList, products);
			}
		}
		productList = productList.stream().filter(product -> product.getUserProfile().getId() != id).collect(Collectors.toList());
		
		List<PersistentEntityResource> halProds = new ArrayList<PersistentEntityResource>();
		for (Product prod : productList) {
			halProds.add(assembler.toResource(prod));
		}
		Resources<PersistentEntityResource> resources = new Resources<PersistentEntityResource>(halProds);
		return ResponseEntity.ok(resources);
	}

	private List<Product> merge(List<Product> productList, List<Product> subList) {
		if(productList.isEmpty())
			return subList;
		
		List<Product> resultSet = new ArrayList<Product>();
		for (Product prod : subList) {
			if (productList.contains(prod)) {
				resultSet.add(prod);
			}
		}
		return resultSet;
	}

}
