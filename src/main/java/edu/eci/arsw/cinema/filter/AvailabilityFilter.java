package edu.eci.arsw.cinema.filter;

import java.util.ArrayList;
import java.util.List;

import org.springframework.stereotype.Component;
import org.springframework.stereotype.Service;

import edu.eci.arsw.cinema.model.CinemaFunction;

@Service("Availability")
public class AvailabilityFilter implements CFilter{

	@Override
	public List<CinemaFunction> Cfilter(List<CinemaFunction> functions, String seats) {
		int disponible = 0;
		int esperado =Integer.parseInt(seats);
		List<CinemaFunction> functionsN = new ArrayList<CinemaFunction>();
		List<List<Boolean>> change = null;
		for(CinemaFunction f :functions) {
			change = f.getSeats();
			for(List<Boolean> b : change) {
				for(Boolean bool : b) {
					if(bool) {
						disponible++;
					}
				}
			}
			if(disponible < esperado) {
				functionsN.add(f);
			}
		}
		
		return functionsN;
		
	}

}
