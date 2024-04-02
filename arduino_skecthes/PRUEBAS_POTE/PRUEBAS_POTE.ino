// Pruebas con potenciometros
#include <ArduinoJson.h>

// JSON DOCUMENT
StaticJsonDocument<200> doc;

void setup() {
  // Se inicia comunicacion serial
  Serial.begin(9600);
}


void loop() {
  doc["gyro"][0] = map(analogRead(A0) ,0, 1023, 0, 360);
  doc["gyro"][1] = map(analogRead(A1) ,0, 1023, 0, 360);
  doc["gyro"][2] = map(analogRead(A2) ,0, 1023, 0, 360);

  doc["temp"] = map(analogRead(A3) ,0, 1023, 10, 50);
  doc["pres"] = analogRead(A4);
  doc["vel"] = map(analogRead(A5) ,0, 1023, 0, 50);

  // Serializamos el json y lo enviamos a través de nrf24l01
  String msg;
  int buff = serializeJson(doc, msg);
  Serial.println(msg);
  delay(10);
}

