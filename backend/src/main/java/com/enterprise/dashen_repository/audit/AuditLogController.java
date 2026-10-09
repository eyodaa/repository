package com.enterprise.dashen_repository.audit;

import lombok.RequiredArgsConstructor;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.List;

@RestController
@RequestMapping("/api/audit-logs")
@RequiredArgsConstructor
@PreAuthorize("hasRole('SYSTEM_ADMIN')")
public class AuditLogController {
    
    private final AuditLogService auditLogService;
    
    @GetMapping
    public ResponseEntity<List<AuditLog>> getAllLogs() {
        return ResponseEntity.ok(auditLogService.getAllLogs());
    }
    
    @GetMapping("/user/{username}")
    public ResponseEntity<List<AuditLog>> getLogsByUsername(@PathVariable String username) {
        return ResponseEntity.ok(auditLogService.getLogsByUsername(username));
    }
    
    @GetMapping("/entity/{entityType}")
    public ResponseEntity<List<AuditLog>> getLogsByEntityType(@PathVariable String entityType) {
        return ResponseEntity.ok(auditLogService.getLogsByEntityType(entityType));
    }
    
    @GetMapping("/action/{action}")
    public ResponseEntity<List<AuditLog>> getLogsByAction(@PathVariable String action) {
        return ResponseEntity.ok(auditLogService.getLogsByAction(action));
    }
    
    @GetMapping("/date-range")
    public ResponseEntity<List<AuditLog>> getLogsByDateRange(
            @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME) LocalDateTime start,
            @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME) LocalDateTime end) {
        return ResponseEntity.ok(auditLogService.getLogsByDateRange(start, end));
    }
}
