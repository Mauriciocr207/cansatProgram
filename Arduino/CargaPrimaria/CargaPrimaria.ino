//CONSIDERACIONES
//Cambiar los pines del GPS y LORA
//Transmisión de datos al LORA

//LIBRERÍAS//
//GPS
#include <TinyGPS++.h> //descargar
#include <TinyGPSPlus.h>
#include <SoftwareSerial.h>
//MGY-91
#include <ArduinoJson.h>
#include <MPU9250_asukiaaa.h>



//VARIABLES GLOBALES//
//GPS
TinyGPSPlus gps;
SoftwareSerial gps_serial(6,7); // -> Tx , Rx
//MGY-91
DynamicJsonDocument doc(1024);
MPU9250_asukiaaa GY91;
float aX, aY, aZ;
//LORA
SoftwareSerial Lora(5,4); // --> RX, TX
String lora_band = "900000000";
String lora_networkid = "18";
String lora_adress = "1";
String lora_adress_receptor = "2";
  //Potenciometro prueba
int analogPin = A0;

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
void MGY(){
  int result = GY91.accelUpdate();
  if(result == 0) {
    doc["acel"]["x"] =  GY91.accelX();
    doc["acel"]["y"] =  GY91.accelY();
    doc["acel"]["z"] = GY91.accelZ(); 
  }
  doc["time"] = millis();
  doc["temperatura"] = random(1,100);
  doc["presion"] = 2;
  doc["humedad"] = 3;
  doc["velocidad"] = 4;
  serializeJson(doc, Serial);
  Serial.println("");
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

void setup() {
  Serial.begin(9600);
  gps_serial.begin( 9600 );
  GY91.beginAccel();
  Lora.begin(115200);
  // Lora.print("AT+IPR=115200");
  Lora.println("AT+BAND=" + lora_band);
  Lora.println("AT+ADDRESS=" + lora_adress);
  Lora.println("AT+NETWORKID=" + lora_networkid);
  //delay(100);

}

void loop() {
  GPS ();
  //MGY ();
  //LORA ();
}
