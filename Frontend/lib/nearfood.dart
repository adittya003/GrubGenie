import 'package:flutter/material.dart';
import 'foodcard.dart';

List<Widget> cardList = [
  const FoodCard(
      item: 'Maggi Masala 1-Pack',
      price: 10,
      store: 'Pazhamudhir Nilayam',
      expiry: '30/1/2024',
      mrp: 20),
  const FoodCard(
      item: 'iD Chapati 350g',
      price: 50,
      store: 'Nilgiris',
      expiry: '30/1/2024',
      mrp: 75)
];

class FoodList extends StatefulWidget {
  const FoodList({super.key});

  @override
  State<FoodList> createState() => _FoodListState();
}

class _FoodListState extends State<FoodList> {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
        body: Container(
            alignment: Alignment.center,
            decoration: const BoxDecoration(
              gradient: LinearGradient(
                colors: [Colors.blue, Colors.lightBlue],
                begin: Alignment.topLeft,
                end: Alignment.bottomRight,
              ),
            ),
            child: ListView.builder(
              shrinkWrap: true,
              itemCount: cardList.length,
              itemBuilder: (context, index) {
                return Padding(
                  padding: const EdgeInsets.all(8),
                  child: cardList[index],
                );
              },
            )));
  }
}
