/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package edu.eci.arsw.cinema.persistence.impl;

import edu.eci.arsw.cinema.model.Cinema;
import edu.eci.arsw.cinema.model.CinemaFunction;
import edu.eci.arsw.cinema.model.Movie;
import edu.eci.arsw.cinema.persistence.CinemaException;
import edu.eci.arsw.cinema.persistence.CinemaPersistenceException;
import edu.eci.arsw.cinema.persistence.CinemaPersitence;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.HashSet;
import java.util.List;
import java.util.Map;
import java.util.Set;
import java.util.concurrent.ConcurrentHashMap;
import java.util.concurrent.ConcurrentMap;

import org.springframework.stereotype.Component;

/**
 *
 * @author ceseg
 */
@Component("InMemoryCinemaPersistence")
public class InMemoryCinemaPersistence implements CinemaPersitence{
    
    private final ConcurrentMap<String,Cinema> cinemas=new ConcurrentHashMap<>();

    public InMemoryCinemaPersistence() {
        //funcion 1
        String functionDate = "2018-12-18 15:30";
        List<CinemaFunction> functions= new ArrayList<>();
        CinemaFunction funct1 = new CinemaFunction(new Movie("SuperHeroes Movie","Action"),functionDate);
        CinemaFunction funct2 = new CinemaFunction(new Movie("The Night","Horror"),functionDate);
        funct2.setSeats();
        functions.add(funct1);
        functions.add(funct2);
        Cinema c=new Cinema("cinemaX",functions);
        cinemas.put("cinemaX", c);
        //funcion 2
        String functionDate2 = "2020-12-18 16:30";
        List<CinemaFunction> functions2= new ArrayList<>();
        CinemaFunction funct21 = new CinemaFunction(new Movie("SuperHeroes Movie","Action"),functionDate2);
        CinemaFunction funct22 = new CinemaFunction(new Movie("The Night","Horror"),functionDate2);
        functions2.add(funct21);
        functions2.add(funct22);
        Cinema c2=new Cinema("cineco",functions2);
        cinemas.put("cineco", c2);
        //funcion 3
        String functionDate3 = "2020-11-07 20:30";
        List<CinemaFunction> functions3= new ArrayList<>();
        CinemaFunction funct31 = new CinemaFunction(new Movie("SuperHeroes Movie","Action"),functionDate3);
        CinemaFunction funct32 = new CinemaFunction(new Movie("The Night","Horror"),functionDate3);
        functions3.add(funct31);
        functions3.add(funct32);
        Cinema c3=new Cinema("cinepolis",functions3);
        cinemas.put("cinepolis", c3);
    }    

    @Override
    public void buyTicket(int row, int col, String cinema, String date, String movieName) throws CinemaException {
    	try {
    		Cinema c = getCinema(cinema);
    		List<CinemaFunction> f = getFunctionsbyCinemaAndDate(cinema,date);
    		for (CinemaFunction function : f) {
    			if(function.getMovie().getName() == movieName) {
    				function.buyTicket(row, col);
    			}
    		}
		} catch (CinemaPersistenceException e) {
	    	throw new UnsupportedOperationException("Not supported yet."); 
		}
    }

    @Override
    public List<CinemaFunction> getFunctionsbyCinemaAndDate(String cinema, String date) {
    	try {
			Cinema c = getCinema(cinema);
			return c.getFunctionsByDate(date);
		} catch (CinemaPersistenceException e) {
	        throw new UnsupportedOperationException("Not supported yet."); 
		}
    }
    @Override
    public CinemaFunction getFunctionbyCinemaAndDateAndMovie(String cinema, String date, String movie) {
    	try {
			Cinema c = getCinema(cinema);
			return c.getFunctionsByDateAndMovie(date,movie);
		} catch (CinemaPersistenceException e) {
	        throw new UnsupportedOperationException("Not supported yet."); 
		}
    }

    @Override
    public void saveCinema(Cinema c) throws CinemaPersistenceException {
        if (cinemas.containsKey(c.getName())){
            throw new CinemaPersistenceException("The given cinema already exists: "+c.getName());
        }
        else{
            cinemas.put(c.getName(),c);
        }   
    }

    @Override
    public Cinema getCinema(String name) throws CinemaPersistenceException {
        return cinemas.get(name);
    }
    
    @Override
    public Set<Cinema> getCinemas() throws CinemaPersistenceException {
    	Set<Cinema> cinemax = new HashSet<>(cinemas.values());
        return cinemax;
    }
    
    @Override
    public void addNewFunction(String name, CinemaFunction function) throws CinemaPersistenceException {
    	Cinema cine = getCinema(name);  
    	cine.addNewFuction(function);
    }
    @Override
    public void setFunction(String name, CinemaFunction function) throws CinemaPersistenceException {
    	Cinema cine = getCinema(name);
    	cine.setFuction(function);
    }
    @Override
    public void deleteFunction(String name, String date,String movie) throws CinemaPersistenceException {
        Cinema cine = getCinema(name);
        cine.deleteFuction(date,movie);
    }

}
