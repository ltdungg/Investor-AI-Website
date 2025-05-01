package com.stockai.backend.filter;

import com.stockai.backend.entity.user.MyUserDetail;
import com.stockai.backend.service.CustomUserDetailsService;
import com.stockai.backend.service.auth.BlackListService;
import com.stockai.backend.utils.JwtUtils;
import io.jsonwebtoken.Claims;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContext;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;
import org.springframework.util.StringUtils;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;

@Slf4j
@Component
public class JwtAuthenticationFilter extends OncePerRequestFilter {
    @Autowired
    private JwtUtils jwtUtils;
    @Autowired
    private CustomUserDetailsService userDetailsService;
    @Autowired
    private BlackListService blackListService;

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain)
            throws ServletException, IOException {
        try {
            String jwt = getJwtFromRequest(request);
            if (StringUtils.hasText(jwt)) {
                Claims claims = jwtUtils.getPayload(jwt);
                String jit = claims.getId();

                if (!blackListService.blackListed(jit)) {
                    Integer userId = Integer.parseInt(claims.getSubject());
                    MyUserDetail userDetails = (MyUserDetail) userDetailsService.loadUserById(userId);

                    if (userDetails != null) {
                        SecurityContext context = SecurityContextHolder.createEmptyContext();
                        Authentication authentication =
                                new UsernamePasswordAuthenticationToken(
                                        userDetails.getUsername(),
                                        userDetails.getPassword(),
                                        userDetails.getAuthorities());
                        context.setAuthentication(authentication);
                        SecurityContextHolder.setContext(context);
                    }
                }
            }
        } catch (NullPointerException e) {
            log.error("Null pointer exception");
            log.error(e.getMessage());
        } catch (Exception e) {
            log.error("failed on set user authentication");
            log.error(e.getMessage());
        }

        filterChain.doFilter(request, response);
    }

    private String getJwtFromRequest(HttpServletRequest request) {
        return request.getHeader("Authorization");
    }
}
