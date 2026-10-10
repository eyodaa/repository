package com.enterprise.dashen_repository.auth;

import com.enterprise.dashen_repository.audit.AuditLogService;
import jakarta.servlet.http.HttpServletRequest;
import lombok.Data;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;

@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
public class AuthController {
    private final UserRepository repository;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;
    private final AuthenticationManager authenticationManager;
    private final AuditLogService auditLogService;

    @Data
    public static class AuthenticationRequest {
        private String username;
        private String password;
    }

    @Data
    public static class AuthenticationResponse {
        private String token;
        private String username;
        private Role role;
    }

    @PostMapping("/login")
    public ResponseEntity<AuthenticationResponse> authenticate(@RequestBody AuthenticationRequest request,
                                                              HttpServletRequest httpRequest) {
        authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(request.getUsername(), request.getPassword())
        );
        var user = repository.findByUsername(request.getUsername()).orElseThrow();
        var jwtToken = jwtService.generateToken(user);
        
        // Log login event
        auditLogService.logLogin(user.getUsername(), httpRequest);
        
        AuthenticationResponse res = new AuthenticationResponse();
        res.setToken(jwtToken);
        res.setUsername(user.getUsername());
        res.setRole(user.getRole());
        
        return ResponseEntity.ok(res);
    }
}
