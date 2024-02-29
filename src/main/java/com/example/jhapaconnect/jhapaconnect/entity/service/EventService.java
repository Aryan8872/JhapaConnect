package com.example.jhapaconnect.jhapaconnect.entity.service;

import com.example.jhapaconnect.jhapaconnect.entity.dto.EventsDTO;
import com.example.jhapaconnect.jhapaconnect.entity.dto.ItemsDTO;

import java.util.List;

public interface EventService {
    EventsDTO createEvent(EventsDTO eventdto, Integer userId, Integer catId );
    List<EventsDTO> getAllEvents(String sortBy , String sortDirect);
    EventsDTO getEventbyId(Integer eventid);

    List<EventsDTO> getEventbyCategory(String title);
    List <EventsDTO> getEventbyUser(Integer userId);

    List <EventsDTO> searchEvent(String keyword);

    EventsDTO updateEvent(EventsDTO Eventdto , Integer EventId, Integer catId);
    void deleteEvent(Integer Eventid);

    void interested(Integer eventId);
    void going(Integer eventId);

    void notGoing(Integer eventId);

    void notInterested(Integer eventId);


}
