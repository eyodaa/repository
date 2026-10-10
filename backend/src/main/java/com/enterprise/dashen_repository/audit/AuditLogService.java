package com.enterprise.dashen_repository.audit;

import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;

@Service
@RequiredArgsConstructor
public class AuditLogService {
    
    private final AuditLogRepository auditLogRepository;
    
    @Transactional
    public void logAction(String username, String action, String entityType, Long entityId, String details, HttpServletRequest request) {
        AuditLog auditLog = new AuditLog();
        auditLog.setUsername(username);
        auditLog.setAction(action);
        auditLog.setEntityType(entityType);
        auditLog.setEntityId(entityId);
        auditLog.setDetails(details);
        auditLog.setIpAddress(getClientIpAddress(request));
        auditLog.setTimestamp(LocalDateTime.now());
        
        auditLogRepository.save(auditLog);
    }
    
    @Transactional
    public void logLogin(String username, HttpServletRequest request) {
        logAction(username, "LOGIN", "USER", null, "User logged in", request);
    }
    
    @Transactional
    public void logCreate(String username, String entityType, Long entityId, String details, HttpServletRequest request) {
        logAction(username, "CREATE", entityType, entityId, details, request);
    }
    
    @Transactional
    public void logUpdate(String username, String entityType, Long entityId, String details, HttpServletRequest request) {
        logAction(username, "UPDATE", entityType, entityId, details, request);
    }
    
    @Transactional
    public void logDelete(String username, String entityType, Long entityId, String details, HttpServletRequest request) {
        logAction(username, "DELETE", entityType, entityId, details, request);
    }
    
    public List<AuditLog> getAllLogs() {
        return auditLogRepository.findAllByOrderByTimestampDesc();
    }
    
    public List<AuditLog> getLogsByUsername(String username) {
        return auditLogRepository.findByUsernameOrderByTimestampDesc(username);
    }
    
    public List<AuditLog> getLogsByEntityType(String entityType) {
        return auditLogRepository.findByEntityTypeOrderByTimestampDesc(entityType);
    }
    
    public List<AuditLog> getLogsByAction(String action) {
        return auditLogRepository.findByActionOrderByTimestampDesc(action);
    }
    
    public List<AuditLog> getLogsByDateRange(LocalDateTime start, LocalDateTime end) {
        return auditLogRepository.findByTimestampBetweenOrderByTimestampDesc(start, end);
    }
    
    private String getClientIpAddress(HttpServletRequest request) {
        String xForwardedFor = request.getHeader("X-Forwarded-For");
        if (xForwardedFor != null && !xForwardedFor.isEmpty() && !"unknown".equalsIgnoreCase(xForwardedFor)) {
            return xForwardedFor.split(",")[0].trim();
        }
        
        String xRealIp = request.getHeader("X-Real-IP");
        if (xRealIp != null && !xRealIp.isEmpty() && !"unknown".equalsIgnoreCase(xRealIp)) {
            return xRealIp;
        }
        
        return request.getRemoteAddr();
    }
}
