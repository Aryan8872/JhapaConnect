package com.example.jhapaconnect.jhapaconnect.entity.service.impl;

import com.example.jhapaconnect.jhapaconnect.entity.dto.EventsDTO;
import com.example.jhapaconnect.jhapaconnect.entity.dto.ItemsDTO;
import com.example.jhapaconnect.jhapaconnect.entity.entity.*;
import com.example.jhapaconnect.jhapaconnect.entity.repository.CategoryRepository;
import com.example.jhapaconnect.jhapaconnect.entity.repository.EventRepository;
import com.example.jhapaconnect.jhapaconnect.entity.repository.EventcatRepository;
import com.example.jhapaconnect.jhapaconnect.entity.repository.UserRepository;
import com.example.jhapaconnect.jhapaconnect.entity.service.EventService;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class EventServiceimpl implements EventService {
    private final ModelMapper mapper;
    private final UserRepository userrepo;
    private final EventcatRepository catrepo;
    private final EventRepository eventrepo;
    @Override
    public EventsDTO createEvent(EventsDTO eventdto, Integer userId, Integer catId) {
        UserEntity user = userrepo.findById(userId).orElseThrow(()-> new NullPointerException("user notfound" + userId));
        EventCategory category = catrepo.findById(catId).orElseThrow(()->new NullPointerException("category not found" + catId));
        EventEntity event = mapper.map(eventdto,EventEntity.class);
        event.setAddedDate(new Date());
        event.setUser(user);
        event.setCategory(category);
        event.setInterested(0);
        event.setGoing(0);

        EventEntity newEvent = eventrepo.save(event);
        return mapper.map(newEvent,EventsDTO.class );
    }

    @Override
    public List<EventsDTO> getAllEvents(String sortBy, String sortDirect) {

        List<EventEntity> allEvents;

        Sort sort = null;
        if(sortDirect.equalsIgnoreCase("asc")){
            sort=Sort.by(sortBy).ascending();
        }
        else{
            sort = Sort.by(sortBy).descending();
        }

        if (sortBy != null && !sortBy.isEmpty()) {
            allEvents = eventrepo.findAll(sort); // Retrieve all data sorted
        } else {
            allEvents = eventrepo.findAll(); // Retrieve all data without sorting
        }

        List<EventsDTO> eventDTOs = allEvents.stream()
                .map(event -> mapper.map(event, EventsDTO.class))
                .collect(Collectors.toList());

        return eventDTOs;
    }

    @Override
    public EventsDTO getEventbyId(Integer eventid) {
        EventEntity event = eventrepo.findById(eventid).orElseThrow(()-> new NullPointerException("post of" + eventid +"not found"));
        EventsDTO itemdto = mapper.map(event,EventsDTO.class);
        return itemdto;
    }

    @Override
    public List<EventsDTO> getEventbyCategory(String title) {

        List <EventEntity> events = eventrepo.findByCategoryCategoryTitle(title);
        List <EventsDTO> dto = events.stream().map((event)->mapper.map(event,EventsDTO.class)).collect(Collectors.toList());
        return  dto;
    }

    @Override
    public List<EventsDTO> getEventbyUser(Integer userId) {
        return null;
    }

    @Override
    public List<EventsDTO> searchEvent(String keyword) {
        List<EventEntity> events = eventrepo.findByTitleContaining(keyword);
        List<EventsDTO> eventdto = events.stream().map((event)->mapper.map(event,EventsDTO.class)).collect(Collectors.toList());
        return eventdto;
    }

    @Override
    public EventsDTO updateEvent(EventsDTO Eventdto, Integer EventId, Integer catId) {
        EventEntity event = eventrepo.findById(EventId).orElseThrow(()-> new NullPointerException());
        EventCategory cat = catrepo.findById(catId).orElseThrow(()->new NullPointerException("category not found"));
        event.setDescription(Eventdto.getDescription());
        event.setLocation(Eventdto.getLocation());
        event.setTitle(Eventdto.getTitle());
        event.setAddedDate( new Date());
        event.setImageName(Eventdto.getImageName());
        event.setCategory(cat);
        event.setInterested(Eventdto.getInterested());
        event.setGoing(Eventdto.getGoing());
        EventEntity updatedEvent = eventrepo.save(event);
        return mapper.map(updatedEvent, EventsDTO.class);
    }

    @Override
    public void deleteEvent(Integer Eventid) {
        EventEntity event =  eventrepo.findById(Eventid).orElseThrow(()->new NullPointerException());
        eventrepo.delete(event);

    }

    @Override
    public void interested(Integer eventId) {
        EventEntity event =  eventrepo.findById(eventId).orElseThrow(()->new NullPointerException("failed to interest"));
        event.setInterested(event.getInterested() + 1);
        eventrepo.save(event);
    }
    @Override
    public void notInterested (Integer eventId){
        EventEntity event = eventrepo.findById(eventId).orElseThrow(()-> new NullPointerException("not found event"));
        event.setInterested(event.getInterested() -1);
        eventrepo.save(event);
    }

    @Override
    public void going(Integer eventId) {
        EventEntity event =  eventrepo.findById(eventId).orElseThrow(()->new NullPointerException("failed to interest"));
        event.setGoing(event.getGoing() + 1);
        eventrepo.save(event);
    }

    @Override
    public void notGoing (Integer eventId){
        EventEntity event = eventrepo.findById(eventId).orElseThrow(()-> new NullPointerException("not found event"));
        event.setGoing(event.getGoing() -1);
        eventrepo.save(event);
    }
}
