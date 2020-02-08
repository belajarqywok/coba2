import 'package:flutter/material.dart';

void main() {
  runApp(HomePage());
}

class HomePage extends StatelessWidget {
  build(context) {
    return MaterialApp(
      home: Scaffold(
        appBar: AppBar(
          backgroundColor: Colors.red[800],
          leading: Icon(Icons.home),
          title: Text('Qywok')
        ),
          
        //CODE BARU YANG DITAMBAHKAN
        body: Container(
          child: Card(
            child: Column(
              children: <Widget>[
                Image.network('https://flutter.io/images/homepage/header-illustration.png'),
                Text('Belajar Flutter')
              ]
            )
          ),
        )
      	//AKHIR CODE

      )
    );
  }
}