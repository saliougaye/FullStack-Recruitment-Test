import 'package:app/models/post.dart';
import 'package:flutter/material.dart';

class PostWidget extends StatelessWidget {
  final Post post;
  final void Function() refresh;

  const PostWidget({Key? key, required this.post, required this.refresh}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return GestureDetector(
      onTap: () async {
        await Navigator.pushNamed(context, '/detail', arguments: post.id);
        refresh();
      },
      child: Container(
        margin: const EdgeInsets.only(bottom: 15),
        child: Container(
          decoration: BoxDecoration(
              borderRadius: BorderRadius.circular(8),
              color: Colors.white,
              boxShadow: const [
                BoxShadow(
                  blurRadius: 5,
                  spreadRadius: 2,
                  color: Colors.grey,
                  offset: Offset(0, 3)
                )
              ]),
          child: Padding(
            padding: const EdgeInsets.all(16),
            child: Row(
              mainAxisAlignment: MainAxisAlignment.spaceBetween,
              crossAxisAlignment: CrossAxisAlignment.end,
              children: [
                Text(
                  post.title,
                  style: const TextStyle(fontSize: 20, fontWeight: FontWeight.bold),
                ),
                Text(
                  post.id.toString(),
                )
              ],
            ),
          ),
        ),
      ),
    );
  }
}
