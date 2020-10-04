/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package edu.eci.arsw.cinema.persistence;

import edu.eci.arsw.cinema.model.Cinema;
import edu.eci.arsw.cinema.model.CinemaFunction;
import java.util.List;
import java.util.Map;
import java.util.Set;

/**
 *
 * @author cristian
 */
public interface CinemaPersitence {
    
    /**
     * 
     * @param row the row of the seat
     * @param col the column of the seat
     * @param cinema the cinema's name
     * @param date the date of the function
     * @param movieName the name of the movie
     * 
     * @throws CinemaException if the seat is occupied,
     *    or any other low-level persistence error occurs.
     */
    public void buyTicket(int row, int col, String cinema, String date, String movieName) throws CinemaException;
    
    /**
     * 
     * @param cinema cinema's name
     * @param date date
     * @return the list of the functions of the cinema in the given date
     */
    public List<CinemaFunction> getFunctionsbyCinemaAndDate(String cinema, String date);
    
    /**
     * 
     * @param cinema new cinema
     * @throws  CinemaPersistenceException n if a cinema with the same name already exists
     */
    public void saveCinema(Cinema cinema) throws CinemaPersistenceException;
    
    /**
     * 
     * @param name name of the cinema
     * @return Cinema of the given name
     * @throws  CinemaPersistenceException if there is no such cinema
     */
    public Cinema getCinema(String name) throws CinemaPersistenceException;

    /**
     * 
     * 
     * @return Cinemas list
     * @throws  CinemaPersistenceException if there is no such cinema
     */
	public Set<Cinema> getCinemas() throws CinemaPersistenceException;
	
	 /**
     * 
     * 
     * @return CinemaFunction 
     * @throws  CinemaPersistenceException if there is no such cinema
     */
	public CinemaFunction getFunctionbyCinemaAndDateAndMovie(String cinema, String date, String movie) throws CinemaPersistenceException;

	/**
     * 
     * @throws  CinemaPersistenceException if there is no such cinema
     */
	public void addNewFunction(String name, CinemaFunction function) throws CinemaPersistenceException;

	/**
     * 
     * @throws  CinemaPersistenceException if there is no such cinema
     */
	public void setFunction(String name, CinemaFunction function) throws CinemaPersistenceException;

    /**
     *
     * @throws  CinemaPersistenceException if there is no such cinema
     */
    public void deleteFunction(String name, String date,String movie) throws CinemaPersistenceException;



}
