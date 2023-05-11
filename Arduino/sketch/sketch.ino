#include <ArduinoJson.h>
#include <MPU9250_asukiaaa.h>
#include <MadgwickAHRS.h>

//== VARIABLES GLOBALES ==//
Madgwick filter;
MPU9250_asukiaaa GY91;

//== INICIO Y CONFIGURACION ==//
void setup() {
  // put your setup code here, to run once:
  Serial.begin(9600);
  GY91.beginAccel();
  GY91.beginGyro();
  GY91.beginMag();

}

void loop() {
  int aix, aiy, aiz;
  int gix, giy, giz;
  float ax, ay, az;
  float gx, gy, gz;
  float roll, pitch, heading;
  DynamicJsonDocument doc(1024);
  int accel = GY91.accelUpdate();
  int gyro = GY91.gyroUpdate();
  int mag = GY91.magUpdate();
  if(accel == 0 &&  gyro == 0) {
    ax = convertRawAcceleration(aix);
    ay = convertRawAcceleration(aiy);
    az = convertRawAcceleration(aiz);
    gx = convertRawGyro(gix);
    gy = convertRawGyro(giy);
    gz = convertRawGyro(giz);

     // update the filter, which computes orientation
    filter.updateIMU(gx, gy, gz, ax, ay, az);

    doc["pitch"] = filter.getPitch();
    doc["roll"] = filter.getRoll();
    doc["yaw"] = filter.getYaw();
  }
  // if(accel == 0) {
  //   doc["acel"]["x"] =  GY91.accelX();
  //   doc["acel"]["y"] =  GY91.accelY();
  //   doc["acel"]["z"] = GY91.accelZ(); 
  // }
  // if(gyro == 0) {
  //   doc["gyro"]["x"] =  GY91.gyroX();
  //   doc["gyro"]["y"] =  GY91.gyroY();
  //   doc["gyro"]["z"] = GY91.gyroZ(); 
  // }
  // if(mag == 0) {
  //   doc["mag"]["x"] =  GY91.magX();
  //   doc["mag"]["y"] =  GY91.magY();
  //   doc["mag"]["z"] = GY91.magZ(); 
  // }
  // doc["pitch"] = filter.getPitch();
  // doc["roll"] = filter.getRoll();
  // doc["yaw"] = filter.getYaw();
  String value;
  serializeJson(doc, Serial);
  Serial.println(value);
}

float convertRawAcceleration(int aRaw) {
  // since we are using 2 g range
  // -2 g maps to a raw value of -32768
  // +2 g maps to a raw value of 32767
  
  float a = (aRaw * 2.0) / 32768.0;
  return a;
}

float convertRawGyro(int gRaw) {
  // since we are using 250 degrees/seconds range
  // -250 maps to a raw value of -32768
  // +250 maps to a raw value of 32767
  
  float g = (gRaw * 250.0) / 32768.0;
  return g;
}
