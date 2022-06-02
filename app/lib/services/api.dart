import 'dart:convert';

import 'package:app/models/post.dart';
import 'package:http/http.dart' as http;

class ApiService {
  Future<List<Post>> getPosts() async {
    final response = await http.get(Uri.parse("http://10.0.2.2:5000/posts"));

    if (response.statusCode == 200) {
      final List<dynamic> json = jsonDecode(response.body);
      return json.map((e) => Post.fromJson(e)).toList();
    }
    throw Exception('Failed to get posts');
  }

  Future<Post> getPost(int id) async {
    final response = await http.get(Uri.parse("http://10.0.2.2:5000/posts/$id"));

    if (response.statusCode == 200) {
      final json = jsonDecode(response.body);
      return Post.fromJson(json);
    }
    throw Exception('Failed to get posts');
  }

  Future<void> createPost(Post post) async {
    final response = await http.post(Uri.parse("http://10.0.2.2:5000/posts"),
        body: jsonEncode(post.toJson()),
        headers: {'Content-Type': 'application/json'});

    if (response.statusCode >= 400) {
      throw Exception('Post not created');
    }
  }

  Future<void> deletePost(int id) async {
    final response =
        await http.delete(Uri.parse("http://10.0.2.2:5000/posts/$id"));

    if (response.statusCode >= 400) {
      throw Exception('Post not deleted');
    }
  }

  Future<void> updatePost(Post post) async {
    final response = await http.put(
        Uri.parse("http://10.0.2.2:5000/posts/${post.id}"),
        body: jsonEncode(post.toJson()),
        headers: {'Content-Type': 'application/json'});

    if (response.statusCode >= 400) {
      throw Exception('Post not deleted');
    }
  }
}
