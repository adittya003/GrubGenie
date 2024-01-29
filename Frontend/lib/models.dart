import 'package:flutter/material.dart';

import 'foodcard.dart';

class NearFoodProvider extends ChangeNotifier {
  final List<FoodCard> totalCardList = [
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
  late List<Widget> cardList;

  NearFoodProvider() {
    cardList = List.from(totalCardList);
  }

  void searched(String query) {
    // if (query == '') {
    //   cardList = List.from(totalCardList);
    //   notifyListeners();
    //   return;
    // } may work without
    cardList.clear();
    for (var result in totalCardList) {
      if (result.item.toLowerCase().contains(query.toLowerCase())) {
        cardList.add(result);
      }
    }
    notifyListeners();
  }
}
