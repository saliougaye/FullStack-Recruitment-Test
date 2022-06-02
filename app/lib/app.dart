import 'package:app/models/post.dart';
import 'package:app/screens/add.dart';
import 'package:app/screens/detail.dart';
import 'package:app/screens/edit.dart';
import 'package:app/screens/home.dart';
import 'package:flutter/material.dart';

class App extends StatefulWidget {
  const App({Key? key}) : super(key: key);

  @override
  State<App> createState() => _AppState();
}

class _AppState extends State<App> {
  @override
  void initState() {
    super.initState();
  }

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'Recruitment',
      theme: ThemeData(primaryColor: Colors.blueGrey),
      initialRoute: '/',
      onGenerateRoute: (settings) {
        if(settings.name == '/detail') {
          final args = settings.arguments as int;

          return MaterialPageRoute(
            builder: (context) {
              
              return PostDetail(id: args);
            },
          );
        }

        if(settings.name == '/edit') {
          final args = settings.arguments as Post;

          return MaterialPageRoute(
            builder: (context) {
              
              return EditPost(post: args);
            },
          );
        }


      },
      routes: {
        '/': (context) => Home(),
        '/add': (context) => const AddPost()
      },
    );
  }
}
