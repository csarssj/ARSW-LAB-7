/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package edu.eci.arsw.cinema.model;

import java.util.ArrayList;
import java.util.List;

/**
 *
 * @author cristian
 */
public class Cinema {
    private String name;
    private List<CinemaFunction> functions; 
    
    
    public Cinema(){}
    
    public Cinema(String name,List<CinemaFunction> functions){
        this.name=name;
        this.functions=functions;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }
    
    public List<CinemaFunction> getFunctionsByDate(String date) {
    	List<CinemaFunction> functionsR = new ArrayList<CinemaFunction>();
    	for (CinemaFunction f:functions) {
    		if(f.getDate().contains(date)) {
    			functionsR.add(f);
    		}
    	}
		return functionsR;
    }

    public List<CinemaFunction> getFunctions() {
        return this.functions;
    }

    public void setSchedule(List<CinemaFunction> functions) {
        this.functions = functions;
    }
    
    public void addNewFuction(CinemaFunction function) {
    	this.functions.add(function);
    }

    public void deleteFuction(String date,String movie) {
        for (CinemaFunction f:functions) {
            if(f.getDate().contains(date) && f.getMovie().getName().equalsIgnoreCase(movie)) {
                functions.remove(f);
            }
        }
    }
    
    public void setFuction(CinemaFunction function) {
    	for(CinemaFunction f : functions) {
    		if(function.getMovie().getName().equalsIgnoreCase(f.getMovie().getName())) {
    			functions.set(functions.indexOf(f), function);
    		}
    	}
    	//this.functions.add(function);
    }

	public CinemaFunction getFunctionsByDateAndMovie(String date, String movie) {
		CinemaFunction res = null;
		for (CinemaFunction f:functions) {
    		if(f.getDate().contains(date) && f.getMovie().getName().equalsIgnoreCase(movie)) {
    			return f;
    		}
    	}
		return res;
	}
}
