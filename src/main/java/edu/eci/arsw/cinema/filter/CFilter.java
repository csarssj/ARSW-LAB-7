package edu.eci.arsw.cinema.filter;

import java.util.List;

import org.springframework.stereotype.Service;

import edu.eci.arsw.cinema.model.CinemaFunction;

@Service
public interface CFilter {
	
	public List<CinemaFunction> Cfilter (List<CinemaFunction> functions, String filtro);
}