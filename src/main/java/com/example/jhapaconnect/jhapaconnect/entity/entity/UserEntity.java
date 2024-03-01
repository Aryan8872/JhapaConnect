package com.example.jhapaconnect.jhapaconnect.entity.entity;

import jakarta.persistence.*;
import lombok.*;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.ArrayList;
import java.util.Collection;
import java.util.List;

@Builder
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name="users" ,uniqueConstraints = {
        @UniqueConstraint(name = "unique_user" ,columnNames = "email")
})

public class UserEntity implements UserDetails {
    @Id
    @GeneratedValue()
    private Integer id;

    @Column(name="firstName",nullable = false)
    private  String firstName;

    @Column(name="lastName",nullable = false)
    private  String lastName;

    @Column(name="email",nullable = false)
    private  String email;

    @Column(name="phoneNo",nullable = false)
    private  String phoneno;

    @Column(name="password",nullable = false)
    private  String password;

    @Enumerated(EnumType.STRING)
    private Roles role;

    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL , fetch = FetchType.LAZY)   //mapped by user colum of post
    private List<Post>  posts = new ArrayList<>();





    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return List.of(new SimpleGrantedAuthority(role.name()));
    }

    @Override
    public String getPassword() {
        return password;
    }

    @Override
    public String getUsername() {
        return email;
    }

    @Override
    public boolean isAccountNonExpired() {
        return true;    //making true bcz user will not be able to logg in as these are the requirements
    }

    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return true;
    }
}
