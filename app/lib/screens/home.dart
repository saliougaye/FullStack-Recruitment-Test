import 'package:app/models/post.dart';
import 'package:app/services/api.dart';
import 'package:app/widgets/post_item.dart';
import 'package:flutter/material.dart';

class Home extends StatefulWidget {
  Home({Key? key}) : super(key: key);

  @override
  State<Home> createState() => _HomeState();
}

class _HomeState extends State<Home> {
  final ApiService apiService = ApiService();
  late Future<List<Post>> posts;

  @override
  void initState() {
    super.initState();
    posts = apiService.getPosts();
  }

  void refresh() {
    setState(() {
      posts = apiService.getPosts();
    });
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text('Recruitment'),
      ),
      body: Container(
        margin: const EdgeInsets.all(12),
        child: FutureBuilder<List<Post>>(
          future: posts,
          builder: (context, snapshot) {
            if (snapshot.hasError) {
              return const Text('Sorry, I have an error');
            }

            if (snapshot.hasData) {
              final posts = snapshot.data!;
              return ListView.builder(
                itemCount: posts.length,
                itemBuilder: (context, index) {
                  return PostWidget(post: posts[index], refresh: refresh,);
                },
              );
            }

            return const CircularProgressIndicator();
          },
        ),
      ),
      floatingActionButton: FloatingActionButton(
        onPressed: () async {
          await Navigator.pushNamed(context, '/add');
          refresh();
        },
        child: const Icon(Icons.add),
      ),
    );
  }
}
