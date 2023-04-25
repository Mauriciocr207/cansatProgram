#include <ArduinoJson.h>
#include <MPU9250_asukiaaa.h>

//== VARIABLES GLOBALES ==//
DynamicJsonDocument doc(1024);
MPU9250_asukiaaa GY91;
float aX, aY, aZ;

//== INICIO Y CONFIGURACION ==//
void setup() {
  // put your setup code here, to run once:
  Serial.begin(9600);
  GY91.beginAccel();
}

void loop() {
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
