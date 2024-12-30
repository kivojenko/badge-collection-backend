package com.badgecollection;

import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class GitHubController {

    @GetMapping("/login/oauth2/github")
    public String loginWithGitHub(@AuthenticationPrincipal OAuth2User oAuth2User) {
        if (oAuth2User == null) {
            return "Not authenticated";
        }
        String username = oAuth2User.getAttribute("login");
        String email = oAuth2User.getAttribute("email");

        // Send the user data as a query parameter in the redirect URL
        return "Redirecting back to frontend with user info: " +
                "<a href='http://localhost:3000?username=" + username + "&email=" + email + "'>Click here</a>";
    }
}
