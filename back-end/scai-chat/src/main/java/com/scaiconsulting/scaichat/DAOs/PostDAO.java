package com.scaiconsulting.scaichat.DAOs;

import com.scaiconsulting.scaichat.entities.Post;

import java.util.List;

public interface PostDAO {

    public Post createPost(Post post);

    public List<Post> getPosts(int profileId);

    public Post getPost(int postId);

    public Post updatePost( Post post );

    public String deletePost( int postId );

    public List<Post> getFriendsPosts();

}
