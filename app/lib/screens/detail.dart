import 'package:app/models/post.dart';
import 'package:app/services/api.dart';
import 'package:flutter/material.dart';

class PostDetail extends StatefulWidget {
  final int id;

  PostDetail({Key? key, required this.id}) : super(key: key);

  @override
  State<PostDetail> createState() => _PostDetailState();
}

class _PostDetailState extends State<PostDetail> {
  final apiService = ApiService();
  late Future<Post> getPost;

  @override
  void initState() {
    super.initState();

    getPost = apiService.getPost(widget.id);
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(),
      body: Container(
        margin: const EdgeInsets.all(16.0),
        child: FutureBuilder<Post>(
          future: getPost,
          builder: (context, snapshot) {
            if (snapshot.hasError) {
              return const Center(
                child: Text('Sorry we have an error'),
              );
            }

            if (snapshot.hasData) {
              final postFetched = snapshot.data!;
              return Column(
                children: [
                  _item('Title', postFetched.title),
                  const SizedBox(
                    height: 10,
                  ),
                  _item('Body', postFetched.body),
                  const SizedBox(
                    height: 10,
                  ),
                  Row(
                    mainAxisAlignment: MainAxisAlignment.center,
                    children: [
                      ElevatedButton(
                          onPressed: () async {
                            await Navigator.pushNamed(context, '/edit', arguments: postFetched);

                            setState(() {
                              getPost = apiService.getPost(postFetched.id);
                            });
                          },
                          style:
                              ElevatedButton.styleFrom(primary: Colors.green),
                          child: Row(
                            children: const [
                              Icon(Icons.edit),
                              SizedBox(
                                width: 5,
                              ),
                              Text('Edit')
                            ],
                          )),
                      const SizedBox(
                        width: 5,
                      ),
                      ElevatedButton(
                          onPressed: () async {
                            String message = "";

                            try {
                              await apiService.deletePost(postFetched.id);
                              message = "Post deleted";
                            } catch (e) {
                              message = 'Post not deleted. Error!!';
                            }

                            ScaffoldMessenger.of(context)
                                .showSnackBar(SnackBar(content: Text(message)));

                            Navigator.pop(context);
                          },
                          style: ElevatedButton.styleFrom(primary: Colors.red),
                          child: Row(
                            children: const [
                              Icon(Icons.delete),
                              SizedBox(
                                width: 5,
                              ),
                              Text('Delete')
                            ],
                          )),
                    ],
                  )
                ],
              );
            }

            return const Center(
              child: CircularProgressIndicator(),
            );
          },
        ),
      ),
    );
  }

  Widget _item(String title, String value) {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Text(
          title,
          style: const TextStyle(
            fontWeight: FontWeight.bold,
            fontSize: 18,
          ),
        ),
        const SizedBox(
          height: 10,
        ),
        Container(
            decoration: BoxDecoration(
                borderRadius: BorderRadius.circular(8),
                color: Colors.white,
                boxShadow: const [
                  BoxShadow(
                      blurRadius: 5,
                      spreadRadius: 2,
                      color: Colors.grey,
                      offset: Offset(0, 3))
                ]),
            child: Padding(
              padding: const EdgeInsets.all(8.0),
              child: Row(
                children: [
                  Expanded(
                    child: Text(
                      value,
                      style: const TextStyle(
                        fontSize: 18,
                      ),
                    ),
                  ),
                ],
              ),
            )),
      ],
    );
  }
}
