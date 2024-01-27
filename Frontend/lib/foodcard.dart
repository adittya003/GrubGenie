import 'package:flutter/material.dart';

class FoodCard extends StatefulWidget {
  final String item;
  final int price;
  final String store;
  final String expiry;
  final int mrp;

  const FoodCard(
      {super.key,
      required this.item,
      required this.price,
      required this.store,
      required this.expiry,
      required this.mrp});

  @override
  State<FoodCard> createState() => _FoodCardState();
}

class _FoodCardState extends State<FoodCard> {
  @override
  Widget build(BuildContext context) {
    return Card(
      color: Colors.cyan,
      child: Column(
        mainAxisSize: MainAxisSize.min,
        children: [
          ListTile(
            title: Text(widget.item),
            subtitle: Text(widget.expiry),
          ),
          Row(
            mainAxisAlignment: MainAxisAlignment.center,
            children: [
              Text('Price: ${widget.price}'),
              const SizedBox(
                width: 6,
              ),
              Text('MRP: ${widget.mrp}'),
              const SizedBox(
                width: 6,
              ),
              Text('Store: ${widget.store}')
            ],
          )
        ],
      ),
    );
  }
}
