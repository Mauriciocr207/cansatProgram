#include <ArduinoJson.h>

StaticJsonDocument<200> doc;

void setup() {
  // put your setup code here, to run once:
  Serial.begin(9600);
}

void loop() {
  // put your main code here, to run repeatedly:
  String msg;
  updateJsonData();
  int writtenBytes = serializeJson(doc, msg);
  Serial.println(msg);
}

void updateJsonData() {
  // GIROSCOPIO
  doc["giro"][0] = getRandomNumber(); 
  doc["giro"][1] = getRandomNumber(); 
  doc["giro"][2] = getRandomNumber();
  // TEMPERATURA
  doc["temp"] = getRandomNumber();
  // PRESION
  doc["pres"] = getRandomNumber();
  // ALTITUD
  doc["alt"] =getRandomNumber();
  // GPS
  doc["gps"][0] = getRandomNumber();
  doc["gps"][1] = getRandomNumber(); 
  doc["gps"][2] = getRandomNumber(); 
  doc["time"] = millis();
}

int getRandomNumber() {
  return random(0, 100);
}