/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package edu.eci.arsw.cinema.controllers;

import java.util.List;
import java.util.Set;
import java.util.logging.Level;
import java.util.logging.Logger;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.google.gson.Gson;
import edu.eci.arsw.cinema.model.Cinema;
import edu.eci.arsw.cinema.model.CinemaFunction;
import edu.eci.arsw.cinema.services.CinemaServices;
/**
 *
 * @author ceseg
 */
@RestController
@RequestMapping(value = "/cinemas")
public class CinemaAPIController {
	
	@Autowired
    CinemaServices service = null;
	
	@RequestMapping(method = RequestMethod.GET)
	public ResponseEntity<?> manejadorGetCinemas(){
		Set<Cinema> cinemas = null;
	    try {
	        //obtener datos que se enviarán a través del API
	    	cinemas = service.getAllCinemas();
	    } catch (Exception ex) {
	        Logger.getLogger(CinemaAPIController.class.getName()).log(Level.SEVERE, null, ex);
	        return new ResponseEntity<>("Error 404",HttpStatus.NOT_FOUND);
	    } 
        return new ResponseEntity<>(cinemas,HttpStatus.ACCEPTED);
	}
    
	@RequestMapping(method = RequestMethod.GET,path = "{name}")
	public ResponseEntity<?> manejadorGetCinemasByName(@PathVariable String name ){
		Cinema cinema = null;
	    try {
	    	cinema= service.getCinemaByName(name);
	    } catch (Exception ex) {
	        Logger.getLogger(CinemaAPIController.class.getName()).log(Level.SEVERE, null, ex);
	        return new ResponseEntity<>("Error 404",HttpStatus.NOT_FOUND);
	    } 
        return new ResponseEntity<>(cinema,HttpStatus.ACCEPTED);
	}
	
	@RequestMapping(method = RequestMethod.GET,path = "{name}/{date}")
	public ResponseEntity<?> manejadorGetCinemasByNameAndDate(@PathVariable String name,@PathVariable String date){
		List<CinemaFunction> cinema = null;
	    try {
	    	cinema= service.getFunctionsbyCinemaAndDate(name, date);
	    } catch (Exception ex) {
	        Logger.getLogger(CinemaAPIController.class.getName()).log(Level.SEVERE, null, ex);
	        return new ResponseEntity<>("Error 404",HttpStatus.NOT_FOUND);
	    } 
        return new ResponseEntity<>(cinema,HttpStatus.ACCEPTED);
	}
	
	@RequestMapping(method = RequestMethod.GET,path = "{name}/{date}/{movie}")
	public ResponseEntity<?> manejadorGetCinemasByNameAndDateAndMovie(@PathVariable String name,
			@PathVariable String date,@PathVariable String movie){
		CinemaFunction cinema = null;
	    try {
	    	cinema= service.getFunctionsbyCinemaAndDateAndMovie(name, date,movie);
	    	
	    } catch (Exception ex) {
	        Logger.getLogger(CinemaAPIController.class.getName()).log(Level.SEVERE, null, ex);
	        return new ResponseEntity<>("Error 404",HttpStatus.NOT_FOUND);
	    } 
        return new ResponseEntity<>(cinema,HttpStatus.ACCEPTED);
	}
	@RequestMapping(method = RequestMethod.POST,path = "{name}")	
	public ResponseEntity<?> manejadorPostAddNewFunction(@PathVariable String name, @RequestBody CinemaFunction function){
	    try {
	        service.addNewFunction(name, function);
	        return new ResponseEntity<>(HttpStatus.CREATED);
	    } catch (Exception ex) {
	        Logger.getLogger(CinemaAPIController.class.getName()).log(Level.SEVERE, null, ex);
	        return new ResponseEntity<>("Error 400",HttpStatus.NOT_FOUND);        
	    }        

	}
	@RequestMapping(method = RequestMethod.PUT,path = "{name}")	
	public ResponseEntity<?> updateFunction(@PathVariable String name, @RequestBody CinemaFunction function){
	    try {
	        service.setFunction(name, function);
	        return new ResponseEntity<>(HttpStatus.CREATED);
	    } catch (Exception ex) {
	        Logger.getLogger(CinemaAPIController.class.getName()).log(Level.SEVERE, null, ex);
	        return new ResponseEntity<>("Error 400",HttpStatus.NOT_FOUND);        
	    }        

	}
	@RequestMapping(method = RequestMethod.DELETE,path = "{name}/{date}/{movie}")
	public ResponseEntity<?> deleteFunction(@PathVariable String name,@PathVariable String date,@PathVariable String movie){
		try {
			service.deleteFunction(name,date,movie);
			return new ResponseEntity<>(HttpStatus.OK);
		} catch (Exception ex) {
			Logger.getLogger(CinemaAPIController.class.getName()).log(Level.SEVERE, null, ex);
			return new ResponseEntity<>("Error 400",HttpStatus.NOT_FOUND);
		}

	}
}
