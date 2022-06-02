class Post {
    Post({
        required this.id,
        required this.title,
        required this.body,
        required this.userId,
    });

    int id;
    String title;
    String body;
    int userId;

    factory Post.fromJson(Map<String, dynamic> json) => Post(
        id: json["id"],
        title: json["title"],
        body: json["body"],
        userId: json["userId"],
    );

    Map<String, dynamic> toJson() => {
        "id": id,
        "title": title,
        "body": body,
        "userId": userId,
    };
}
