import 'package:flutter/material.dart';
import 'package:google_fonts/google_fonts.dart';

class Home extends StatefulWidget {
  const Home({super.key});

  @override
  State<Home> createState() => _HomeState();
}

class _HomeState extends State<Home> {
  @override
  Widget build(BuildContext context) {
    return Column(
      mainAxisAlignment: MainAxisAlignment.center,
      children: [
        Text(
          "GrubGenie",
          style: GoogleFonts.oswald(color: Colors.black, fontSize: 40),
        ),
        const Padding(padding: EdgeInsets.all(30)),
        ElevatedButton(
          onPressed: () {},
          style: ButtonStyle(
            backgroundColor: MaterialStatePropertyAll(Colors.red.shade300),
          ),
          child: Text(
            "Food Near Me",
            style: GoogleFonts.josefinSans(
              color: Colors.black87,
              fontSize: 16,
            ),
          ),
        ),
        const Padding(padding: EdgeInsets.all(5)),
        ElevatedButton(
          onPressed: () {},
          style: ButtonStyle(
            backgroundColor: MaterialStatePropertyAll(Colors.red.shade300),
          ),
          child: Text(
            "Request Food",
            style: GoogleFonts.josefinSans(
              color: Colors.black87,
              fontSize: 16,
            ),
          ),
        ),
        const Padding(padding: EdgeInsets.all(5)),
        ElevatedButton(
          onPressed: () {},
          style: ButtonStyle(
            backgroundColor: MaterialStatePropertyAll(Colors.red.shade300),
          ),
          child: Text(
            "Store Login",
            style: GoogleFonts.josefinSans(
              color: Colors.black87,
              fontSize: 16,
            ),
          ),
        ),
      ],
    );
  }
}
