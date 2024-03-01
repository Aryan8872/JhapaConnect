package com.example.jhapaconnect.jhapaconnect.entity.controller;

import com.example.jhapaconnect.jhapaconnect.entity.dto.EventsDTO;
import com.example.jhapaconnect.jhapaconnect.entity.dto.ItemsDTO;
import com.example.jhapaconnect.jhapaconnect.entity.dto.LikeDTO;
import com.example.jhapaconnect.jhapaconnect.entity.service.EventService;
import com.example.jhapaconnect.jhapaconnect.entity.service.Fileservice;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.util.StreamUtils;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.io.InputStream;
import java.util.List;

@RestController
@RequestMapping("api/v1/auth")
@RequiredArgsConstructor
@CrossOrigin(origins =  "http://localhost:5173")
public class EventController {

    private final EventService service;
    private final Fileservice fileService;



    @Value("/images")
    private String path;


    @PostMapping("/user/{userId}/category/{catId}/event")
    public ResponseEntity<EventsDTO> createEvent(
            @RequestBody EventsDTO dto,
            @PathVariable Integer userId,
            @PathVariable Integer catId
    ) {
        EventsDTO event = service.createEvent(dto, userId, catId);

        return new ResponseEntity<>(event, HttpStatus.CREATED);
    }

    @GetMapping("/user/{userId}/events")

    public ResponseEntity<List<EventsDTO>> getEventsbyuser(@PathVariable Integer userId){
        List<EventsDTO> events = service.getEventbyUser(userId);
        return  new ResponseEntity<List<EventsDTO>>(events,HttpStatus.OK);
    }

    @GetMapping("/category/{keyword}/events")

    public ResponseEntity<List<EventsDTO>> getEventsbycategory(@PathVariable String keyword){
        List<EventsDTO> events = service.getEventbyCategory(keyword);
        return  new ResponseEntity<List<EventsDTO>>(events,HttpStatus.OK);
    }

    @GetMapping("/events")
    public List<EventsDTO> getallEvents(
            @RequestParam(value = "sortBy",
                    defaultValue = "id",required = false) String sortBy,
            @RequestParam(value = "sortDirection" ,defaultValue = "asc",required = false) String sortDirect){

        return service.getAllEvents(sortBy,sortDirect);
    }

    @GetMapping(value = "/event/image/{imageName}" , produces = MediaType.IMAGE_JPEG_VALUE)
    public void downloadImage(
            @PathVariable("imageName") String imageName,
            HttpServletResponse response
    ) throws IOException {
        InputStream resource = fileService.getResource(path,imageName);
        response.setContentType(MediaType.IMAGE_JPEG_VALUE);
        StreamUtils.copy(resource,response.getOutputStream());

    }


    @DeleteMapping("/event/delete/{id}")
    public ResponseEntity <String> delteEvent(@PathVariable("id") Integer id){
        service.deleteEvent(id);
        return  ResponseEntity.ok("sucessfully  deleted");
    }

    @PutMapping("/update-event/{eventId}/{catId}")
    public ResponseEntity<EventsDTO> updateEvent(@RequestBody EventsDTO eventDTO, @PathVariable Integer eventId,@PathVariable("catId") Integer catId){
        EventsDTO updateditem = service.updateEvent(eventDTO,eventId,catId);
        return  new ResponseEntity<>(updateditem,HttpStatus.OK);
    }

    @GetMapping("/events/search/{keywords}")
    public ResponseEntity<List<EventsDTO>> searchEventbyDescription(@PathVariable ("keywords") String keywords){
        List<EventsDTO> searchResult = service.searchEvent(keywords);
        return  new ResponseEntity<List<EventsDTO>>(searchResult,HttpStatus.OK);
    }

    @PostMapping("/event/image/upload/{eventId}/{catId}")
    public ResponseEntity<EventsDTO> uploadEventImage(@RequestParam("image") MultipartFile image, @PathVariable("eventId") Integer eventId,@PathVariable("catId") Integer catId
    ) throws IOException {

        String fileName=  fileService.uploadImage(path,image);
        EventsDTO eventDTO =  service.getEventbyId(eventId);
        eventDTO.setImageName(fileName);
        EventsDTO updatedevent = service.updateEvent(eventDTO,eventId,catId);
        return  new ResponseEntity<EventsDTO>(updatedevent,HttpStatus.OK);

    }

    @GetMapping("/event/{eventId}")
    public ResponseEntity<EventsDTO> getEventbyid(@PathVariable("eventId") Integer eventid){
        EventsDTO dto =  service.getEventbyId(eventid);
        return new ResponseEntity<EventsDTO>(dto, HttpStatus.OK);
    }

    @PostMapping("/interested/{eventId}")
    public ResponseEntity<String> interestEvent(@PathVariable("eventId") Integer eventId) {
        service.interested(eventId);
        return ResponseEntity.ok("event interested");
    }

    @PutMapping("/notinterest/{eventId}")
    public ResponseEntity<String> notInterest(@PathVariable("eventId") Integer eventId) {
        service.notInterested(eventId);
        return ResponseEntity.ok("event not interested");
    }
    @PostMapping("/going/{eventId}")
    public ResponseEntity<String> goingEvent(@PathVariable("eventId") Integer eventId) {
        service.going(eventId);
        return ResponseEntity.ok("event going");
    }
    @PutMapping("/notgoing/{eventId}")
    public ResponseEntity<String> notGoing(@PathVariable("eventId") Integer eventId) {
        service.interested(eventId);
        return ResponseEntity.ok("event interested");
    }




}
