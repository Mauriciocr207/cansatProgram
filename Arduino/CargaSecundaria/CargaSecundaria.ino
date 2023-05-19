//CONSIDERACIONES
//Cambiar los pines del GPS y LORA
//Transmisión de datos al LORA

//LIBRERÍAS//
//GPS
#include <TinyGPS++.h> //descargar
#include <TinyGPSPlus.h>
#include <SoftwareSerial.h>
//Servo
#include <Servo.h>

//VARIABLES GLOBALES//
//GPS
TinyGPSPlus gps;
SoftwareSerial gps_serial( 5,6 ); // -> Tx , Rx
//LORA
SoftwareSerial Lora(5,4); // --> RX, TX
String lora_band = "900000000";
String lora_networkid = "18";
String lora_adress = "1";
String lora_adress_receptor = "2";
  //Potenciometro prueba
int analogPin = A0;
//DynamicJsonDocument doc(1024);
//Servo
Servo servomotor;

//FUNCIONES AUXILIARES
void GPS(){
  while(gps_serial.available()) {
    gps.encode( gps_serial.read() );
  }
  if(gps.location.isUpdated()) {
    Serial.print("LAT="); Serial.println( gps.location.lat(),6 );
    Serial.print("LONG="); Serial.println( gps.location.lng(),6 );
    Serial.print("ALT="); Serial.println( gps.altitude.meters() );
    
  }
  delay(500);
}

void LORA(){
  String value = String( analogRead(analogPin) / 4 );
  String toSend = "AT+SEND="+lora_adress_receptor+","+String(value.length())+","+value+"\r\n";
  //Serial.print(toSend);
  Lora.print(toSend);
  
  if(Lora.available()) Serial.println(Lora.readString());
  //if(Serial.available()) Lora.print(Serial.readString());
}
void SERVO(){
  servomotor.write(0);
  delay(5000);

  servomotor.write(90);
  delay(5000);

  servomotor.write(180);
  delay(5000);
}

void setup() {
  Serial.begin(9600);
  gps_serial.begin( 9600 );
  Lora.begin(115200);
  // Lora.print("AT+IPR=115200");
  Lora.println("AT+BAND=" + lora_band);
  Lora.println("AT+ADDRESS=" + lora_adress);
  Lora.println("AT+NETWORKID=" + lora_networkid);
  //delay(100);
  servomotor.attach(4);

}

void loop() {
  GPS ();
  LORA ();
  SERVO ();
}

