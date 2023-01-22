#include <ArduinoJson.h>
DynamicJsonDocument doc(1024);
void setup() {
  // put your setup code here, to run once:
  Serial.begin(9600);
}

void loop() {
  doc["time"] = millis();
  doc["temperatura"] = random(1,100);
  doc["presion"] = 2;
  doc["humedad"] = 3;
  doc["velocidad"] = 4;
  serializeJson(doc, Serial);
  Serial.println("");
  delay(1000);
}
