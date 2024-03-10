package com.example.jhapaconnect.jhapaconnect.entity.config;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;

import java.security.Key;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;
import java.util.function.Function;

@Service
public class JwtService {

    private static  final String SECRET_KEY ="294A404E635266556A586E3272357538782F4125442A472D4B6150645367566B";

    public String extractUsername(String token){
        return extractClaim(token,Claims::getSubject);
    }


    public <T> T extractClaim (String token, Function<Claims,T> claimsResolver){
        final Claims claims = extractAllclaims(token);
        return claimsResolver.apply(claims);
    }

    //token generator
    //extra claims is for passing authority or any information that we want to store in the token
    public String generateToken(Map<String, Object> extraClaims, UserDetails userDetails){
        Date expirationDate = new Date(System.currentTimeMillis() + 1000 * 60 * 60 * 24 * 7);

        return  Jwts.builder()
                .setClaims(extraClaims)
                .setSubject(userDetails.getUsername())  //we want to verify the user using the subject in token which is the username but here we want to verify user using email so username=email
                .setIssuedAt(new Date(System.currentTimeMillis()))  //set the time for checking expiration
                .setExpiration(expirationDate)     //set expiration of token
                .signWith(getSignInkey(), SignatureAlgorithm.HS256)   // token generating algorithm
                .compact(); //compact will generate and return the token
    }

    //generate token using only userdetails no other extra claims
    public String generateToken(UserDetails userDetails){
        return generateToken(new HashMap<>(),userDetails);
    }

    private  Claims extractAllclaims(String token){
        return Jwts
                .parserBuilder()  //parsing token
                .setSigningKey(getSignInkey())   //set signin key bcz when we try to create or decode a token we need to use the signing key
                .build()       //we need to buld the parsed token because we parsed it in bulder with signing key
                .parseClaimsJws(token)   // once the object is  build it will  claims from token
                .getBody();      // it will get the body content from parsed claim from token
    }

    private Key getSignInkey() {
        byte [] keyByte = Decoders.BASE64.decode(SECRET_KEY);
        return Keys.hmacShaKeyFor(keyByte);
    }

    public boolean isTokenvalid(String token ,UserDetails userDetails){
        final String userName= extractUsername(token);
        return (userName.equals(userDetails.getUsername())) && !isTokenExpired(token);    //checking if the token belongs to that user
    }

    private boolean isTokenExpired(String token) {
        return extractExpiration(token).before(new Date());
    }

    private Date extractExpiration(String token) {
        return  extractClaim(token,Claims::getExpiration);
    }
}
