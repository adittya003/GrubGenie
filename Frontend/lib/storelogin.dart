import 'package:flutter/material.dart';
import 'package:google_fonts/google_fonts.dart';

class StoreLogin extends StatefulWidget {
  const StoreLogin({Key? key}) : super(key: key);

  @override
  _StoreLoginState createState() => _StoreLoginState();
}

class _StoreLoginState extends State<StoreLogin> {
  bool isLoginPage = true;

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
        child: SingleChildScrollView(
          padding: const EdgeInsets.all(16.0),
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.stretch,
            children: [
              Text(
                isLoginPage ? "Login" : "Register",
                style: GoogleFonts.oswald(color: Colors.black, fontSize: 40),
                textAlign: TextAlign.center,
              ),
              const Padding(padding: EdgeInsets.all(20)),
              TextFormField(
                decoration: InputDecoration(
                  labelText: 'Email',
                  labelStyle: GoogleFonts.josefinSans(
                    color: Colors.black87,
                    fontSize: 16,
                  ),
                  filled: true,
                  fillColor: Colors.white.withOpacity(0.5),
                ),
                keyboardType: TextInputType.emailAddress,
              ),
              const Padding(padding: EdgeInsets.all(10)),
              TextFormField(
                decoration: InputDecoration(
                  labelText: 'Password',
                  labelStyle: GoogleFonts.josefinSans(
                    color: Colors.black87,
                    fontSize: 16,
                  ),
                  filled: true,
                  fillColor: Colors.white.withOpacity(0.5),
                ),
                obscureText: true,
              ),
              const Padding(padding: EdgeInsets.all(20)),
              ElevatedButton(
                onPressed: () {
                  // TODO: Implement login or registration logic
                },
                style: ButtonStyle(
                  backgroundColor:
                      MaterialStatePropertyAll(Colors.green.shade300),
                ),
                child: Text(
                  isLoginPage ? "Login" : "Register",
                  style: GoogleFonts.josefinSans(
                    color: Colors.black87,
                    fontSize: 16,
                  ),
                ),
              ),
              const Padding(padding: EdgeInsets.all(10)),
              TextButton(
                onPressed: () {
                  setState(() {
                    isLoginPage = !isLoginPage;
                  });
                },
                style: ButtonStyle(
                  backgroundColor:
                      MaterialStatePropertyAll(Colors.red.shade300),
                ),
                child: Text(
                  isLoginPage ? "Switch to Register" : "Switch to Login",
                  style: GoogleFonts.josefinSans(
                    color: Colors.black87,
                    fontSize: 16,
                  ),
                ),
              ),
            ],
          ),
        ),
      ),
    );
  }
}
