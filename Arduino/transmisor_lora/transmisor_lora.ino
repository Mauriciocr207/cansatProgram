#include <SoftwareSerial.h>
SoftwareSerial Lora(5,4); // --> RX, TX
// Lora
String lora_band = "900000000";
String lora_networkid = "18";
String lora_adress = "1";
String lora_adress_receptor = "2";

// Potenciometro
int analogPin = A0;



void setup() {
    Serial.begin(115200);
//  Serial.println();
//  delay(2000);
  
  Lora.begin(115200);
  // Lora.print("AT+IPR=115200");
  Lora.println("AT+BAND=" + lora_band);
  Lora.println("AT+ADDRESS=" + lora_adress);
  Lora.println("AT+NETWORKID=" + lora_networkid);
  
  delay(100);
  
  // Serial.print("AT\r\n");
  // Lora.print("AT\r\n");
}

void loop() {
  String value = String( analogRead(analogPin) / 4 );
  String toSend = "AT+SEND="+lora_adress_receptor+","+String(value.length())+","+value+"\r\n";
  //Serial.print(toSend);
  Lora.print(toSend);
  
  if(Lora.available()) Serial.println(Lora.readString());
  //if(Serial.available()) Lora.print(Serial.readString());
  
}
