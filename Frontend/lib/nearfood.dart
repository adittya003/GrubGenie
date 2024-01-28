import 'package:easy_search_bar/easy_search_bar.dart';
import 'package:flutter/material.dart';
import 'package:grub_genie/models.dart';
import 'package:provider/provider.dart';
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
    return ChangeNotifierProvider(
        create: (context) => NearFoodProvider(),
        child: Consumer<NearFoodProvider>(
            builder: (context, myFoodProvider, child) {
          return Scaffold(
              appBar: EasySearchBar(
                  backgroundColor: Colors.white,
                  foregroundColor: Colors.black,
                  title: const Text('Search'),
                  onSearch: (value) {
                    myFoodProvider.searched(value);
                  }),
              body: Container(
                alignment: Alignment.topCenter,
                decoration: const BoxDecoration(
                  gradient: LinearGradient(
                    colors: [
                      Color.fromARGB(255, 148, 221, 255),
                      Color.fromARGB(255, 177, 158, 180)
                    ],
                    begin: Alignment.topLeft,
                    end: Alignment.bottomRight,
                  ),
                ),
                child: ListView.builder(
                  shrinkWrap: true,
                  itemCount: myFoodProvider.cardList.length,
                  itemBuilder: (context, index) {
                    return Padding(
                      padding: const EdgeInsets.all(8),
                      child: myFoodProvider.cardList[index],
                    );
                  },
                ),
              ));
        }));
  }
}
