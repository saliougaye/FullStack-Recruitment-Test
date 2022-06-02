import 'package:app/models/post.dart';
import 'package:app/services/api.dart';
import 'package:flutter/material.dart';

class AddPost extends StatefulWidget {
  const AddPost({Key? key}) : super(key: key);

  @override
  State<AddPost> createState() => _AddPostState();
}

class _AddPostState extends State<AddPost> {
  final _formKey = GlobalKey<FormState>();
  final apiService = ApiService();
  late String title;
  late String body;

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text('Add Post'),
      ),
      body: Form(
          key: _formKey,
          child: Container(
            margin: EdgeInsets.all(16),
            child: Column(
              children: [
                Container(
                  margin: EdgeInsets.only(bottom: 10),
                  child: TextFormField(
                    decoration: const InputDecoration(
                      labelText: 'Title',
                      labelStyle:
                          TextStyle(fontSize: 18, fontWeight: FontWeight.bold),
                    ),
                    validator: (value) {
                      if (value == null || value.isEmpty) {
                        return 'Please enter the title';
                      }
                    },
                    onSaved: (newValue) {
                      title = newValue!;
                    },
                  ),
                ),
                TextFormField(
                    decoration: const InputDecoration(
                      labelText: 'Body',
                      labelStyle:
                          TextStyle(fontSize: 18, fontWeight: FontWeight.bold),
                    ),
                    maxLines: 5,
                    validator: (value) {
                      if (value == null || value.isEmpty) {
                        return 'Please enter the body';
                      }
                    },
                    onSaved: (newValue) {
                      body = newValue!;
                    })
              ],
            ),
          )),
      floatingActionButton: FloatingActionButton(
        child: const Icon(Icons.check),
        onPressed: () async {
          if (_formKey.currentState!.validate()) {
            _formKey.currentState!.save();

            final post = Post(id: -1, title: title, body: body, userId: -1);
            String message = "";

            try {
              await apiService.createPost(post);
              message = 'Post Created';
            } catch (e) {
              message = 'Post not Created. Error!!';
            }

            ScaffoldMessenger.of(context)
                .showSnackBar(SnackBar(content: Text(message)));

              Navigator.pop(context);
          }
        },
      ),
    );
  }
}
