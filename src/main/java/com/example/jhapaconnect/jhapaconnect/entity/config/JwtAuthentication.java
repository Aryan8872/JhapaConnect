package com.example.jhapaconnect.jhapaconnect.entity.config;


import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.validation.constraints.NotNull;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;

//this config should run each and every time user makes a request which can be achieved by extending the class below



@Component
@RequiredArgsConstructor

public class JwtAuthentication extends OncePerRequestFilter {
    private final JwtService jwtService;
    private final UserDetailsService userDetailsService;
    @Override
    protected void doFilterInternal(
            @NotNull HttpServletRequest request,
            @NotNull HttpServletResponse response,
            @NotNull FilterChain filterChain  //its a chain of responsibility design pattern which will contain the list of other filters that we will need
    ) throws ServletException, IOException {
        //contains JWT token
        final String authHeader = request.getHeader("Authorization");    //when a user makes a request we need to pass the jwt authentication token within the header so it should be within a header which is created here and we will extract it.
        final String jwt;                                                  // the authheader(authenti header) is a part of the request so we can call the method from request of getheader("your name of authentication header")
        final String userEmail;
        //token checking process

        //the token should always start with the keyword bearer and a space which will take 6 space and we should start from pos 7 while extracting token
        if(authHeader == null || authHeader.startsWith("Bearer ")){
            filterChain.doFilter(request,response);   //dont continue with the execution of request
            return;
        }

        //token extraction
        jwt=authHeader.substring(7);


        // extract from jwt token
        userEmail = jwtService.extractUsername(jwt);
        if(userEmail != null && SecurityContextHolder.getContext().getAuthentication() == null){
            UserDetails userDetails = this.userDetailsService.loadUserByUsername(userEmail);
            if(jwtService.isTokenvalid(jwt , userDetails)){
                UsernamePasswordAuthenticationToken authToken = new UsernamePasswordAuthenticationToken(userDetails,null,userDetails.getAuthorities());
                authToken.setDetails( new WebAuthenticationDetailsSource().buildDetails(request));
                SecurityContextHolder.getContext().setAuthentication(authToken);
            }
        }
        filterChain.doFilter(request, response);


    }
}
