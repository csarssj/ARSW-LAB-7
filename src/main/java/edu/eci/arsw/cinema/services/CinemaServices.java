/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package edu.eci.arsw.cinema.services;

import edu.eci.arsw.cinema.filter.CFilter;
import edu.eci.arsw.cinema.model.Cinema;
import edu.eci.arsw.cinema.model.CinemaFunction;
import edu.eci.arsw.cinema.persistence.CinemaException;
import edu.eci.arsw.cinema.persistence.CinemaPersistenceException;
import edu.eci.arsw.cinema.persistence.CinemaPersitence;
import java.util.List;
import java.util.Set;



import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Service;

/**
 *
 * @author ceseg
 */

@Service("CinemaServices")
public class CinemaServices {
	
	@Qualifier("InMemoryCinemaPersistence")
    @Autowired
    CinemaPersitence cps=null;
	
	@Qualifier("Availability")
    @Autowired
    CFilter fps=null;
    
    public void addNewCinema(Cinema c){
        try {
			cps.saveCinema(c);
		} catch (CinemaPersistenceException e) {
			throw new UnsupportedOperationException("Not supported yet."); 
		}
    }
    
    public Set<Cinema> getAllCinemas() throws CinemaPersistenceException{
        return cps.getCinemas();
    }
    
    /**
     * 
     * @param name cinema's name
     * @return the cinema of the given name created by the given author
     * @throws CinemaException
     */
    public Cinema getCinemaByName(String name) throws CinemaException{
    	try {
			return cps.getCinema(name);
		} catch (CinemaPersistenceException e) {
	        throw new UnsupportedOperationException("Not supported yet."); 
		}
    }
    
    
    public void buyTicket(int row, int col, String cinema, String date, String movieName){
    	try {
			cps.buyTicket(row, col, cinema, date, movieName);
		} catch (CinemaException e) {
			throw new UnsupportedOperationException("Not supported yet.");
		}
         
    }
    
    public List<CinemaFunction> getFunctionsbyCinemaAndDate(String cinema, String date) {
    	return cps.getFunctionsbyCinemaAndDate(cinema, date);
    }
	public CinemaFunction getFunctionsbyCinemaAndDateAndMovie(String cinema, String date,String movie) throws CinemaPersistenceException {
		return cps.getFunctionbyCinemaAndDateAndMovie(cinema, date,movie);
	}
    public List<CinemaFunction> Cfilter (String cinema,String date, String filtro){
    	List<CinemaFunction> functions = getFunctionsbyCinemaAndDate(cinema, date);
    	return fps.Cfilter(functions, filtro);
    };
    
    public void addNewFunction(String name, CinemaFunction function) {
    	try {
			cps.addNewFunction(name, function);
		} catch (CinemaPersistenceException e) {
			throw new UnsupportedOperationException("Not supported yet.");
		}
    }
    
    public void setFunction(String name, CinemaFunction function) {
    	try {
			cps.setFunction(name, function);
		} catch (CinemaPersistenceException e) {
			throw new UnsupportedOperationException("Not supported yet.");
		}
    }

	public void deleteFunction(String name,String date,String movie) {
		try {
			cps.deleteFunction(name, date,movie);
		} catch (CinemaPersistenceException e) {
			throw new UnsupportedOperationException("Not supported yet.");
		}
	}

}
