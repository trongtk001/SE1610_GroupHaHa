package com.example.bakeryrecipe.api;

import com.example.bakeryrecipe.dto.PostDTO;
import com.example.bakeryrecipe.service.PostService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.security.access.prepost.PostAuthorize;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;

@RestController
@RequestMapping("api/post")
@PreAuthorize("permitAll()")
public class PostAPI {
    @Autowired
    PostService postService;

    @PreAuthorize("isAuthenticated()")
    @PostMapping("")
    public PostDTO createPost(@RequestBody PostDTO postDTO){
        return postService.save(postDTO);
    }

    @PreAuthorize("isAuthenticated()")
    @PutMapping("/{id}")
    public PostDTO updatePost(@RequestBody PostDTO postDTO,@PathVariable("id") Long id){
        postDTO.setId(id);
        return postService.update(postDTO);
    }

    @PostAuthorize("#returnObject.member.id.equals(authentication.principal.id)")
    @DeleteMapping("/{id}")
    public PostDTO deletePost(@PathVariable("id") Long id){
        PostDTO postDTO = postService.delete(id);
        if(postDTO == null){
            throw new ResponseStatusException(HttpStatus.NOT_FOUND,"not found post");
        }
        return postService.delete(id);
    }


    @GetMapping
    public List<PostDTO> listPost(){
        return postService.findAll();
    }


    @PreAuthorize("isAuthenticated()")
    @GetMapping("/{id}")
    public List<PostDTO> listPostUser(@PathVariable("id") long id){
        return postService.findAllByMemberId(id);
    }
}
