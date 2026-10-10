package com.enterprise.dashen_repository.auth;

import com.enterprise.dashen_repository.audit.AuditLogService;
import jakarta.servlet.http.HttpServletRequest;
import lombok.Data;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/users")
@RequiredArgsConstructor
public class UserController {
    private final UserRepository repository;
    private final PasswordEncoder passwordEncoder;
    private final AuditLogService auditLogService;

    @GetMapping
    @PreAuthorize("hasRole('SYSTEM_ADMIN')")
    public ResponseEntity<List<User>> getAllUsers() {
        return ResponseEntity.ok(repository.findAll());
    }

    @Data
    public static class CreateUserRequest {
        private String username;
        private String password;
        private Role role;
    }

    @PostMapping
    @PreAuthorize("hasRole('SYSTEM_ADMIN')")
    public ResponseEntity<User> createUser(@RequestBody CreateUserRequest request, 
                                           @AuthenticationPrincipal User currentUser,
                                           HttpServletRequest httpRequest) {
        if (repository.findByUsername(request.getUsername()).isPresent()) {
            return ResponseEntity.badRequest().build();
        }
        var user = User.builder()
                .username(request.getUsername())
                .password(passwordEncoder.encode(request.getPassword()))
                .role(request.getRole())
                .build();
        var savedUser = repository.save(user);
        
        auditLogService.logCreate(
            currentUser.getUsername(),
            "USER",
            savedUser.getId(),
            String.format("Created user %s with role %s", request.getUsername(), request.getRole()),
            httpRequest
        );
        
        return ResponseEntity.ok(savedUser);
    }

    @PutMapping("/{id}")
    @PreAuthorize("hasRole('SYSTEM_ADMIN')")
    public ResponseEntity<User> updateUser(@PathVariable Long id, 
                                           @RequestBody CreateUserRequest request,
                                           @AuthenticationPrincipal User currentUser,
                                           HttpServletRequest httpRequest) {
        var userOptional = repository.findById(id);
        if (userOptional.isEmpty()) {
            return ResponseEntity.notFound().build();
        }
        var user = userOptional.get();
        
        // If username changed, check if it already exists
        if (!user.getUsername().equals(request.getUsername()) && repository.findByUsername(request.getUsername()).isPresent()) {
            return ResponseEntity.badRequest().build();
        }
        
        String details = String.format("Updated user %s: ", user.getUsername());
        boolean hasChanges = false;
        
        if (!user.getUsername().equals(request.getUsername())) {
            details += String.format("username changed from %s to %s", user.getUsername(), request.getUsername());
            user.setUsername(request.getUsername());
            hasChanges = true;
        }
        
        if (request.getPassword() != null && !request.getPassword().isEmpty()) {
            if (hasChanges) details += ", ";
            details += "password changed";
            user.setPassword(passwordEncoder.encode(request.getPassword()));
            hasChanges = true;
        }
        
        if (!user.getRole().equals(request.getRole())) {
            if (hasChanges) details += ", ";
            details += String.format("role changed from %s to %s", user.getRole(), request.getRole());
            user.setRole(request.getRole());
            hasChanges = true;
        }
        
        var savedUser = repository.save(user);
        
        if (hasChanges) {
            auditLogService.logUpdate(
                currentUser.getUsername(),
                "USER",
                id,
                details,
                httpRequest
            );
        }
        
        return ResponseEntity.ok(savedUser);
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('SYSTEM_ADMIN')")
    public ResponseEntity<Void> deleteUser(@PathVariable Long id,
                                           @AuthenticationPrincipal User currentUser,
                                           HttpServletRequest httpRequest) {
        var userOptional = repository.findById(id);
        if (userOptional.isEmpty()) {
            return ResponseEntity.notFound().build();
        }
        
        var user = userOptional.get();
        String username = user.getUsername();
        
        repository.deleteById(id);
        
        auditLogService.logDelete(
            currentUser.getUsername(),
            "USER",
            id,
            String.format("Deleted user %s with role %s", username, user.getRole()),
            httpRequest
        );
        
        return ResponseEntity.ok().build();
    }
}
